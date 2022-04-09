package controllers

import (
	"strconv"
	"time"

	"com.uf/src/models"
	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
)

func RequestConnection(c *gin.Context) {
	var request models.ConnectionRequest
	c.BindJSON(&request)
	// requestedFrom and requestedTo cannot be the same person
	if request.RequestedFrom == request.RequestedTo {
		c.JSON(400, gin.H{"error": "Requested From and To cannot be the same user!"})
		return
	}
	var existingRequest models.ConnectionRequest
	result := utils.DB.Where("requested_from = ? and requested_to = ?", request.RequestedFrom, request.RequestedTo).First(&existingRequest)

	var existingRequest1 models.ConnectionRequest
	result1 := utils.DB.Where("requested_from = ? and requested_to = ?", request.RequestedTo, request.RequestedFrom).First(&existingRequest1)
	if result != nil && result.RowsAffected == 1 {
		c.JSON(400, gin.H{"error": "You have already requested a connection from the user"})
		return
	}
	if result1 != nil && result1.RowsAffected == 1 {
		c.JSON(400, gin.H{"error": "The user has already requested a connection from you. Please approve it."})
		return
	}
	if !isUserPresent(request.RequestedFrom) {
		c.JSON(400, gin.H{"error": "Unable to find user with ID " + strconv.Itoa(request.RequestedFrom)})
		return
	}
	if !isUserPresent(request.RequestedTo) {
		c.JSON(400, gin.H{"error": "Unable to find user with ID " + strconv.Itoa(request.RequestedTo)})
		return
	}
	//already connected user check
	var requestingUser models.User
	utils.DB.Where("user_id = ?", request.RequestedFrom).First(&requestingUser)

	if !followingCheck(requestingUser.Following, request.RequestedTo) {
		request.CreatedAt = time.Now().Unix()
		utils.DB.Create(&request)
		c.JSON(200, request)
	} else {
		c.JSON(400, gin.H{"error": "You are already connected to " + strconv.Itoa(request.RequestedTo)})
	}

}
func followingCheck(followers pq.Int64Array, requestor int) bool {
	for _, a := range followers {
		if int(a) == requestor {
			return true
		}
	}
	return false
}
