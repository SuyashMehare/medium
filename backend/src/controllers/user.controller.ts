import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { Context, Hono } from "hono"
import { sign } from "hono/jwt"
import zod from "zod"

const user = new Hono<{

  Variables:{
    userId : string
  },
  Bindings:{
    DATABASE_URL:string
  }  
}>()

const signupInput = zod.object({
  email: zod.string().email(),
  name: zod.string(),
  password: zod.string()
})

const signinInput = zod.object({
  email: zod.string().email(),
  password: zod.string()
})


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
  
    const {success} = signupInput.safeParse(body)


    if (!success) {
      return c.json({message:"Invalid input"})
    }

    
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
  
  
  
    try {

      const user = await prisma.user.create({
        data:{
          email: body.email,
          name: body.name,
          password: body.password
        }
      })

    
      const token = await sign({userId:user.id},c.env.JWT_SECRET)
      

      return c.json({
        jwt:token
      })
    } catch (error) {
      console.log('err');
      
        return c.json({
          status:403,
          message:"Error while sign up user"
        })
    }
}

export const signin = async(c : Context) => {

  const body = await c.req.json();
  const {success} = signinInput.safeParse(body)

  if (!success) {
    return c.json({message:"Invalid inputs"})
  }  

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

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