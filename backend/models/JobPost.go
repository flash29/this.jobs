package models

type JobPost struct {
	JobID            int              `gorm:"primary_key" json:"jobId"`
	UserID           int              `json:"userId"`
	Content          string           `json:"content"`
	CreatedAt        int64            `json:"createdAt"`
	UpdatedAt        int64            `json:"updatedAt"`
	AppliedUsersList []JobApplication `gorm:"ForeignKey:JobID" json:"appliedUsersList"`
	Attachments      string           `gorm:"type:text" json:"attachments"`

	ValidTill        int64            `json:"validTill"`
	JobTitle         string           `json:"jobtitle"`
	Location         string           `json:"location"`
	Organization     string           `json:"org"`
	Salary           string           `json:"salary"`
}
