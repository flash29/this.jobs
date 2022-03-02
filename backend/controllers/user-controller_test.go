package controllers

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func setUpRegister(data []byte) (*httptest.ResponseRecorder, *gin.Context, *gin.Engine) {
	w := httptest.NewRecorder()
	c, r := gin.CreateTestContext(w)
	utils.MockConnectDatabase()
	r.POST("/auth/register", UserRegistration)
	c.Request, _ = http.NewRequest(http.MethodPost, "/auth/register", bytes.NewBuffer(data))
	c.Request.Header.Add("Content-Type", "application/json")
	return w, c, r
}

func TestUniqueUserRegistration(t *testing.T) {

	var jsonData = []byte(`{
		"useremail" : "firstuser123@ufl.edu",
		"password": "abc123",
		"username": "First User"
	}`)

	w, c, r := setUpRegister(jsonData)

	r.ServeHTTP(w, c.Request)
	assert.Equal(t, http.StatusCreated, w.Code)
}

func TestDuplicateUserRegistration(t *testing.T) {

	var jsonData = []byte(`{
		"useremail" : "firstuser123@ufl.edu",
		"password": "abc123",
		"username": "First User"
	}`)

	w, c, r := setUpRegister(jsonData)

	r.ServeHTTP(w, c.Request)
	assert.Equal(t, http.StatusBadRequest, w.Code)
	expected := `{"message":"User already exists"}`
	assert.Equal(t, expected, w.Body.String())
}

func TestUserRegistrationWithInValidBody(t *testing.T) {

	var jsonData = []byte(`{
		"firstuser123@ufl.edu",
		"password": "abc123",
		"username": "First User"
	}`)

	w, c, r := setUpRegister(jsonData)

	r.ServeHTTP(w, c.Request)
	assert.Equal(t, http.StatusBadRequest, w.Code)
	expected := `{"error":"Unable to bind user"}`
	assert.Equal(t, expected, w.Body.String())
}
