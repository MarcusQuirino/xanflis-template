import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'

import { AppBindings } from '../../types'

const app = new Hono<AppBindings>()

const route = app
  .post(
    '/',
    zValidator(
      'json',
      z.object({
        title: z.string(),
        body: z.string(),
      })
    ),
    (c) => {
      const { title, body } = c.req.valid('json')

      c.var.logger.info('Hello', { title, body })
      return c.json(
        {
          ok: true,
          message: 'Created!',
        },
        201
      )
    }
  )
  .get('/', (c) => {
    return c.json({ ok: true, message: 'Hello' })
  })

export default route
