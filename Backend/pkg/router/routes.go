package router

import (
	"github.com/gofiber/fiber/v2"
	"todo/pkg/controller"
)

func Setup(app *fiber.App) {
	app.Post("/api/register", controller.CreateUser)
	app.Post("/api/login", controller.Login)
	app.Post("/api/logout", controller.Logout)

	app.Post("/createtodo", controller.TodoCreate)
	app.Get("/todogettask/:id", controller.TodoGetByTaskID)
	app.Get("/showmytodos", controller.TodoFindAllByEmail)
	app.Delete("/delete/:id", controller.TodoDeleteById)
	app.Put("/updatetodo/:id", controller.TodoUpdateById)

	app.Put("/updatestatus/:id", controller.TodoStatusUpdateById)
}
