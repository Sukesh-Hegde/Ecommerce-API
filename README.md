# An eCommerce api

An API for an ecommerce platform where an customer can login and view, get ,rate,and update the products

## Teck used

Tech Stack: Node.js & Mongo DB

## how to setup the project on local system

install packages: npm i

run program: npm start
By default it will be connected to port 8000

## Functionality

### Users's functions

## Test API’s using Postman:

1)ignUp: POST=http://localhost:8000/user/signup
{
"name":"",
"email":"",
"password":""
}

2)logIn: POST= http://localhost:8000/user/signin
{
"email":"",
"password":""
}

3)logOut: GET= http://localhost:8000/user/logout

4)Forget password: POST= http://localhost:8000/user/password/forget
{
"email":""
}

5)Reset password: PUT= http://localhost:8000/user/password/reset/(OTP code from the mail)
{
"newPassword":"",
"confirmPassword":""
}


6)Update Profile: PUT= http://localhost:8000/user/profile/update
{
"name":"",
"email":""
}

7)Update User Role(Admin): PUT= http://localhost:8000/user/admin/update
{
"userId":"",
"newRole":"admin",
}

8)Get Individal user detail(their own detail): GET= http://localhost:8000/user/details

9)Delete any user(Admin): DELETE= http://localhost:8000/user/admin/delete/:id

### product's functions
(Admin)
1)Add Product: POST= http://localhost:8000/products/add
{
"name":"",
"description":"",
"price":,
"category":""
"images":{"public_id":"123w",
"url":"ww.baby.com"}
}


2)Get All Product: GET= http://localhost:8000/products

3)Update product By Id(Admin): PUT= http://localhost:3000/api/storefleet/product/update/65d5b463980eee55d9509b98
{
    "name":"",
    "description":"",
    "price":,
    "category":""
}

4)Get product By Id: GET= http://localhost:8000/products/details/:id

5)Rate and review product By Id: PUT= http://localhost:8000/products/addReview/:id
{
    "rating":5,
    "comment":"woowww!!"
}

6)Get All Reviews: GET= http://localhost:8000/products/reviews/:id

Delete Review and Update: DeLete = http://localhost:8000/products/review/delete?productId=663b1d33d245e0d5d9a53956&reviewId=663b626af23280db5341d61e

### Order functions

post order: POST= http://localhost:3000/api/storefleet/order/new

{
  "shippingInfo": {
    "address": "123 Main St",
    "city": "City",
    "state": "State",
    "country": "IN",
    "pincode": 123456,
    "phoneNumber": 1234567890
  },
  "orderedItems": [
    {
      "name": "Product Name",
      "price": 10,
      "quantity": 2,
      "image": "https://example.com/image.jpg",
      "product": "65d5b1b0a8332c1ed9e54d18" // Replace with the ObjectId of the product
    }
  ],
  "user": "", 
  "paymentInfo": {
    "id": "paymentId",
    "status": true
  },
  "paidAt": "2022-04-10T08:00:00Z",
  "itemsPrice": 20,
  "taxPrice": 2,
  "shippingPrice": 5,
  "totalPrice": 27,
  "orderStatus": "Processing",
  "createdAt": "2022-04-10T08:00:00Z"
}


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
passport-jwt
crypto

## License

This project is **free to use** and does not contains any license.




