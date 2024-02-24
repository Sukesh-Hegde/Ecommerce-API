import jwt from 'jsonwebtoken';
const jwtAuth = (req, res, next)=>{
    // 1. Read the token.
    const token = req.headers['authorization'];

    // 2. if no token, return the error.
    if(!token){
        return res.status(401).send('Unauthorized');
    }
    // 3. check if token is valid.
    try{
        const payload = jwt.verify(
            token,
            "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz"
        );
        req.userID = payload.userID;
        // console.log(payload);
    } catch(err){
        // 4. return error.
        console.log(err);
        return res.status(401).send('Unauthorized');
    }

    // 5. call next middleware.
    next();
};

export default jwtAuth;


// import jwt from "jsonwebtoken";

// export const verifyToken = async (req, res, next) => {
//   const token = req.headers["authorization"]; 
//   // const token = req.cookie;
//   // console.log(token);

//   if (!token) {
//     return res.status(401).send("Unauthorized");
//   }
//   try {
    
//     const payload = jwt.verify(token, "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz");
//     req.userID = payload.userID;
//     // console.log("not blacklisted");
//     // Continue processing if the token is not blacklisted
//     next();
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
