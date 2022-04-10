package models

type ConnectionRequest struct {
	RequestID     int    `gorm:"primary_key" json:"requestId"`
	RequestedFrom int    `json:"requestedFrom"`
	RequestorName string `json:"requestorName"`
	RequestedTo   int    `json:"requestedTo"`
	CreatedAt     int64  `json:"createdAt"`
}
