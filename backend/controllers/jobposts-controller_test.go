package controllers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"com.uf/src/models"
	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func SetUpJobPostsController(data []byte, url string, method string, handler gin.HandlerFunc) (*httptest.ResponseRecorder, *gin.Context, *gin.Engine) {

	w := httptest.NewRecorder()
	c, r := gin.CreateTestContext(w)

	utils.MockConnectDatabase()

	if method == "POST" {
		r.POST(url, handler)
	}
	if method == "PUT" {
		r.PUT(url, handler)
	}
	if method == "DELETE" {
		r.DELETE(url, handler)
	}
	if method == "GET" {
		r.GET(url, handler)
	}

	c.Request, _ = http.NewRequest(method, url, bytes.NewBuffer(data))
	c.Request.Header.Add("Content-Type", "application/json")
	return w, c, r
}

func TestCreateJobPost(t *testing.T) {
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
			CreateJobPost(tt.args.c)
		})
	}
}

func TestRetrieveAllJobPostsById(t *testing.T) {
	w, c, _ := setUpFeedController([]byte{}, "/getjobposts/1", "GET", RetrieveAllJobPostsById)
	c.Params = []gin.Param{
		{
			Key:   "id",
			Value: "1",
		},
	}
	RetrieveAllJobPostsById(c)
	var post []models.JobPost
	err := json.Unmarshal(w.Body.Bytes(), &post)
	assert.NoError(t, err)
}

func TestRetrieveAllJobPosts(t *testing.T) {
	w, c, _ := setUpFeedController([]byte{}, "/getalljobposts", "GET", RetrieveAllJobPosts)
	c.Params = []gin.Param{
		{
			Key:   "id",
			Value: "1",
		},
	}
	RetrieveAllJobPosts(c)
	var post []models.JobPost
	err := json.Unmarshal(w.Body.Bytes(), &post)
	assert.NoError(t, err)
}