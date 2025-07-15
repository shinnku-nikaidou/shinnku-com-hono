import { Hono } from 'hono'
import { proxy } from 'hono/proxy'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<h1>Hello!</h1>)
})

app.get('/file/shinnku/*', (c) => {
  const slug = c.req.path.replace(/^\/file\/shinnku\//, '')
  const target = `https://shinnku.s3.us-west-004.backblazeb2.com/${slug}`
  return proxy(target)
})

export default app
