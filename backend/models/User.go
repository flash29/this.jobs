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
}
