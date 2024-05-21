## Frontend

this app uses `Vite` to with `ReactJS` for the the client side.


curl --location 'http://localhost:3000/api/v1/auth/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTcxNjMxNDczOSwiZXhwIjoxNzE2NDAxMTM5fQ.zS7NHL9GbtobsB0GAMsk2RyEuz1qACKPYGKn0J6tWHM' \
--data-raw '{
    "email": "repshika@gmail.com",
    "password": "test@123"
}'


{
    "message": "Logged in successfully",
    "user": {
        "id": 6,
        "name": "Repshika Pradhan",
        "email": "repshika@gmail.com",
        "phone": "9123456789",
        "role": "TEACHER",
        "status": "active",
        "email_verified": false
    }
}