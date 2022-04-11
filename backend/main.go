package main

import (
	"net/http"

	"com.uf/src/controllers"
	"com.uf/src/middleware"
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
	router.StaticFS("/file", http.Dir("public"))
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

	protected.POST("/addjob", controllers.AddJobDetails)
	protected.PUT("/updatejob", controllers.UpdateJobDetails)

	protected.POST("/addproject", controllers.AddProjectDetails)
	protected.PUT("/updateproject", controllers.UpdateProjectDetails)

	protected.PUT("/updatebio", controllers.UpdateBio)

	protected.POST("/postcomment", controllers.PostComment)
	protected.POST("/addeducation", controllers.AddEducationDetails)
	protected.PUT("/post/:id", controllers.UpdatePost)
	protected.PUT("/updateducation", controllers.UpdateEducationDetails)
	protected.PUT("/updatelikes", controllers.UpdateLikes)
	protected.DELETE("/post/:id", controllers.DeletePost)

	protected.GET("/getalljobposts", controllers.RetrieveAllJobPosts)
	protected.GET("/getjobposts/:id", controllers.RetrieveAllJobPostsById)
	protected.GET("/getappliedjobs/:id", controllers.RetrieveAppliedJobsById)
	protected.GET("/job/:jobid/applications/:userid", controllers.RetrieveApplicationsForJobPosting)
	protected.POST("/jobpost", controllers.CreateJobPost)
	protected.PUT("/jobpost/:id", controllers.UpdateJobPost)
	protected.DELETE("/jobpost/:id", controllers.DeleteJobPost)
	protected.POST("/applyjob", controllers.ApplyToJob)
	protected.POST("/resumeupload/:id", controllers.UploadResume)

	protected.GET("/logout/:id", controllers.Logout)
	protected.POST("/requestconnection", controllers.RequestConnection)
	protected.POST("/acceptconnection", controllers.AcceptConnection)
	protected.GET("/connectionrequests/:id", controllers.RetrieveConectionRequestsById)

	protected.GET("/search/people", controllers.SearchPeople)
	router.Run(":8080")
}
