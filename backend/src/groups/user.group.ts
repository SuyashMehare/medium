import { Hono } from "hono";
import { me, signin, signup } from "../controllers/user.controller";

const userGroup= new Hono()

userGroup
    .get('/me',me)
    .post('/signup',signup)
    .post('/signin',signin)


export default userGroup