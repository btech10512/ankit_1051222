import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import crypto from "crypto";
const saltRounds = 10;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true,"Password is required"]
        },
    },{
        timestamps:true
    }
)
userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password,saltRounds)
    // next()
})
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {   // the below is called payload and after that we will provide secret and expiry 
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
}




export const User = mongoose.model("User",userSchema);
export {userSchema}