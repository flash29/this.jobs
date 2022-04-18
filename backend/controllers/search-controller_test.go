package controllers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func setUpSearchController(data []byte, url string, method string, handler gin.HandlerFunc) (*httptest.ResponseRecorder, *gin.Context, *gin.Engine) {

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

func TestSearchPeopleWithoutSearchTerm(t *testing.T) {
	w, c, r := setUpSearchController([]byte{}, "/search/people", "GET", SearchPeople)
	r.ServeHTTP(w, c.Request)
	assert.Equal(t, http.StatusBadRequest, w.Code)
	expected := `{"error":"Search query not present"}`
	assert.Equal(t, expected, w.Body.String())
}

func TestSearchPeopleWithSearchTerm(t *testing.T) {
	w, c, r := setUpSearchController([]byte{}, "/search/people", "GET", SearchPeople)
	q := c.Request.URL.Query()
	q.Add("search", "hello")
	c.Request.URL.RawQuery = q.Encode()
	r.ServeHTTP(w, c.Request)
	var posts []PeopleSearchResult
	err := json.Unmarshal(w.Body.Bytes(), &posts)
	assert.NoError(t, err)
	assert.Equal(t, 0, len(posts))
	assert.Equal(t, http.StatusOK, w.Code)
}

func TestSearchJobsWithoutSearchTerm(t *testing.T) {
	w, c, r := setUpSearchController([]byte{}, "/search/people", "GET", SearchJobs)
	r.ServeHTTP(w, c.Request)
	assert.Equal(t, http.StatusBadRequest, w.Code)
	expected := `{"error":"Search query not present"}`
	assert.Equal(t, expected, w.Body.String())
}

func TestSearchJobsWithSearchTerm(t *testing.T) {
	w, c, r := setUpSearchController([]byte{}, "/search/people", "GET", SearchJobs)
	q := c.Request.URL.Query()
	q.Add("search", "meta")
	c.Request.URL.RawQuery = q.Encode()
	r.ServeHTTP(w, c.Request)
	var posts []JobSearchResult
	err := json.Unmarshal(w.Body.Bytes(), &posts)
	assert.NoError(t, err)
	assert.Equal(t, 0, len(posts))
	assert.Equal(t, http.StatusOK, w.Code)
}
