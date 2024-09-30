const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from Bearer scheme

    console.log('Token from request:', token); // Log the token

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the correct secret key
        req.user = decoded; // You can store user information in req.user
        next();
    } catch (error) {
        console.error('Token verification error:', error); // Log error
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authMiddleware