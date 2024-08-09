import { Hono } from "hono";
import { me, signin, signup } from "../controllers/user.controller";
import { createMiddleware } from "hono/factory";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const userGroup= new Hono()


userGroup.use(createMiddleware(async (c,next) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    c.set('prisma',prisma)

    await next()
}))

userGroup
    .get('/me',me)
    .post('/signup',signup)
    .post('/signin',signin)


export default userGroup