import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

type CustomJwtPayload = {
    exp: number;
    nbf: number;
    iat: number;
    userId: string;
}


export const authMiddleware = createMiddleware(async (c,next) => {
  
    const bearerToken = c.req.header('Authorization')
  
    if (!bearerToken) {  
      return c.json({message : "Unauthorised"},401)
    }
  
    const jwtToken = bearerToken.split(' ')[1];
  
    const payload: CustomJwtPayload = await verify(jwtToken,c.env?.JWT_SECRET) as CustomJwtPayload
  
    if(!payload){
      return c.json({message: "Token expired, Unauthorised action"},401)
    }
  
    c.set('userId',payload.userId)
    
    await next();
  })