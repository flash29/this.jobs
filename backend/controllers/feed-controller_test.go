package controllers

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestGetPost(t *testing.T) {
	type args struct {
		c *gin.Context
	}
	tests := []struct {
		name string
		args args
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			GetPost(tt.args.c)
		})
	}
}

func TestCreatePost(t *testing.T) {
	w := httptest.NewRecorder()
	c, r := gin.CreateTestContext(w)
	// var post *models.UserPost
	// post.Content = "abc123"
	r.POST("/post", CreatePost)
	//p := url.pa
	// params := url.Values{}
	// params.Add("content", "abc123")
	// params.Add("createdBy", "sneha")
	// params.Add("tag", "Job-Recruitment")
	var jsonData = []byte(`{
		"content": "abc123",
		"createdBy": "sneha",
		"tag": "Job-Recruitment"
	}`)

	c.Request, _ = http.NewRequest(http.MethodPost, "/post", bytes.NewBuffer(jsonData))
	//c.Request.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	r.ServeHTTP(w, c.Request)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status %d, got %d", http.StatusOK, w.Code)
	}
}

func TestGetPosts(t *testing.T) {
	type args struct {
		c *gin.Context
	}
	//var a args
	tests := []struct {
		name string
		args args
	}{
		// TODO: Add test cases.
		// {
		// 	name: "get posts test",
		// 	//args: a,
		// },
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			GetPosts(tt.args.c)
		})
	}
}

func TestUpdateLikes(t *testing.T) {
	type args struct {
		c *gin.Context
	}
	tests := []struct {
		name string
		args args
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			UpdateLikes(tt.args.c)
		})
	}
}

func TestPostComment(t *testing.T) {
	type args struct {
		c *gin.Context
	}
	tests := []struct {
		name string
		args args
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			PostComment(tt.args.c)
		})
	}
}
