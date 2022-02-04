# this.jobs - sprint 1
### Group Members
Vishnuvardhan Reddy Jammula\
Ranjeet Mallipeddi\
Syama Vangmayi Vydyula\
Sai Sneha Paruchuri
### Outline
  
  this.jobs is a platform where people can build their profile, connect with other users who share similar interests in careers and find/ apply or post new jobs

### Demo
  [Video link](link here)

### Pre-requisites:
Nodejs\
Go lang\
Gcc compiler
### Language used: 
React\
Go lang

### Steps to compile and run:

1) Navigate to the backend folder
2) Run the following command in terminal to start Server:
```
go run main.go
```
On first run all the required packages will be installed and  the APIs will be exposed on `localhost:8080`

In-memory SQLite3 database is used with GORM and the data which is posted will be stored in `jobs.db`
### REST APIs

#### create post
The end point
```
http://localhost:8080/post
```
is used to create new posts and the json data structure of UserPost structure is mentioned below
![](./assets/createPost.png)

`createdBy` , `content` and `tag` are mandatory fields to create a new post.
`attachments` can be any file which is base64 encoded
