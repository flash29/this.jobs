package models

type UserLogin struct {
	UserEmail string `json:"useremail" binding:"required"`
	Password  string `json:"password" binding:"required"`
}
