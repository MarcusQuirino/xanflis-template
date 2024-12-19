import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { z } from 'zod'

import { createSession } from '../lib/auth/session'
import { db } from '../lib/db/drizzle'
import { teamMembers, teams, users } from '../lib/db/schema'
import { stripe } from '../lib/payments/stripe'

const app = new Hono()

const checkoutQuerySchema = z.object({
  session_id: z.string().min(1),
})

app.get('/', async (c) => {
  const query = c.req.query()
  const result = checkoutQuerySchema.safeParse({ session_id: query.session_id })

  if (!result.success) {
    return c.redirect('/pricing')
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(
      result.data.session_id,
      {
        expand: ['customer', 'subscription'],
      }
    )

    if (!session.customer || typeof session.customer === 'string') {
      throw new HTTPException(400, {
        message: 'Invalid customer data from Stripe.',
      })
    }

    const customerId = session.customer.id
    const subscriptionId =
      typeof session.subscription === 'string'
        ? session.subscription
        : session.subscription?.id

    if (!subscriptionId) {
      throw new HTTPException(400, {
        message: 'No subscription found for this session.',
      })
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['items.data.price.product'],
    })

    const plan = subscription.items.data[0]?.price
    if (!plan?.product || typeof plan.product === 'string') {
      throw new HTTPException(400, { message: 'Invalid plan data.' })
    }

    const userId = session.client_reference_id
    if (!userId) {
      throw new HTTPException(400, { message: 'No user ID found in session.' })
    }

    // Database operations
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(userId)))
      .limit(1)

    if (!user[0]) {
      throw new HTTPException(404, { message: 'User not found.' })
    }

    const userTeam = await db
      .select({ teamId: teamMembers.teamId })
      .from(teamMembers)
      .where(eq(teamMembers.userId, user[0].id))
      .limit(1)

    if (!userTeam[0]) {
      throw new HTTPException(404, { message: 'Team not found.' })
    }

    // Update team subscription details
    await db
      .update(teams)
      .set({
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        stripeProductId: plan.product.id,
        planName: plan.product.name,
        subscriptionStatus: subscription.status,
        updatedAt: new Date(),
      })
      .where(eq(teams.id, userTeam[0].teamId))

    await createSession(c, user[0])
    return c.redirect('/dashboard')
  } catch (error) {
    console.error('Checkout error:', error)
    return c.redirect('/error')
  }
})

export default app
