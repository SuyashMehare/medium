import { PrismaClient } from "@prisma/client/edge"
import { SignInInputZodShema, SignUpInputZodShema } from "medium-request-validator";
import { Context, Hono } from "hono"
import { sign } from "hono/jwt"


export const me = async(c : Context) => {

  const prisma : PrismaClient= c.get('prisma')
  const userId : string = c.get("userId")

  // console.log("userid",userId);

  try {

    const user = await prisma.user.findFirst({
      where :{
         id: userId

      },
      select:{
        email:true,
        name:true
      }
    })


    return c.json({data:user},200)
    
  } catch (error) {
    
    console.log(error);
    
    return c.json({success:false,message:"Error while fetching user profile"},500) 
  }


}


export const signup = async(c : Context) => {
    
    const body = await c.req.json()

    const { success } = SignUpInputZodShema.safeParse(body)

    if (!success) {
      return c.json({message:"Invalid input"})
    }

    
    const prisma : PrismaClient = c.get("prisma")
  
  
    try {

      const user = await prisma.user.create({
        data:{
          email: body.email,
          name: body.name,
          password: body.password
        }
      })

    
      if(user.id){
        return c.json({
          success: false,
          status:409,
          message:"User already exist"
        })
      }

      const token = await sign({userId:user.id},c.env.JWT_SECRET)
      

      return c.json({
        success:true,
        jwt:token
      })
    } catch (error) {
      console.log(error);
      
        return c.json({
          success: false,
          status:403,
          message:"Error while sign up user"
        })
    }
}

export const signin = async(c : Context) => {

  const body = await c.req.json();
  const { success } = SignInInputZodShema.safeParse(body)

  if (!success) {
    return c.json({message:"Invalid inputs"})
  }  

  const prisma : PrismaClient = c.get("prisma")

    try {
    const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        });
    
        if (!user) {
            c.status(403);
            return c.json({ error: "user not found" });
        }
    
        const jwt = await sign({ userId: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt }); 
  } catch (error) {
    console.log(error);

    c.status(500)

    return c.json({
      success:false,
      message:"Fail to sign up the user"
    })
  }
}