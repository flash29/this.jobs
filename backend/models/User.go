package models

import (
	"github.com/lib/pq"
)

type User struct {
	UserID         int            `gorm:"primary_key" json:"userId"`
	UserEmail      string         `gorm:"type:text" json:"userEmail"`
	UserName       string         `gorm:"type:text" json:"userName"`
	Password       string         `gorm:"type:text" json:"password"`
	DisplayPicture string         `gorm:"type:text" json:"dp"`
	Following      pq.StringArray `gorm:"type:text[]" json:"following"`
	CreatedAt      int64          `json:"createdAt"`
	UpdatedAt      int64          `json:"updatedAt"`
}
