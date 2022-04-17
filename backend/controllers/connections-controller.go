package controllers

import (
	"net/http"
	"strconv"
	"strings"
	"time"

	"com.uf/src/models"
	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
)

func RequestConnection(c *gin.Context) {
	var request models.ConnectionRequest
	c.BindJSON(&request)
	//user check
	if !isUserPresent(request.RequestedFrom) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to find user with ID " + strconv.Itoa(request.RequestedFrom)})
		return
	}
	if !isUserPresent(request.RequestedTo) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to find user with ID " + strconv.Itoa(request.RequestedTo)})
		return
	}

	// requestedFrom and requestedTo cannot be the same person
	if request.RequestedFrom == request.RequestedTo {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Requested From and To cannot be the same user!"})
		return
	}
	//existing request
	var existingRequest models.ConnectionRequest
	result := utils.DB.Where("requested_from = ? and requested_to = ?", request.RequestedFrom, request.RequestedTo).First(&existingRequest)

	var existingRequest1 models.ConnectionRequest
	result1 := utils.DB.Where("requested_from = ? and requested_to = ?", request.RequestedTo, request.RequestedFrom).First(&existingRequest1)
	if result != nil && result.RowsAffected == 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "You have already requested a connection from the user"})
		return
	}
	if result1 != nil && result1.RowsAffected == 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "The user has already requested a connection from you. Please approve it."})
		return
	}

	//already connected user check
	var requestingUser models.User
	utils.DB.Where("user_id = ?", request.RequestedFrom).First(&requestingUser)
	if !followingCheck(requestingUser.Following, request.RequestedTo) {
		request.CreatedAt = time.Now().Unix()
		request.RequestorName = requestingUser.UserName
		utils.DB.Create(&request)
		c.JSON(http.StatusOK, request)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "You are already connected to " + strconv.Itoa(request.RequestedTo)})
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

func AcceptConnection(c *gin.Context) {
	var request models.ConnectionRequest
	c.BindJSON(&request)
	//connection is retrieved first to get requested from and to ids
	var existingRequest models.ConnectionRequest
	result := utils.DB.Where("request_id = ? ", request.RequestID).First(&existingRequest)
	if result == nil || result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Request Not Found"})
		return
	}
	var requestedToUser models.User
	u := utils.DB.Where("user_id = ?", existingRequest.RequestedTo).First(&requestedToUser)
	if u == nil || u.RowsAffected != 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Did not find any user with Id " + strconv.Itoa(request.RequestedTo)})
		return
	}

	//delete the request if the requested user does not exist
	if !isUserPresent(existingRequest.RequestedFrom) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to find the requested user with ID " + strconv.Itoa(existingRequest.RequestedFrom)})
		utils.DB.Where("request_id = ?", request.RequestID).Delete(&request)
		return
	}
	//requested user and loggedIn user check
	var requestingUser models.User
	utils.DB.Where("user_id = ?", request.RequestedFrom).First(&requestingUser)
	if request.RequestedTo != existingRequest.RequestedTo {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Connection can only be accepted by user with id " + strconv.Itoa(request.RequestedTo)})
		return
	}

	d := utils.DB.Where("request_id = ?", request.RequestID).Delete(&request)
	if d.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"message:": "Unable to accept the connection request at the moment."})
	} else {
		requestedToUser.Following = append(requestedToUser.Following, int64(existingRequest.RequestedFrom))
		var requestedFromUser models.User
		utils.DB.Where("user_id = ?", existingRequest.RequestedFrom).First(&requestedFromUser)
		requestedFromUser.Following = append(requestedFromUser.Following, int64(existingRequest.RequestedTo))

		utils.DB.Save(&requestedFromUser)
		utils.DB.Save(&requestedToUser)
		c.JSON(http.StatusOK, gin.H{"message:": "Accepted Connection from " + strconv.Itoa(existingRequest.RequestedFrom)})
	}

}

func RetrieveConectionRequestsById(c *gin.Context) {
	var connectionReqs []models.ConnectionRequest
	id, _ := strconv.Atoi(c.Params.ByName("id"))
	if !isUserPresent(id) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve user"})
		return
	}

	result := utils.DB.Where("requested_to = ? ", id).Order("created_at desc").Find(&connectionReqs)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve connection requests"})
	} else {
		c.JSON(http.StatusOK, connectionReqs)
	}
}

