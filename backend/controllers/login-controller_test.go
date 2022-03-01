package controllers

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
)

func TestLogin(t *testing.T) {
	w := httptest.NewRecorder()
	c, r := gin.CreateTestContext(w)
	utils.MockConnectDatabase()
	r.POST("/auth/login", Login)

	var jsonData = []byte(`{
		"useremail" : "firstuser123@ufl.edu",
		"password": "abc123"
	}`)

	c.Request, _ = http.NewRequest(http.MethodPost, "/auth/login", bytes.NewBuffer(jsonData))
	//c.Request.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	r.ServeHTTP(w, c.Request)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status %d, got %d", http.StatusOK, w.Code)
	}
}

/*
func TestLogin(t *testing.T) {
	type args struct {
		c *gin.Context
	}
	var user *models.UserLogin
	user = new(models.UserLogin)
	user.UserEmail = "firstuser@ufl.edu"
	user.Password = "abc123"
	var con *gin.Context
	con = new(gin.Context)
	con.ShouldBindJSON(user)
	var a args
	//a = new(args)
	a.c = con
	tests := []struct {
		name string
		args args
	}{
		// TODO: Add test cases.
		{
			name: "login1",
			args: a,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			utils.ConnectDatabase()
			Login(tt.args.c)
		})
	}
}
*/
