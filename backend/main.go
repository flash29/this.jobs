package main

import (
	"com.uf/src/controllers"
	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	utils.ConnectDatabase() // new

	router.GET("/feed", controllers.GetPosts)
	router.GET("/post/:id", controllers.GetPost)
	router.POST("/post", controllers.CreatePost)
	router.PUT("/post/:id", controllers.UpdatePost)
	router.DELETE("/post/:id", controllers.DeletePost)

	router.Run(":8080")
}
