# this.jobs - sprint 1
### Group Members
Ranjeet Mallipeddi (Frontend)\
Syama Vangmayi Vydyula (Frontend)\
Vishnuvardhan Reddy Jammula (Backend)\
Sai Sneha Paruchuri (Backend)

Github repository link: [https://github.com/flash29/this.jobs](https://github.com/flash29/this.jobs)
### Outline
  
  this.jobs is a platform where people can build their profile, connect with other users who share similar interests in careers and find/ apply or post new jobs

### Demo
  [Video link](link here)

Technical stack, their pre-requisites and how to setup and run both frontend and backend can be found at this [wiki](https://github.com/flash29/this.jobs/wiki/Installation)

### Backend accomplishments
- Created REST API's to create post, retrieve all posts, comment on a post, like/dislike a post. Api's accept json as data input and produces json responses
- Post creation supports attaching images when encoded in Base64 format.
- Defined the data models for post creation, comment and likes. GORM is used to automigrate the model schema to SQLite tables.
- All the data is persisted and fetched from SQLite tables related to the application.
- More about REST api's documentation can be found at this [wiki](https://github.com/flash29/this.jobs/wiki/REST-API-Documentation)

### REST API

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
