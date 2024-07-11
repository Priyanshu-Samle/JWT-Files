import User from "../Model/userModel.js"

import {jwt1,genrateTokens} from "./../jwt.js"
export const insert = async (req,res)=>{

   try {
        const {email} = req.body;
        const userExsist = await User.findOne({email});

        if(userExsist){
            return res.status(500).json({message:"user is already "});
        }

        
        const user = new User(req.body);

        const save1 = await user.save();

        const token =  genrateTokens(save1.email);
        console.log(token)
        return res.status(600).json(save1)
   } catch (error) {
     console.log("error1111")
     console.log(error)
        return res.status(500).json(error);
   }
}

export const read = async(req,res)=>{
       try {
          const data = await User.find();

          return res.status(200).json(data);
       } catch (error) {
          return res.status(500).json(error);
       }
}

export const update = async(req,res)=>{
     try {
           
          const id = req.params.id;

          const userExsist = await User.findOne({_id:id});

          if(!userExsist){
               return res.status(500).json("user is not found");
          }

          const update = await User.findByIdAndUpdate(id,req.body,{new:true});
          return res.status(200).json(update)

     } catch (error) {   
          return res.status(500).json(error);
     }
}

export const deleteUser = async(req,res)=>{

    try {
     const id = req.params.id;

     const userExist = await User.findById({_id:id});

     if(!userExist){
          return res.status(500).json("user is not find");
     }

     const userDelete = await User.findByIdAndDelete(id);
     return res.status(200).json(userDelete);
    } catch (error) {
     console.log("not done")
     return res.status(500).json(error);
    }
}

export const readOne = async(req,res)=>{
     try {
          const id = req.params.id;
          const getOne = await User.findById(id);

          if(!getOne){
               return res.status(500).json("user is not found");
          }

          const token = genrateTokens(getOne.email);

          console.log(token);
          return res.json(token);
     } catch (error) {
          console.log("readOne error");
          return res.status(500).json(error);
     }
}




