package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	_ "github.com/joho/godotenv/autoload"
	"github.com/pandubhaskara/go-api/controllers"
	"github.com/pandubhaskara/go-api/database"
	"github.com/pandubhaskara/go-api/models"
)

func main() {
	server := gin.Default()
	db, err := database.ConnectMysql()
	db.AutoMigrate(&models.Brand{})
	db.AutoMigrate(&models.Laptop{})

	if err != nil {
		fmt.Errorf(err.Error())
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
