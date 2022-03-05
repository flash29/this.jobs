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
  Combined demo link is found [here]()

Technical stack, their pre-requisites and how to setup and run both frontend and backend can be found at this [wiki](https://github.com/flash29/this.jobs/wiki/Installation)

### Backend accomplishments
- Created REST API's to register user, login, update the user profile details like Bio and Display Picture, add and update education details, add and update job deatils and project details. Api's accept json as data input and produces json responses
- User registration takes basic details like user name, email and password. All the other details in the profile can be updated using the update APIs
- User Login and registration are public APIs and all other APIs are protected and authorized based on the JSON Web Token which is created after successful login.
- Defined the data models for user, education, job and projects. GORM is used to automigrate the model schema to SQLite tables.
- All the data is persisted and fetched from SQLite tables related to the application.
- Unitests are created for all the APIs in the appropriate controller files.
- More about REST api's documentation can be found at this [wiki](https://github.com/flash29/this.jobs/wiki/REST-API-Documentation)

Backend demo link is found [here]()

### REST API

#### Register User

URL: `<base_url>/auth/register`

Request Method: `POST`

![](./assets/register.PNG)

Id associated to the user is an auto-incrementing value and is assigned directly in the database. `userName, userEmail` and `password` are required fields to register any user. All other user related details can be updated later in the profile section.
Response:

Possible Response status : `201, 400`

Example: Response status 201
The user has been registered and the response with status 201 shows the newly created user details.

![](./assets/register_response.PNG)

#### Login

URL: `<base_url>/auth/login`

Request Method: `POST`

![](./assets/login.PNG)
Both `useremail` and `password` are required. 
Response:

Possible Response status : `200, 400`

Example:

Response status : `200`

![](./assets/login_response.PNG)

#### Get User Profile
URL: `<base_url>/userprofile/:id`

Request Method: `GET`
![](./assets/getprofile.PNG)
Possible Response status: `200, 404`

Message format: `json`

Example

Code: 200 OK

![](./assets/getprofile_response.PNG)
#### Update Profile Picture
URL: `<base_url>/updatepic`

Request Method: `PUT`

![](./assets/updatepicture.PNG)
All the fields are mandatory

Possible Response status: `200, 400`

Message format: `json`

Example

Code: 200 OK

```
{
        "message": "Profile photo uploaded successfully"
}
```

#### Update Bio
URL: `<base_url>/updatebio`

Request Method: `PUT`

![](./assets/updatebio.PNG)
All the fields are mandatory

Possible Response status: `200, 400`

Message format: `json`

Example

Code: 200 OK

![](./assets/updatebio_response.PNG)
#### Add Education Details
URL: `<base_url>/addeducation`

Request Method: `POST`

![](./assets/addeducation.PNG)

Possible Response status: `201, 400`

Message format: `json`

Example

Code: 200 OK

```
{
        "educationId" : 1,
        "insName": "UF",
        "timeline": "string format of time",
        "gpa" : "",
        "userId" : 1
}
```
#### Add Job Details
URL: `<base_url>/addjob`

Request Method: `POST`

![](./assets/addjob.PNG)

Possible Response status: `201, 400`

Message format: `json`

Example

Code: 200 OK

![](./assets/addjob_response.PNG)

#### Add Project Details
URL: `<base_url>/addproject`

![](./assets/addproject.PNG)


Possible Response status: `201, 400`

Message format: `json`

Example

Code: 201 Created

![](./assets/addproject_response.PNG)

#### Update Education Details
URL: `<base_url>/updateducation`

Request Method: `PUT`

![](./assets/updateeducation.PNG)
educationId and userId are mandatory

Possible Response status: `201, 400`

Message format: `json`

Example

Code: 200 OK

```
{
        "educationId" : 1,
        "insName": "UF",
        "timeline": "string format of time",
        "gpa" : "",
        "userId" : 1
}
```

#### Update Job Details
URL: `<base_url>/updatejob`

Request Method: `PUT`

![](./assets/updatejob.PNG)
jobHistoryId and userId are mandatory

Possible Response status: `201, 400`

Message format: `json`

Example

Code: 200 OK

![](./assets/updatejob_response.PNG)


#### Update Project Details
URL: `<base_url>/updateproject`

Request Method: `PUT`

![](./assets/updateproject.PNG)
projectId and userId are mandatory

Possible Response status: `201, 400`

Message format: `json`

Example

Code: 200 OK

![](./assets/updateproject_response.PNG)

#### Unit Tests

A mock database will be created and unit tests will be performed on the data from mock DB.
#### User Registration

Test cases include User registartion with valid and invalid details and also registering the same user twice.

![](./assets/register_test.PNG)

#### User Login

Test cases include user login with valid and invalid credentials

![](./assets/login_test.PNG)

#### User Proflie

Test cases are included to check the addition and updation of education details, projects and jobs along with bio and display picture updation.
![](./assets/userprofile_test.PNG)


### Frontend accomplishments
- Created the homepage of the application
- Created the navigation bar and routes to the various links on the navigation bar - home, jobs, connections, settings
- Created a searchBar which allows a user to perform search operations. (currently routes to a different page which is to be developed in further sprints)
- Created a postBox which allows users to create a post with multimedia content - photos, pdfs and links. Further, the mandatory comment and tag fields are a part of the post-box. Tags help users to search for relevant content that they are looking for. Each time a user creates a post, the post gets updated on the user's feed. This component appears on the home page of the application.
- Created a PostCard which automatically gets loaded onto a user's feed when he/she posts something. This feature has like and comment options which were also developed. Further, in the user's feed, the posts are displayed in the order of relevance.
- More about frontend documentation can be found at this [wiki](https://github.com/flash29/this.jobs/wiki/File-Structure)

Frontend demo link is found [here]()

### Frontend HomePage

![](./assets/HomePage.png)

