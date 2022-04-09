package controllers

import (
	"strconv"
	"time"

	"com.uf/src/models"
	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
)

func RequestConnection(c *gin.Context) {
	var request models.ConnectionRequest
	c.BindJSON(&request)
	var existingRequest models.ConnectionRequest
	result := utils.DB.Where("requested_by = ? and connect_to = ?", request.RequestedBy, request.ConnectTo).First(&existingRequest)
	if result != nil && result.RowsAffected > 0 {
		c.JSON(400, gin.H{"error": "You have already requested a connection from the user"})
		return
	}
	if !isUserPresent(request.RequestedBy) {
		c.JSON(400, gin.H{"error": "Unable to find user with ID " + strconv.Itoa(request.RequestedBy)})
		return
	}
	if !isUserPresent(request.ConnectTo) {
		c.JSON(400, gin.H{"error": "Unable to find user with ID " + strconv.Itoa(request.ConnectTo)})
		return
	}

	request.CreatedAt = time.Now().Unix()
	utils.DB.Create(&request)
	c.JSON(200, request)

}
