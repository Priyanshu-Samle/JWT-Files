import  jwt  from "jsonwebtoken";

export const jwt1 = (req,res,next)=>{

    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({error:"Unauthorized user"});
    }

    try {
          const decode = jwt.verify(token, process.env.JWT_SECRET);

          req.user = decode;
          next();
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const genrateTokens = (userData)=>{

    return jwt.sign(userData,process.env.JWT_SECRET);
}

