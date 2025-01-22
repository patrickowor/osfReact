from flask import Flask, request, jsonify
from flask_cors import CORS
import hashlib
import jwt
import datetime

app = Flask(__name__)
CORS(app) 


token_secret = "my test token"

users = {
    "test@example.com": {
        "password": "password123",  # Plaintext for example purposes; use hashed passwords in production
        "id": 1,
        "name": "Test User"
    },
        "string@gmail.com": {
        "password": "string123",  # Plaintext for example purposes; use hashed passwords in production
        "id": 1,
        "name": "Test User"
    }
}

@app.post('/login')
@app.post('/login/')
def login():
    data = request.json
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"error": "Missing email or password"}), 400

    email = data['email']
    password = data['password']
    
    user = users.get(email)
    if user and user['password'] == password: 
        # Generate JWT token
        token = jwt.encode({
            "user_id": user['id'],
            "email": email,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expires in 1 hour
        }, token_secret, algorithm="HS256")

        return jsonify({"token": token})
    return jsonify({"error": "Invalid email or password"}), 401

@app.get('/user')
def get_user_info():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({"error": "Missing authorization header"}), 401
    
    try:
        token = auth_header.split(" ")[1]  # Extract token from "Bearer <token>"
        decoded_token = jwt.decode(token, token_secret, algorithms=["HS256"])
        user_id = decoded_token.get("user_id")
        email = decoded_token.get("email")

        # Fetch user information
        for user_email, user_data in users.items():
            if user_data['id'] == user_id and user_email == email:
                return jsonify({
                    "id": user_data['id'],
                    "name": user_data['name'],
                    "email": user_email
                })

        return jsonify({"error": "User not found"}), 404

    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401

if __name__ == "__main__":
    app.run(host='0.0.0.0', port= 5007, debug=True)