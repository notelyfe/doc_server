# settyl_server

## End-points

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

### Create New Doc
    http://localhost:8000/api/doc/newDoc

#### Method: Post
#### Header: <ul><li><b>Authorization:</b> Bearer access_token</li></ul>
body:
<ul>
<li><b>doc_name</b></li>
<li><b>created_by</b></li>
<li><b>doc_id</b></li>
</ul>

