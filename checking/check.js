



const userloginModel = require ("../model/userloginModel") ;

exports.createLogin = async (req , res) => {
    console.log("outside try....")
    try {
        console.log("inside  try....")

        const userData = new userModel (req.body);
        const {email} = userData;

        
        const userExist = await userModel.findOne ({email});
        if (userExist) {
            return res.status(400).json ({ message: "user already exists."});
        }

        const savedUser = await userData.save();
        return res.status(200).json(savedUser);
    } catch (error) { 
        return res.status(500).json({error : "INTERNAL SERVER ERROR"}) 

    }
}

exports.login = async (req,res) => {
    const { email, password ,name } = req.body;
    try{
        const user = await userModel.findOne({ email });
        if (!email) {
            return res.status(400).json({message : "INCORRECT PASSWORD OR EMAIL"})
        }

        const isPasswordisMatch = await user.compare(password);
        if (!isPasswordisMatch) {
            return res.status(400).json({message : "INCORRECT PASSWORD OR EMAIL"})
        }
        

        return res.status(400).json({message:"LOGIN WAS SUCCESSFUL"})
    }catch{
        res.status(400).json({error : "INTERNAL SERVER ERROR "})
    }
}

exports.loginFetch = async(req , res) => {
    try{

    }catch{
        res.status(400).json({error : "INTERNAL SERVER ERROR "})
    }
}