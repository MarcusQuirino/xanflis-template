import { relations } from 'drizzle-orm'
import { int, integer, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

import { createTable } from '../create-table'
import activityLogs from './activity-logs'
import organizationMembers from './organization-members'

export const organizations = createTable('organization', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  stripeCustomerId: text('stripe_customer_id').notNull().unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripeProductId: text('stripe_product_id'),
  stripePlanName: text('plan_name', { length: 50 }),
  stripeSubscriptionStatus: text('subscription_status'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }),
})

export const organizationRelations = relations(organizations, ({ many }) => ({
  members: many(organizationMembers),
  activityLogs: many(activityLogs),
}))

export default organizations

export const selectOrganizationSchema = createSelectSchema(organizations)
export const insertOrganizationSchema = createInsertSchema(organizations).pick({
  name: true,
  stripeCustomerId: true,
  stripeSubscriptionId: true,
  stripeProductId: true,
  stripePlanName: true,
  stripeSubscriptionStatus: true,
})
