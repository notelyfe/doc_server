# settyl_server

## User End-points

### Create a new user
    http://localhost:8000/api/auth/createUser

#### Method: Post
#### body: 
<ul>
<li><b>name</b></li>
<li><b>email</b> Should Be Unique</li>
<li><b>password</b></li>
</ul>

### User login
    http://localhost:8000/api/auth/login

#### Method: Post
#### body: 
<ul>
<li><b>email</b></li>
<li><b>password</b></li>
</ul>

### Get user details
    http://localhost:8000/api/auth/getUserData

#### Method: Get
#### Header: <ul><li><b>Authorization:</b> Bearer access_token</li></ul>


## Document End-Pints

### Create New Doc
    http://localhost:8000/api/doc/newDoc

#### Method: Get
#### Header: <ul><li><b>Authorization:</b> Bearer access_token</li></ul>

### Get All Docs
    http://localhost:8000/api/doc/getAllDocs

#### Method: Get
#### Header: <ul><li><b>Authorization:</b> Bearer access_token</li></ul>

### Delete Docs
    http://localhost:8000/api/doc/deleteDoc/:id

#### Method: Delete
#### Header: <ul><li><b>Authorization:</b> Bearer access_token</li></ul>

### Share Doc
    http://localhost:8000/api/doc/shareDoc

#### Method: Post
#### Header: <ul><li><b>Authorization:</b> Bearer access_token</li></ul>
#### Body: <ul> <li>doc_id</li> <li>share_to: [{<li>email</li> <li>permission</li>}]</li></ul>

### Edit Doc Name
    http://localhost:8000/api/doc/editName

#### Method: Put
#### Header: <ul><li><b>Authorization:</b> Bearer access_token</li></ul>
#### Body: <ul> <li>doc_id</li> <li>name</li></ul>

### Edit Doc Permission
    http://localhost:8000/api/doc/editPermission

#### Method: Patch
#### Header: <ul><li><b>Authorization:</b> Bearer access_token</li></ul>
#### Body: <ul> <li>docId</li> <li>user</li></ul>

## Test account

    email - test1@gmail.com
    password - Test@123

    email - test2@gmail.com
    password - Test@123