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

func setUpLogoutController(data []byte, url string, method string, handler gin.HandlerFunc) (*httptest.ResponseRecorder, *gin.Context, *gin.Engine) {

	w := httptest.NewRecorder()
	c, r := gin.CreateTestContext(w)

	utils.MockConnectDatabase()

	if method == "GET" {
		r.GET(url, handler)
	}

	c.Request, _ = http.NewRequest(method, url, bytes.NewBuffer(data))
	c.Request.Header.Add("Content-Type", "application/json")
	return w, c, r
}

func TestLogoutWithValidUser(t *testing.T) {
	w, c, _ := setUpLogoutController([]byte{}, "/logout/1", "GET", Logout)
	c.Params = []gin.Param{
		{
			Key:   "id",
			Value: "1",
		},
	}

	Logout(c)
	expected := `{"message:":"deleted token for user with id 1"}`
	assert.Equal(t, expected, w.Body.String())
}

func TestLogoutWithInValidUser(t *testing.T) {
	w, c, _ := setUpLogoutController([]byte{}, "/logout/10", "GET", Logout)
	c.Params = []gin.Param{
		{
			Key:   "id",
			Value: "10",
		},
	}

	Logout(c)
	expected := `{"error":"Unable to retrieve user token"}`
	assert.Equal(t, expected, w.Body.String())
}
