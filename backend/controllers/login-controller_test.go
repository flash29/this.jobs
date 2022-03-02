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

func setUp(data []byte) (*httptest.ResponseRecorder, *gin.Context, *gin.Engine) {
	w := httptest.NewRecorder()
	c, r := gin.CreateTestContext(w)
	utils.MockConnectDatabase()
	r.POST("/auth/login", Login)
	c.Request, _ = http.NewRequest(http.MethodPost, "/auth/login", bytes.NewBuffer(data))
	c.Request.Header.Add("Content-Type", "application/json")
	return w, c, r
}

// run this test after the user registration test.
func TestLoginWithValidCredentials(t *testing.T) {

	var jsonData = []byte(`{
		"useremail" : "firstuser123@ufl.edu",
		"password": "abc123"
	}`)
	w, c, r := setUp(jsonData)
	r.ServeHTTP(w, c.Request)
	assert.Equal(t, http.StatusOK, w.Code)
}

func TestLoginWithInValidCredentials(t *testing.T) {

	var jsonData = []byte(`{
		"useremail" : "firstuser123@ufl.edu",
		"password": "abc12"
	}`)
	w, c, r := setUp(jsonData)
	r.ServeHTTP(w, c.Request)
	assert.Equal(t, http.StatusBadRequest, w.Code)
}
