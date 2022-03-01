package controllers

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
)

func TestUserRegistration(t *testing.T) {
	w := httptest.NewRecorder()
	c, r := gin.CreateTestContext(w)
	utils.MockConnectDatabase()
	r.POST("/auth/register", UserRegistration)

	var jsonData = []byte(`{
		"useremail" : "firstuser123@ufl.edu",
		"password": "abc123",
		"username": "First User"
	}`)

	c.Request, _ = http.NewRequest(http.MethodPost, "/auth/register", bytes.NewBuffer(jsonData))
	c.Request.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	r.ServeHTTP(w, c.Request)

	if w.Code != http.StatusAccepted {
		t.Errorf("Expected status %d, got %d", http.StatusAccepted, w.Code)
	}
}
