package models

import (
	"github.com/lib/pq"
)

type User struct {
	UserID         int            `gorm:"primary_key" json:"userId"`
	UserEmail      string         `gorm:"unique type:text" json:"useremail" `
	UserName       string         `gorm:"type:text" json:"username"`
	Password       string         `gorm:"type:text" json:"password"`
	DisplayPicture string         `gorm:"type:text" json:"picture"`
	Following      pq.StringArray `gorm:"type:text[]" json:"following"`
	CreatedAt      int64          `json:"createdAt"`
	UpdatedAt      int64          `json:"updatedAt"`
	Bio            string         `gorm:"type:text" json:"bio"`
	EducationList  []Education    `gorm:"ForeignKey:UserID" json:"education"`
	ProjectList    []Project      `gorm:"ForeignKey:UserID" json:"projects"`
	JobHistoryList []JobHistory   `gorm:"ForeignKey:UserID" json:"jobhistory"`
}

type Education struct {
	EducationId int    `gorm:"primary_key" json:"educationId"`
	InsName     string `json:"insName"`
	Timeline    string `json:"timeline"`
	Gpa         string `json:"gpa"`
	UserID      uint   `json:"userId"`
}

type Project struct {
	ProjectId   int    `gorm:"primary_key" json:"projectId"`
	ProjName    string `json:"projName"`
	Description string `json:"description"`
	UserID      uint   `json:"userId"`
}

type JobHistory struct {
	JobHistoryId int    `gorm:"primary_key" json:"jobHistoryId"`
	Company      string `json:"company"`
	Timeline     string `json:"timeline"`
	Position     string `json:"position"`
	UserID       uint   `json:"userId"`
}
