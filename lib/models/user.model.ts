import mongoose from "mongoose";
import bcrypt from "bcrypt"

interface RegistrationData  {
    id ?: string | undefined,
    username : string,
    email : string,
    password : string,
    checkPassword ?: any
}

export const userSchema = new mongoose.Schema<RegistrationData>({
   username : {
    type : "String",
    require : true
   },
   email : {
    type : "String",
    require : true,
    unique :  true
   },
   password : {
    type :"string",
    require : true
   }
})

//Using the Mongoose middleware to encrupt the password before storing it in the DB
userSchema.pre("save", async function (next) {
   this.password = await bcrypt.hash(this.password, 10)
next()
})

//Using the middleware to compare the input password with encrypted password from DB
userSchema.methods.checkPassword = async function(givenPassword:string, dbPassword:string){
   const isSame = await bcrypt.compare(givenPassword, dbPassword)
   return isSame
}


const User = mongoose.model("User", userSchema)


export default User