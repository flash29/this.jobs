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

func setUpFeedController(data []byte, url string, method string, handler gin.HandlerFunc) (*httptest.ResponseRecorder, *gin.Context, *gin.Engine) {

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

func TestCreatePost(t *testing.T) {

	var jsonData = []byte(`{
		"content": "abc123",
		"createdBy": "user01",
		"tag": "Job-Recruitment"
	}`)

	w, c, r := setUpFeedController(jsonData, "/post", "POST", CreatePost)
	r.ServeHTTP(w, c.Request)

	var post models.UserPost
	err := json.Unmarshal(w.Body.Bytes(), &post)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, "abc123", post.Content)
	assert.Equal(t, "user01", post.CreatedBy)
}

func TestCreatePostWithInvalidData(t *testing.T) {
	var jsonData = []byte(`{
		"content": "abc123",
		"createdBy": "user01",
		"tag": ""
	}`)

	w, c, r := setUpFeedController(jsonData, "/post", "POST", CreatePost)
	r.ServeHTTP(w, c.Request)
	assert.Equal(t, http.StatusBadRequest, w.Code)

	expected := `{"error":"Unable to create post"}`
	assert.Equal(t, expected, w.Body.String())
}

func TestUpdatePost(t *testing.T) {
	var jsonData = []byte(`{
		"content": "content updation",
		"createdBy": "user01",
		"tag": "Job-Recruitment"
	}`)
	w, c, _ := setUpFeedController(jsonData, "/post/1", "PUT", UpdatePost)
	c.Params = []gin.Param{
		{
			Key:   "id",
			Value: "1",
		},
	}
	//r.ServeHTTP(w, c.Request)
	UpdatePost(c)
	var post models.UserPost
	err := json.Unmarshal(w.Body.Bytes(), &post)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, "content updation", post.Content)
	assert.Equal(t, "user01", post.CreatedBy)
}

func TestUpdatePostWithInValidData(t *testing.T) {
	var jsonData = []byte(`{
		"content": "content updation",
		"createdBy": "user01",
		"tag": "Job-Recruitment"
	}`)
	w, c, _ := setUpFeedController(jsonData, "/post/11", "PUT", UpdatePost)
	c.Params = []gin.Param{
		{
			Key:   "id",
			Value: "11",
		},
	}
	//r.ServeHTTP(w, c.Request)
	UpdatePost(c)
	var post models.UserPost
	err := json.Unmarshal(w.Body.Bytes(), &post)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusNotFound, w.Code)
}

func TestGetFollowingPostsWithInvalidUser(t *testing.T) {
	w, c, _ := setUpFeedController([]byte{}, "/post/1", "GET", GetFollowingPosts)
	c.Params = []gin.Param{
		{
			Key:   "id",
			Value: "100",
		},
	}
	GetFollowingPosts(c)
	expected := `{"error":"Unable to retrieve user"}`
	assert.Equal(t, expected, w.Body.String())
}

func TestGetFollowingPostsWithValidUser(t *testing.T) {
	w, c, _ := setUpFeedController([]byte{}, "/post/1", "GET", GetFollowingPosts)
	c.Params = []gin.Param{
		{
			Key:   "id",
			Value: "1",
		},
	}
	var userPosts []models.UserPost
	GetFollowingPosts(c)
	err := json.Unmarshal(w.Body.Bytes(), &userPosts)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, 0, len(userPosts))
}

func TestGetPost(t *testing.T) {
	w, c, _ := setUpFeedController([]byte{}, "/post/1", "GET", GetPost)
	c.Params = []gin.Param{
		{
			Key:   "id",
			Value: "1",
		},
	}
	GetPost(c)
	var post models.UserPost
	err := json.Unmarshal(w.Body.Bytes(), &post)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, "content updation", post.Content)
	assert.Equal(t, "user01", post.CreatedBy)
}

func TestGetPostWithInValidData(t *testing.T) {
	w, c, _ := setUpFeedController([]byte{}, "/post/1", "GET", GetPost)
	c.Params = []gin.Param{
		{
			Key:   "id",
			Value: "11",
		},
	}
	GetPost(c)
	assert.Equal(t, http.StatusNotFound, w.Code)
}
func TestGetPosts(t *testing.T) {
	w, c, _ := setUpFeedController([]byte{}, "/feed", "GET", GetPosts)
	GetPosts(c)
	var userposts []models.UserPost
	err := json.Unmarshal(w.Body.Bytes(), &userposts)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, "content updation", userposts[0].Content)
	assert.Equal(t, "user01", userposts[0].CreatedBy)
}

func TestPostComment(t *testing.T) {
	var jsonData = []byte(`{
		"commentData": "first comment",
		"createdBy": "user01",
		"post_id": 1
	}`)
	w, c, _ := setUpFeedController(jsonData, "/postcomment", "POST", GetPosts)
	PostComment(c)
	var comment models.Comment
	err := json.Unmarshal(w.Body.Bytes(), &comment)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, "first comment", comment.CommentData)
	assert.Equal(t, "user01", comment.CreatedBy)
}

func TestPostCommentWithInValidData(t *testing.T) {
	var jsonData = []byte(`{
		"commentData": "first comment",
		"createdBy": "user01",
		"post_id": 11
	}`)
	w, c, _ := setUpFeedController(jsonData, "/postcomment", "POST", GetPosts)
	PostComment(c)
	assert.Equal(t, http.StatusBadRequest, w.Code)
}

func TestUpdateLikes(t *testing.T) {
	var jsonData = []byte(`{
		"postId": 1,
		"liked": true
	}`)
	w, c, _ := setUpFeedController(jsonData, "/updatelikes", "PUT", UpdateLikes)
	UpdateLikes(c)
	assert.Equal(t, http.StatusOK, w.Code)
}

func TestUpdateLikesWithInValidData(t *testing.T) {
	var jsonData = []byte(`{
		"postId": 11,
		"liked": true
	}`)
	w, c, _ := setUpFeedController(jsonData, "/updatelikes", "PUT", UpdateLikes)
	UpdateLikes(c)
	assert.Equal(t, http.StatusBadRequest, w.Code)
}
