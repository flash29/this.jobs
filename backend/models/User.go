package models

import (
	"github.com/lib/pq"
)

type User struct {
	UserID         int            `gorm:"primary_key" json:"userId"`
	UserName       string         `gorm:"type:text" json:"userName"`
	Password       string         `gorm:"type:text" json:"password"`
	DisplayPicture string         `gorm:"type:text" json:"dp"`
	Bio            string         `gorm:"type:text" json:"bio"`
	Following      pq.StringArray `gorm:"type:text[]" json:"following"`
	EducationList  []Education    `gorm:"ForeignKey:UserID" json:"education"`
	PorjectList    []Project      `gorm:"ForeignKey:UserID" json:"projects"`
	JobHistoryList []JobHistory   `gorm:"ForeignKey:UserID" json:"jobhistory"`
}

type Education struct {
	EducationId int    `gorm:"primary_key" json:"educationId"`
	InsName     string `json:"InsName"`
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
