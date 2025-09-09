
export const signUp = async (req, res, next)=>{
    const session  = await mongoose.startSession()
    session.startTransaction()
    try{
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email})
        if(existingUser){
            const error = new Error("User already exists")
            error.statusCode = 490;
            throw error
        }
        const salt =  await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUsers = await User.create([{name,email,password:hashedPassword}],{session})
        const token = jwt.sign({userId:newUsers[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success:true,
            data:{
                token,
                newUsers
            }
        })

    }catch(err){
        await session.abortTransaction();
        session.endSession();
        next(err);
    }
}

