import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Bindings, variables } from './utils/types'
import blogGroup from './groups/blog.group'
import userGroup from './groups/user.group'
import { authMiddleware } from './middlewares/auth.middleware'
import { corsOptions } from './middlewares/corsopt.middleware'


const app = new Hono<{
  Bindings:Bindings,
  Variables:variables
}>()


// adding variables
declare module 'hono'{
  interface ContextVariableMap{
    message : string
  }
}


app.use(cors(corsOptions))
app.use('/api/v1/blog/*', authMiddleware)
app.use('/api/v1/user/me', authMiddleware)


app.route('/api/v1/blog',blogGroup)
app.route('/api/v1/user',userGroup)

app.get('/', (c) => {

  console.log(c.var.message);
  
  return c.html('Hello Hono!')
})



export default app
