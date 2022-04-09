package models

type ConnectionRequest struct {
	RequestID   int   `gorm:"primary_key" json:"requestId"`
	RequestedBy int   `json:"requestedBy"`
	ConnectTo   int   `json:"connectTo"`
	CreatedAt   int64 `json:"createdAt"`
	UpdatedAt   int64 `json:"updatedAt"`
}
