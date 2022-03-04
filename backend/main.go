package main

import (
	"fmt"

	"com.uf/src/controllers"
	"com.uf/src/middleware"
	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
)

func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Add("Access-Control-Allow-Origin", "*")
		fmt.Println("Here!")
		c.Next()
	}
}

func main() {
	router := gin.Default()
	router.Use(Cors())

	utils.ConnectDatabase() // new

	public := router.Group("/auth")
	public.POST("/login", controllers.Login)
	public.POST("/register", controllers.UserRegistration)

	protected := router.Group("")

	protected.Use(middleware.JwtAuthMiddleware())
	protected.GET("/feed", controllers.GetPosts)
	protected.GET("/post/:id", controllers.GetPost)
	protected.GET("/userprofile/:id", controllers.GetUserProfile)

	protected.PUT("/updatepic", controllers.UpdateProfilePic)
	protected.POST("/post", controllers.CreatePost)

	protected.POST("/addproject", controllers.AddProjectDetails)
	protected.PUT("/updateproject", controllers.UpdateProjectDetails)

	protected.POST("/postcomment", controllers.PostComment)
	protected.POST("/addeducation", controllers.AddEducationDetails)
	protected.PUT("/post/:id", controllers.UpdatePost)
	protected.PUT("/updateducation", controllers.UpdateEducationDetails)
	protected.PUT("/updatelikes", controllers.UpdateLikes)
	protected.DELETE("/post/:id", controllers.DeletePost)

	router.Run(":8080")
}
