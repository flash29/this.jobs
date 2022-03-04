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

func setUpUserProfileController(data []byte, url string, method string, handler gin.HandlerFunc) (*httptest.ResponseRecorder, *gin.Context, *gin.Engine) {

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

func TestGetUserProfile(t *testing.T) {

	w, c, _ := setUpUserProfileController([]byte{}, "/userprofile/1", "GET", GetUserProfile)
	c.Params = []gin.Param{
		{
			Key:   "id",
			Value: "1",
		},
	}
	GetUserProfile(c)
	var user models.User
	err := json.Unmarshal(w.Body.Bytes(), &user)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, "First User", user.UserName)
	assert.Equal(t, "firstuser123@ufl.edu", user.UserEmail)
}

func TestUpdateProfilePic(t *testing.T) {
	// var jsonData = []byte(`{
	// 	"content": "abc123",
	// 	"createdBy": "user01",
	// 	"tag": ""
	// }`)

	// w, c, r := setUpUserProfileController(jsonData, "/post", "POST", CreatePost)
	// r.ServeHTTP(w, c.Request)
	// assert.Equal(t, http.StatusBadRequest, w.Code)

	// expected := `{"error":"Unable to create post"}`
	// assert.Equal(t, expected, w.Body.String())
}

func TestAddEducationDetails(t *testing.T) {
	// var jsonData = []byte(`{
	// 	"content": "content updation",
	// 	"createdBy": "user01",
	// 	"tag": "Job-Recruitment"
	// }`)
	// w, c, _ := setUpUserProfileController(jsonData, "/post/1", "PUT", UpdatePost)
	// c.Params = []gin.Param{
	// 	{
	// 		Key:   "id",
	// 		Value: "1",
	// 	},
	// }
	// //r.ServeHTTP(w, c.Request)
	// UpdatePost(c)
	// var post models.UserPost
	// err := json.Unmarshal(w.Body.Bytes(), &post)
	// assert.NoError(t, err)

	// assert.Equal(t, http.StatusOK, w.Code)
	// assert.Equal(t, "content updation", post.Content)
	// assert.Equal(t, "user01", post.CreatedBy)
}

func TestUpdateEducationDetails(t *testing.T) {
	// var jsonData = []byte(`{
	// 	"content": "content updation",
	// 	"createdBy": "user01",
	// 	"tag": "Job-Recruitment"
	// }`)
	// w, c, _ := setUpUserProfileController(jsonData, "/post/11", "PUT", UpdatePost)
	// c.Params = []gin.Param{
	// 	{
	// 		Key:   "id",
	// 		Value: "11",
	// 	},
	// }
	// //r.ServeHTTP(w, c.Request)
	// UpdatePost(c)
	// var post models.UserPost
	// err := json.Unmarshal(w.Body.Bytes(), &post)
	// assert.NoError(t, err)
	// assert.Equal(t, http.StatusNotFound, w.Code)
}
func TestAddJobDetails(t *testing.T) {
	var jsonData = []byte(`{
		"company" : "company 123",
		"timeline" : "Aug 2021 - May 2023",
		"position" : "second position",
		"userId" : 1
	}`)
	w, c, _ := setUpUserProfileController(jsonData, "/addjob", "POST", AddJobDetails)
	AddJobDetails(c)
	var job models.JobHistory
	err := json.Unmarshal(w.Body.Bytes(), &job)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusCreated, w.Code)
	assert.Equal(t, "Aug 2021 - May 2023", job.Timeline)
	assert.Equal(t, "company 123", job.Company)
}

func TestUpdateJobDetails(t *testing.T) {
	var jsonData = []byte(`{
		"jobHistoryId" : 1,
		"company" : "company 123",
		"timeline" : "Aug 2023 - May 2025",
		"position" : "second position",
		"userId" : 1
	}`)
	w, c, _ := setUpUserProfileController(jsonData, "/updatejob", "PUT", UpdateJobDetails)

	UpdateJobDetails(c)
	var job models.JobHistory
	err := json.Unmarshal(w.Body.Bytes(), &job)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, "Aug 2023 - May 2025", job.Timeline)
}
func TestAddProjectDetails(t *testing.T) {
	var jsonData = []byte(`{
		"projName" : "proj sample",
		"description" : "some desc",
		"userId" : 1
	}`)
	w, c, _ := setUpUserProfileController(jsonData, "/addproject", "POST", AddProjectDetails)
	AddProjectDetails(c)
	var project models.Project
	err := json.Unmarshal(w.Body.Bytes(), &project)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusCreated, w.Code)
	assert.Equal(t, "proj sample", project.ProjName)
	assert.Equal(t, uint(1), project.UserID)
}

func TestUpdateProjectDetails(t *testing.T) {
	var jsonData = []byte(`{
		"projectId" : 1,
		"projName" : "proj sample12",
		"description" : "some desc12",
		"userId" : 1
	}`)
	w, c, _ := setUpUserProfileController(jsonData, "/updateproject", "PUT", UpdateProjectDetails)

	UpdateProjectDetails(c)
	var project models.Project
	err := json.Unmarshal(w.Body.Bytes(), &project)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, "proj sample12", project.ProjName)
	assert.Equal(t, uint(1), project.UserID)
}

func TestUpdateBio(t *testing.T) {
	// var jsonData = []byte(`{
	// 	"commentData": "first comment",
	// 	"createdBy": "user01",
	// 	"post_id": 11
	// }`)
	// w, c, _ := setUpUserProfileController(jsonData, "/postcomment", "POST", GetPosts)
	// PostComment(c)
	// assert.Equal(t, http.StatusBadRequest, w.Code)
}
