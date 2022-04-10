package models

type JobApplication struct {
	ApplicationID int    `gorm:"primary_key" json:"applicationId"`
	UserID        int    `json:"userId"`
	UserName      string `json:"userName"`
	JobID         uint   `json:"jobId"`
	CreatedAt     int64  `json:"createdAt"`
	UpdatedAt     int64  `json:"updatedAt"`
}
