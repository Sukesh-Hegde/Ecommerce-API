#  An eCommerce api

An API for an ecommerce platform admin to manage product inventory

## Teck used
Tech Stack: Node.js & Mongo DB

## how to setup the project on local system

install packages: npm i

run program: nodemon index.js
By default it will be connected to port 8000

## Test  API’s using Postman:
signUp: POST=http://localhost:8000/user/signup
        {
    "name":"",
    "email":"",
    "password":""
}

signIn: POST=http://localhost:8000/user/signin
    {
    "email":"",
    "password":""
}

addProduct: POST=http://localhost:8000/products/create
    {
    "name":"iphone",
    "quantity":5
}

get all product: GET=http://localhost:8000/products

delete product: DELETE=http://localhost:8000/products/id 

update product quantity: PUT=http://localhost:8000/products/id
    {
    "quantity":10
}

## License

This project is **free to use** and does not contains any license.

## sreen shot
![Screenshot 2024-02-24 at 1 42 50 PM](https://github.com/Sukesh-Hegde/Ecommerce-API/assets/128299015/7bb51c69-6fda-49dd-a7c5-21704f719db6)


