package utils

import (
	"testing"
)

func TestLoginCheck(t *testing.T) {
	type args struct {
		username string
		password string
	}
	var u1 args
	u1.username = "firstuser123@ufl.edu"
	u1.password = "abc123"
	tests := []struct {
		name    string
		args    args
		want    string
		wantErr bool
	}{
		// TODO: Add test cases.
		{
			name:    "first_test",
			args:    u1,
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			MockConnectDatabase()
			got, err := LoginCheck(tt.args.username, tt.args.password)
			if (err != nil) != tt.wantErr {
				t.Errorf("LoginCheck() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if len([]rune(got)) == 0 {
				t.Errorf("LoginCheck() = %v, want %v", got, tt.want)
			}
		})
	}
}
