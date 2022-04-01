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
	var jsonData = []byte(`{
		"userId": 1,
		"content":"Backend developer 3",
		"validTill" : 1648767770,
		"jobTitle" : "Backend Developer 3",
		"org" : "abc",
		"location" : "abc",
		"salary" : "123"
	}`)

	w, c, _ := setUpFeedController(jsonData, "/jobpost", "POST", CreateJobPost)

	CreateJobPost(c)
	var post models.JobPost
	err := json.Unmarshal(w.Body.Bytes(), &post)
	assert.NoError(t, err)
}

func TestUpdateJobPost(t *testing.T) {
	var jsonData = []byte(`{
		"jobId" : 1,
		"userId": 1,
		"content":"Backend developer",
		"validTill" : 1648767770,
		"jobTitle" : "Backend Developer",
		"org" : "abc",
		"location" : "abc",
		"salary" : "123"
	}`)

	w, c, _ := setUpFeedController(jsonData, "/jobpost", "PUT", UpdateJobPost)
	c.Params = []gin.Param{
		{
			Key:   "id",
			Value: "1",
		},
	}

	UpdateJobPost(c)
	var post models.JobPost
	err := json.Unmarshal(w.Body.Bytes(), &post)
	assert.NoError(t, err)
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

func TestRetrieveAppliedJobsById(t *testing.T) {
	w, c, _ := setUpFeedController([]byte{}, "/getappliedjobs/1", "GET", RetrieveAppliedJobsById)
	c.Params = []gin.Param{
		{
			Key:   "id",
			Value: "1",
		},
	}
	RetrieveAppliedJobsById(c)
	var post []models.JobPost
	err := json.Unmarshal(w.Body.Bytes(), &post)
	assert.NoError(t, err)
}

func TestDeleteJobPost(t *testing.T) {
	w, c, _ := setUpFeedController([]byte{}, "/jobpost/1", "DELETE", DeleteJobPost)
	c.Params = []gin.Param{
		{
			Key:   "id",
			Value: "1",
		},
	}
	DeleteJobPost(c)
	assert.Equal(t, http.StatusOK, w.Code)
}
