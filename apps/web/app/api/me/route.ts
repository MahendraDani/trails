import {NextRequest, NextResponse} from "next/server";
import {withAuth} from "next-auth/middleware"
import {db} from "@repo/db";

export const GET = async (req : NextRequest)=>{
  const token = req.headers.get("Authorization")

  if(!token){
    return NextResponse.json({error : {message : "No token provided"}});
  }

  const user = await db.session.findFirst({
    where : {
      sessionToken : token,
    },
    include : {
      user : true
    }
  })

  if(!user){
    return NextResponse.json({error : {message : "Unauthorized"}});
  }
  return NextResponse.json({message : "Test one ok", token,user})
}

/*
* 1. Get token from headers["Authorization"] => 8b883c35-688b-4aed-8980-549a50ae3e30
* 2. Check if it exists in Session table in database and get the corresponding User details from userId field
* 3. If the details don't exist request else return Unauthorized
* */


