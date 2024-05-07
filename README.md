# An eCommerce api

An API for an ecommerce platform where an customer can login and view, get ,rate,and update the products

## Teck used

Tech Stack: Node.js & Mongo DB

## how to setup the project on local system

install packages: npm i

run program: npm start
By default it will be connected to port 3000

## Functionality

### Users's functions

## Test API’s using Postman:

signUp: POST=http://localhost:3000/api/storefleet/user/signup
{
"name":"",
"email":"",
"password":""
}

logIn: POST=http://localhost:3000/api/storefleet/user/login
{
"email":"",
"password":""
}

logOut: GET=http://localhost:3000/api/storefleet/user/logout

Forget password: POST=http://localhost:3000/api/storefleet/user/password/forget
{
"email":""
}

Reset password: PUT=http://localhost:3000/api/storefleet/user/password/reset/(code from the mail)
{
"newPassword":"",
"confirmPassword":""
}

Update password: PUT= http://localhost:3000/api/storefleet/user/password/update
{
"currentPassword":"",
"newPassword":"",
"confirmPassword":""
}

Update Profile: PUT= http://localhost:3000/api/storefleet/user/profile/update
{
"name":"",
"email":""
}

Update User Role: PUT= http://localhost:3000/api/storefleet/user/admin/update
{
"userId":"",
"newRole":"admin",
"newData":""
}

Get User Details: GET=http://localhost:3000/api/storefleet/user/details

### product's functions
(Admin)
Add Product: POST= http://localhost:3000/api/storefleet/product/add
{
"name":"",
"description":"",
"price":,
"category":""
}

(Admin)
Get All Product: GET= http://localhost:3000/api/storefleet/product/products

Update product By Id: PUT= http://localhost:3000/api/storefleet/product/update/65d5b463980eee55d9509b98
{
    "name":"",
    "description":"",
    "price":,
    "category":""
}

Get product By Id: GET= http://localhost:3000/api/storefleet/product/details/65d5b463980eee55d9509b98

Rate product By Id: PUT= http://localhost:3000/api/storefleet/product/rate/65d5b463980eee55d9509b98
{
    "rating":5,
    "comment":"woowww!!"
}

Get All Reviews: GET= http://localhost:3000/api/storefleet/product/reviews/65d5b463980eee55d9509b98

Delete Review and Update: DeLete = http://localhost:3000/api/storefleet/product/review/delete?productId=65d5b463980eee55d9509b98&reviewId=65d5e14a3ac7d27fa4cb6456

#### Tools Used

NodeJS
MongoDB
ExpressJS

##### Libraries
bcryptjs
express
cookie-parser
body-parser
dotenv
jsonwebtoken
express-session
mongoose
nodemailer
validator

## License

This project is **free to use** and does not contains any license.




