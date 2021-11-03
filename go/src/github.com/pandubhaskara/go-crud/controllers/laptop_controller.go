package controllers

import "github.com/gin-gonic/gin"

func CreateLaptop(ctx *gin.Context) {
	ctx.JSON(200, gin.H{
		"message": "successfully created",
	})
}
