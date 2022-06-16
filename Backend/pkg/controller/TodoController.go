package controller

import (
	"context"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"todo/pkg/Services"
	"todo/pkg/database"
	"todo/pkg/model"
)

func TodoCreate(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	token, err1 := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})
	if err1 != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}
	var todo map[string]string

	err := c.BodyParser(&todo)

	if err != nil {
		c.Status(fiber.StatusBadGateway).JSON(fiber.Map{
			"message": "Unable to insert",
		})
	}
	claims := token.Claims.(*jwt.StandardClaims)
	todo2 := model.TodoList{
		Id:     primitive.NewObjectID(),
		Title:  todo["title"],
		Task:   todo["task"],
		Email:  claims.Issuer,
		Date:   todo["date"],
		Status: false,
	}
	todo3, _ := database.DB.InsertOne(context.Background(), &todo2)
	// todo2, _ = Services.TodoCreate(&todo2)
	return c.Status(fiber.StatusOK).JSON(todo3)
}

func TodoGetByTaskID(c *fiber.Ctx) error {
	id := c.Params("id")
	todo, err := Services.TodoGetByTaskID(id)
	if err != nil {
		log.Fatal(err)
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(todo)
}
func TodoFindAllByEmail(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	token, err1 := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})
	if err1 != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}
	claims := token.Claims.(*jwt.StandardClaims)
	var useremail = claims.Issuer
	todo, err := Services.TodoFindAllByEmail(useremail)
	if err != nil {
		log.Fatal(err)
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(todo)
}

func TodoDeleteById(c *fiber.Ctx) error {

	id := c.Params("id")
	_, err := Services.TodoDeleteById(id)
	if err != nil {
		log.Fatal(err)
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.SendString("deleted")
}

func TodoUpdateById(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	_, err1 := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})
	if err1 != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	id := c.Params("id")

	fmt.Println("id is: ", id)
	var todo model.TodoList
	err := c.BodyParser(&todo)
	if err != nil {
		c.Status(fiber.StatusBadGateway).JSON(fiber.Map{
			"message": "Unable to update",
		})
	}
	todo, _ = Services.TodoUpdateById(id, todo)
	//Services.TodoUpdateById(id, title, task)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "updated successfully"})

}

func TodoStatusUpdateById(c *fiber.Ctx) error {
	id := c.Params("id")
	todo, err := Services.TodoGetByTaskID(id)
	if err != nil {
		log.Fatal(err)
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	todo1, _ := Services.TodoStatusUpdateById(id, todo)
	fmt.Println(&todo1)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "status updated successfully"})

}
