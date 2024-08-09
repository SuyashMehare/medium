import { Hono } from "hono";
import { getAllBlogs, getBlogById, updateBlog, uploadBlog } from "../controllers/blog.controller";
import { createMiddleware } from "hono/factory";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Bindings } from "../utils/types";
const blogGroup = new Hono<{Bindings:Bindings}>();

blogGroup.use(createMiddleware(async (c,next) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    c.set('prisma',prisma)

    await next()
}))

blogGroup
    .post('/',uploadBlog)
    .patch('/:blogId',updateBlog)
    .get('/bulk',getAllBlogs)
    .get('/:blogId',getBlogById)



export default blogGroup