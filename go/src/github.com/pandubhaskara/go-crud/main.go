package main

import (
	"github.com/gin-gonic/gin"
	"github.com/pandubhaskara/go-crud/controllers"
	"github.com/pandubhaskara/go-crud/database"
)

func main() {
	server := gin.Default()

	db, error := database.ConnectMysql()
	if err != nil {
		fmt.Error(err.Error())
	}

	server.Use(func(ctx *gin.Context) {
		ctx.Set("db", db)
	})

	serverV1 := server.Group("/api/v1")

	serverV1.GET("/", controllers.CreateLaptop)

	// server.GET("/", func(ctx *gin.Context) {
	// 	ctx.JSON(200, gin.H{
	// 		"message": "Hello World",
	// 	})
	// })
	server.Run(":8000")
}
