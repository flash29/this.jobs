package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

//feed model
type userPost struct {
	ID        string   `json:"id"`
	CreatedBy string   `json:"createdBy"`
	Content   string   `json:"content"`
	Likes     float64  `json:"likes"`
	Comments  []string `json:"comments"`
}

var feed = []userPost{
	{ID: "1", CreatedBy: "Sneha", Content: "Retrieved", Likes: 10, Comments: nil},
}

func getFeed(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, feed)
}

// createPost adds a post from JSON received in the request body.
func createPost(c *gin.Context) {
	var newPost userPost

	// Call BindJSON to bind the received JSON to
	// newPost.
	if err := c.BindJSON(&newPost); err != nil {
		return
	}

	// Add the new post to the slice.
	feed = append(feed, newPost)
	c.IndentedJSON(http.StatusCreated, newPost)
}

func updatePost(c *gin.Context) {
	var newPost userPost
	if err := c.BindJSON(&newPost); err != nil {
		return
	}
	feed = append(feed, newPost)
	c.IndentedJSON(http.StatusOK, newPost)
}

func deletePost(c *gin.Context) {
	var newPost userPost
	if err := c.BindJSON(&newPost); err != nil {
		return
	}
	feed = append(feed, newPost)
	c.IndentedJSON(http.StatusOK, newPost)
}

func main() {
	router := gin.Default()
	router.GET("/feed", getFeed)
	router.POST("/createPost", createPost)
	router.PUT("/updatePost", updatePost)
	router.DELETE("/deletePost", deletePost)

	router.Run("localhost:8080")
}
