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

#### Create Post
The end point
```
http://localhost:8080/post
```
is used to create new posts, it is a `POST` method and the json data of UserPost structure is mentioned below
![](./assets/createPost.png)

`createdBy` , `content` and `tag` are mandatory fields to create a new post.
`attachments` can be any file which is base64 encoded

After sucessful creation of post, the following response with status `200` is seen.

![](./assets/createPost_response.png)

Incase of error the status will be `400` with the error message "unable to create post" 

#### Retrieve Feed
The end point
```
http://localhost:8080/feed
```
is used to create new posts, it is a `GET` method without any parameters. The following response with status `200` is seen after successful retrieval.

![](./assets/feedRetrieval.png)

Incase of error the status will be `400` with the error message "unable to retrieve feed posts" 

#### Update Likes

The end point
```
http://localhost:8080/updatelikes
```
is used to create new posts, it is a `PUT` method and the json data of Like structure is mentioned below and all the fields are mandatory.
![](./assets/updateLikes.png)



`updated likes` will be the success response with status `200`.

Incase of error the status will be `400` with the error message "You already liked the post" 

#### Post Comment

The end point
```
http://localhost:8080/postcomment
```
is used to create new posts, it is a `POST` method and the json data of Like structure is mentioned below all the fields are mandatory.
![](./assets/postComment.png)


The success response will be the comment data with status `200`.

Incase of error the status will be `400` with the error message "Unable to add comment"