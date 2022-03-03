package utils

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"com.uf/src/models"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestGenerateTokenAndValidation(t *testing.T) {
	user := models.User{
		UserName:  "First User",
		UserEmail: "firstuser123@ufl.edu",
		UserID:    1,
	}

	token, err := GenerateToken(user)
	assert.NoError(t, err)
	assert.Equal(t, true, len(token) > 0)

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request, _ = http.NewRequest(http.MethodPost, "/", bytes.NewBuffer([]byte{}))
	c.Request.Header.Add("Authorization", "Bearer "+token)

	returnToken := ExtractToken(c)
	assert.Equal(t, token, returnToken)
	_, errr := TokenValid(c)
	assert.NoError(t, errr)
}
