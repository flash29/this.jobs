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

func setUpConnectionsController(data []byte, url string, method string, handler gin.HandlerFunc) (*httptest.ResponseRecorder, *gin.Context, *gin.Engine) {

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

func TestUserRegistration(t *testing.T) {

	var jsonData = []byte(`{
		"useremail" : "seconduser123@ufl.edu",
		"password": "abc123",
		"username": "Second User"
	}`)

	w, c, r := setUpRegister(jsonData)

	r.ServeHTTP(w, c.Request)
	assert.Equal(t, http.StatusCreated, w.Code)
}

func TestRequestConnection(t *testing.T) {
	var jsonData = []byte(`{
		"requestedFrom" : 1,
		"requestedTo" : 2
	}`)

	w, c, _ := setUpConnectionsController(jsonData, "/requestconnection", "POST", RequestConnection)
	RequestConnection(c)

	var post models.ConnectionRequest
	err := json.Unmarshal(w.Body.Bytes(), &post)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, 1, post.RequestedFrom)
	assert.Equal(t, 2, post.RequestedTo)
}

func TestAcceptConnection(t *testing.T) {
	var jsonData = []byte(`{
		"requestId" : 1,
		"requestedTo" : 2
  }`)

	w, c, _ := setUpConnectionsController(jsonData, "/acceptconnection", "POST", AcceptConnection)
	AcceptConnection(c)

	var post models.ConnectionRequest
	err := json.Unmarshal(w.Body.Bytes(), &post)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestRetrieveConectionRequestsById(t *testing.T) {
	w, c, _ := setUpConnectionsController([]byte{}, "/connectionrequests/1", "GET", RetrieveConectionRequestsById)
	c.Params = []gin.Param{
		{
			Key:   "id",
			Value: "1",
		},
	}
	RetrieveConectionRequestsById(c)
	expected := `{"error":"Unable to retrieve user"}`
	assert.NotEqual(t, expected, w.Body.String())
}

func TestRetrievePeopleYouMayKnowById(t *testing.T) {
	w, c, _ := setUpConnectionsController([]byte{}, "/peopleyoumayknow/1", "GET", RetrievePeopleYouMayKnowById)
	c.Params = []gin.Param{
		{
			Key:   "id",
			Value: "1",
		},
	}
	RetrievePeopleYouMayKnowById(c)
	expected := `{"error":"Unable to retrieve user"}`
	assert.NotEqual(t, expected, w.Body.String())
}

func TestRetrieveFollowersById(t *testing.T) {
	w, c, _ := setUpConnectionsController([]byte{}, "/followers/1", "GET", RetrieveFollowersById)
	c.Params = []gin.Param{
		{
			Key:   "id",
			Value: "1",
		},
	}
	RetrieveFollowersById(c)
	expected := `{"error":"Unable to retrieve user"}`
	assert.NotEqual(t, expected, w.Body.String())
}

func TestDeclineConnection(t *testing.T) {
	var jsonData = []byte(`{
		"requestId" : 1,
		"requestedTo" : 2
  }`)

	w, c, _ := setUpConnectionsController(jsonData, "/declineconnection", "POST", DeclineConnection)
	DeclineConnection(c)

	var post models.ConnectionRequest
	err := json.Unmarshal(w.Body.Bytes(), &post)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusBadRequest, w.Code)
}
