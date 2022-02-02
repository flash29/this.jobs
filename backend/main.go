package main

import (
	"com.uf/src/controllers"
	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
)

func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Add("Access-Control-Allow-Origin", "*")
		c.Next()
	}
}

func main() {
	router := gin.Default()
	router.Use(Cors())

	utils.ConnectDatabase() // new

	router.GET("/feed", controllers.GetPosts)
	router.GET("/post/:id", controllers.GetPost)
	router.POST("/post", controllers.CreatePost)
	router.POST("/postcomment", controllers.PostComment)
	router.PUT("/post/:id", controllers.UpdatePost)
	router.PUT("/updatelikes", controllers.UpdateLikes)
	router.DELETE("/post/:id", controllers.DeletePost)

	router.Run(":8080")
}
