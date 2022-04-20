# this.jobs - sprint 4
### Group Members
Ranjeet Mallipeddi (Frontend)\
Syama Vangmayi Vydyula (Frontend)\
Vishnuvardhan Reddy Jammula (Backend)\
Sai Sneha Paruchuri (Backend)

Github repository link: [https://github.com/flash29/this.jobs](https://github.com/flash29/this.jobs)
### Outline
  
  this.jobs is a platform where people can build their profile, connect with other users who share similar interests in careers and find/ apply or post new jobs

### Demo
  Complete demo is [here](https://uflorida-my.sharepoint.com/:v:/g/personal/paruchuri_s_ufl_edu/EYzrmREymWtCp0nnXiWWM6QBg1Xakiy6IwZsfNo79LmmpQ?e=h3oelv)
  
  Backend demo can be found [here](https://uflorida-my.sharepoint.com/:v:/g/personal/paruchuri_s_ufl_edu/EaLDnL6l7_VPhUuInUm6ILkBJA55_pPUaNtJv-lb9PsHMg?e=Y1UpB9) 

  Frontend demo can be found [here](https://uflorida-my.sharepoint.com/:v:/g/personal/paruchuri_s_ufl_edu/EXF3CeTdwwZFsy5fZhvg85EBT8hBkkdcqowFyz4Gbug0dg?e=QXZn2U)


Technical stack, their pre-requisites and how to setup and run both frontend and backend can be found at this [wiki](https://github.com/flash29/this.jobs/wiki/Installation)

### Backend accomplishments
- Created REST API's to search jobs, people based on company school or names and request, accept or decline connection from other users, few other APIs to display the list of pending requests and connected users are included. Api's accept json as data input and produces json responses
- Search takes a keyword and retrieves users and jobs which contain the query parameter.
- Users can view suggested connections based on their educational institute or their company and send a connection request to them. Multiple requests to the same person are not allowed. The other user can decide to accept or decline the connection request.
- Defined the data models for ConnectionRequest and Token. GORM is used to automigrate the model schema to SQLite tables.
- All the data is persisted and fetched from SQLite tables related to the application.
- Unitests are created for all the APIs in the appropriate controller files.
- More about REST api's documentation can be found at this [wiki](https://github.com/flash29/this.jobs/wiki/REST-API-Documentation)



### REST API

#### Request a Connection

URL: `<base_url>/requestconnection`

Request Method: `POST`

![](./assets/requestconnection.PNG)

Id associated to the job is an auto-incrementing value and is assigned directly in the database. `requestedFrom` and `requestedTo` are required fields to request a connection.\
Response:

Possible Response status : `200, 400`

Example: Response status 200
The request has been created and the response with status 200 shows the newly created request details with id.

![](./assets/requestconnection_op.PNG)

#### Accept a Connection Request

URL: `<base_url>/acceptconnection`

Request Method: `POST`

![](./assets/acceptconnection.PNG)

Id associated to the job is an auto-incrementing value and is assigned directly in the database. `requestId` and `requestedTo` are required fields to accept the connection.\
Response:

Possible Response status : `200, 400`

Example: Response status 200
The request has been created and the response with status 200 shows the appropriate success message.

![](./assets/acceptconnection_op.PNG)

#### Decline a Connection Request

URL: `<base_url>/declineconnection`

Request Method: `POST`

![](./assets/declineconnection.PNG)

Id associated to the job is an auto-incrementing value and is assigned directly in the database. `requestId` and `requestedTo` are required fields to accept the connection.\
Response:

Possible Response status : `200, 400`

Example: Response status 400
There is no request with the provided request ID so an error message is displayed.

![](./assets/declineconnection_op.PNG)

#### Retrieve Pending Connection Requests
URL: `<base_url>/connectionrequests/<user_id>`

Request Method: `GET`

![](./assets/connectionrequests.PNG)


Possible Response status: `200, 404`

Message format: `json`

Example

Code: 200 OK

```
[
    {
        "requestId": 2,
        "requestedFrom": 3,
        "requestorName": "Sneha P",
        "requestedTo": 2,
        "createdAt": 1650241385
    }
]
```

#### People You May Know
List of users with same educational institute or working in the same company are retrieved.

URL: `<base_url>/peopleyoumayknow/<user_id>`

Request Method: `GET`

![](./assets/peopleyoumayknow.PNG)


Possible Response status: `200, 404`

Message format: `json`

Example

Code: 200 OK

```
[
    {
        "userId": 3,
        "useremail": "",
        "username": "Sneha P",
        "password": "",
        "picture": "",
        "resumepath": "",
        "following": null,
        "createdAt": 0,
        "updatedAt": 0,
        "bio": "",
        "education": null,
        "projects": null,
        "jobhistory": null
    }
]
```
#### Retrieve My Followers
URL: `<base_url>/followers/<user_id>`

Request Method: `GET`

![](./assets/followers.PNG)


Possible Response status: `200, 404`

Message format: `json`

Example

Code: 200 OK

```
[
    {
        "userId": 2,
        "useremail": "",
        "username": "Sneha",
        "password": "",
        "picture": "",
        "resumepath": "",
        "following": null,
        "createdAt": 0,
        "updatedAt": 0,
        "bio": "",
        "education": null,
        "projects": null,
        "jobhistory": null
    }
]
```
#### Search people
URL: `<base_url>/search/people?search=<search_term>`

Request Method: `GET`

![](./assets/search_people.PNG)

Possible Response status: `200, 400, 500`

Message format: `json`

Example

Code: 200 OK

```
[
    {
        "userId": 1,
        "useremail": "u1@app.com",
        "username": "u1",
        "bio": ""
    }
]
```
#### Search jobs
URL: `<base_url>/search/jobs?search=<search_term>`

Request Method: `GET`

![](./assets/search_people.PNG)

Possible Response status: `200, 400, 500`

Message format: `json`

Example

Code: 200 OK

```
[
    {
        "userId": "1",
        "useremail": "u1@app.com",
        "username": "u1",
        "jobId": 1,
        "content": "Job posting 1",
        "createdAt": 1650339367,
        "validTill": 1648958949,
        "jobtitle": "sde",
        "location": "gnv",
        "org": "google",
        "salary": "10000"
    }
]
```
#### Unit Tests

A mock database is created and unit tests are performed on the data from mock DB. The below sections show the unit testing output along with their coverage
#### Connection Requests Unit Tests

Test cases include searching jobs, people, request, accept and decline of connections with valid and invalid details and also retrieval of pending requests.
<!-- should update screenshot -->
![](./assets/search_controller_unit_tests.PNG)
![](./assets/connection_controller_unit_tests.PNG)


### Frontend accomplishments

#### Connections – 
The connections page is mainly the component which allows us to find, request and view our connections. It has the following tabs :
a.	My Connections – This tab displays all the list of people that we are already connected to / are friends with. If we click on a connection, it will direct us to their profile.
b.	Pending Requests – This tab displays the list of all people that have sent out a request to connect with the user, but the user hasn’t accepted that request yet. A user can either accept the request or decline it. Users can also view the profiles of the users who requested before accepting or declining by clicking on their name.
c.	Suggestions – This tab would display the list of all people that the user may know through similar educational interests or work experiences. In case the user does not have anything on their profiles then all the users available would be displayed. The user can send requests to those users based on the suggestions by clicking the request button next to their names. They can also checkout their profiles by clicking on their names.

My Connections - \
![image](https://user-images.githubusercontent.com/35343343/164289226-bb9b0bc1-be17-4956-bdc5-83b4244f2a57.png)

Pending Requests - \
![image](https://user-images.githubusercontent.com/35343343/164289326-9e42e4c6-107e-4556-be4b-d3f67f968518.png)

Suggestions - \
![image](https://user-images.githubusercontent.com/35343343/164289425-a923fa19-c4bb-4d19-8e56-883d6b43bb67.png)


#### Search – 
This allows users to search for any jobs, people, posts that they are interested in. Clicking on the search results would direct the user to whatever they intended to find and the user can act accordingly later.

![image](https://user-images.githubusercontent.com/35343343/164289091-301f9c9b-73be-4850-88ef-e2ef5c402dff.png)

![image](https://user-images.githubusercontent.com/35343343/164288941-3ad13fc0-5466-433f-afac-b99408b464d8.png)


#### Jobs - 
The jobs portal was made more user friendly and we added a few more features to these tabs to make the access even more simpler and easier.

![image](https://user-images.githubusercontent.com/35343343/164288878-83ac2f89-04d0-4710-8884-3c9771794750.png)