func RetrievePeopleYouMayKnowById(c *gin.Context) {
	var usersList []models.User
	id, _ := strconv.Atoi(c.Params.ByName("id"))

	var userProfile models.User
	Result := utils.DB.Preload("EducationList").Preload("ProjectList").Preload("JobHistoryList").Where("user_id = ?", id).First(&userProfile)
	if Result == nil || Result.RowsAffected != 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve user"})
		return
	}
	var followers string
	followers = strconv.Itoa(id)
	for _, a := range userProfile.Following {
		followers += ", " + strconv.Itoa(int(a))
	}

	//add people from same school or company in where clause
	var companies string
	for _, a := range userProfile.JobHistoryList {
		companies += ", '" + a.Company + "'"
	}
	var institutes string
	for _, a := range userProfile.EducationList {
		institutes += ", '" + a.InsName + "'"
	}
	var whereClause string
	if companies != "" {
		companies = strings.Replace(companies, ", ", "", 1)
		whereClause += " (job_histories.company in (" + companies + ")"
	}

	if institutes != "" {
		institutes = strings.Replace(institutes, ", ", "", 1)
		if whereClause != "" {
			whereClause += "or educations.ins_name in (" + institutes + ") ) and "
		} else {
			whereClause += "educations.ins_name in (" + institutes + ") and "
		}
	}

	result := utils.DB.Select(" distinct users.user_id, users.user_name").
		Joins("left join educations on educations.user_id = users.user_id").
		Joins("left join job_histories on job_histories.user_id = users.user_id").
		Where(whereClause + " users.user_id not in (" + followers + ")").Limit(10).Find(&usersList)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve users"})
	} else {
		c.JSON(http.StatusOK, usersList)
	}
}

func RetrieveFollowersById(c *gin.Context) {
	var followers []models.User
	id, _ := strconv.Atoi(c.Params.ByName("id"))
	var userProfile models.User
	Result := utils.DB.Where("user_id = ?", id).First(&userProfile)
	if Result == nil || Result.RowsAffected != 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve user"})
		return
	}

	for _, a := range userProfile.Following {
		var user models.User
		//only id and name are retrieved although it's user object
		Result := utils.DB.Select("user_id, user_name").Where("user_id = ?", a).First(&user)
		if Result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve all followers."})
		} else {
			followers = append(followers, user)
		}
	}

	c.JSON(http.StatusOK, followers)
}

func DeclineConnection(c *gin.Context) {
	var request models.ConnectionRequest
	c.BindJSON(&request)
	//connection is retrieved first to get requested from and to ids
	var existingRequest models.ConnectionRequest
	result := utils.DB.Where("request_id = ? ", request.RequestID).First(&existingRequest)
	if result == nil || result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Request Not Found"})
		return
	}
	var requestedToUser models.User
	u := utils.DB.Where("user_id = ?", existingRequest.RequestedTo).First(&requestedToUser)
	if u == nil || u.RowsAffected != 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Did not find any user with Id " + strconv.Itoa(request.RequestedTo)})
		return
	}

	//delete the request if the requested user does not exist
	if !isUserPresent(existingRequest.RequestedFrom) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to find the requested user with ID " + strconv.Itoa(existingRequest.RequestedFrom)})
		utils.DB.Where("request_id = ?", request.RequestID).Delete(&request)
		return
	}

	var requestingUser models.User
	utils.DB.Where("user_id = ?", request.RequestedFrom).First(&requestingUser)
	if request.RequestedTo != existingRequest.RequestedTo {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Connection can only be declined by user with id " + strconv.Itoa(request.RequestedTo)})
		return
	}

	d := utils.DB.Where("request_id = ?", request.RequestID).Delete(&request)
	if d.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"message:": "Unable to decline the connection request at the moment."})
	} else {
		c.JSON(http.StatusOK, gin.H{"message:": "Declined Connection from " + strconv.Itoa(existingRequest.RequestedFrom)})
	}

}
