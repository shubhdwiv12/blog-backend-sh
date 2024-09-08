const jwt = require('jsonwebtoken');
const axios = require('axios');

// Protect routes (middleware)
const protect = async (req, res, next) => {
    let token;

    // Check if the authorization header is present and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        // Verify the token
        console.log("jjjj", process.env.JWT_SECRET, token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Optionally, you can fetch user details from the User Service if necessary
        const response = await axios.get(`${process.env.USER_SERVICE_URL}/api/v1/users/getUserData`, {
            headers:{
                authorization:`Bearer ${token}`
            }
        });

        if (response.data) {
            // Attach user details to the request object
            req.user = response.data;
            next();
        } else {
            return res.status(401).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log("error", error)
        return res.status(401).json({ message: 'Not authorized, token failed' , error:error.message});
    }
};

module.exports = { protect };
