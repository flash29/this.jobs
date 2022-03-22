package models

import (
	"github.com/lib/pq"
)

type JobPost struct {
	PostID           int            `gorm:"primary_key" json:"postId"`
	CreatedBy        string         `json:"createdBy"`
	Content          string         `json:"content"`
	CreatedAt        int64          `json:"createdAt"`
	UpdatedAt        int64          `json:"updatedAt"`
	AppliedUsersList pq.StringArray `gorm:"type:text[]" json:"appliedUsersList"`
	Attachments      string         `gorm:"type:text" json:"attachments"`
}
