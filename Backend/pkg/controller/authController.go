package controller

import (
	"context"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
	"log"
	"time"
	"todo/pkg/database"
	"todo/pkg/model"
)

const SecretKey = "secret"

func CreateUser(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		c.Status(fiber.StatusBadGateway).JSON(fiber.Map{
			"message": "Unable to register user",
		})
	}
	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	user := model.User{
		Name:     data["name"],
		Email:    data["email"],
		Password: password,
	}

	inserted, err := database.DB1.InsertOne(context.Background(), user)

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Inserted user in db with id: ", inserted.InsertedID)
	return c.JSON(user)
}

func Login(c *fiber.Ctx) error {
	var data map[string]string
	err := c.BodyParser(&data)
	if err != nil {
		c.Status(fiber.StatusBadGateway).JSON(fiber.Map{
			"message": "Unable to register user",
		})
	}

	var user model.User
	database.DB1.FindOne(context.Background(), bson.M{"email": data["email"]}).Decode(&user)
	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		return c.JSON(fiber.Map{
			"message": "User NOT Validated",
		})
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    user.Email,
		Subject:   "1",
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	})
	token, err := claims.SignedString([]byte(SecretKey))
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Could not login",
		})
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "Success",
	})
}

//func User(c *fiber.Ctx) error {
//	cookie := c.Cookies("jwt")
//	_, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
//		return []byte(SecretKey), nil
//	})
//	if err != nil {
//		c.Status(fiber.StatusUnauthorized)
//		return c.JSON(fiber.Map{
//			"message": "unauthenticated",
//		})
//	}
//	return c.JSON(fiber.Map{
//		"message": "authenticated",
//	})
//}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "Success",
	})
}
