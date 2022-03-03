package utils

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func setUpLoginUtil(username string, password string) (string, error) {
	MockConnectDatabase()
	token, err := LoginCheck(username, password)
	return token, err
}
func TestLoginUtilWithValidCredentials(t *testing.T) {

	token, err := setUpLoginUtil("firstuser123@ufl.edu", "abc123")
	assert.Equal(t, err, nil)
	assert.Equal(t, true, len(token) > 0)

}

func TestLoginUtilWithInValidUser(t *testing.T) {
	token, err := setUpLoginUtil("se@ufl.edu", "ab12")
	assert.NotEqual(t, err, nil)
	assert.Equal(t, "User not found", token)

}

func TestLoginUtilWithWrongPassword(t *testing.T) {
	token, err := setUpLoginUtil("firstuser123@ufl.edu", "ab12")
	assert.NotEqual(t, err, nil)
	assert.Equal(t, "Password did not match", token)

}
