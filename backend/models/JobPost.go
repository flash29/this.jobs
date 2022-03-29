package models

import (
	"time"
)

type JobPost struct {
	JobID            int              `gorm:"primary_key" json:"jobId"`
	CreatedBy        string           `json:"createdBy"`
	Content          string           `json:"content"`
	CreatedAt        int64            `json:"createdAt"`
	UpdatedAt        int64            `json:"updatedAt"`
	AppliedUsersList []JobApplication `gorm:"ForeignKey:JobID" json:"appliedUsersList"`
	Attachments      string           `gorm:"type:text" json:"attachments"`
	ValidTill        time.Time        `json:"validTill"`
}
