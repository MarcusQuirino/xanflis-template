import { handle } from 'hono/vercel'

import createApp from './internals/create-app'
import hello from './routers/hello/hello.index'

const app = createApp()

const appRouter = app.route('/hello', hello)

export const httpHandler = handle(app)

export default app

export type AppType = typeof appRouter
