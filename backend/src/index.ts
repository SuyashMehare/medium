import { Hono } from 'hono'
import userGroup from './groups/user.group'

const app = new Hono()

app.route('/api/v1/user',userGroup)

app.get('/', (c) => {
  return c.html('Hello Hono!')
})

export default app
