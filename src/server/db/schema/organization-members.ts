import { relations } from 'drizzle-orm'
import { int, integer, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

import { createTable } from '../create-table'
import { organizations } from './organizations'
import users from './users'

export const organizationMembers = createTable('organization_member', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  organizationId: int('organization_id')
    .notNull()
    .references(() => organizations.id),
  userId: int('user_id')
    .notNull()
    .references(() => users.id),
  role: text('role').notNull(),
  joinedAt: integer('joined_at', { mode: 'timestamp' }).$defaultFn(
    () => new Date()
  ),
})

export const organizationMemberRelations = relations(
  organizationMembers,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [organizationMembers.organizationId],
      references: [organizations.id],
    }),
    user: one(users, {
      fields: [organizationMembers.userId],
      references: [users.id],
    }),
  })
)

export default organizationMembers

export const selectOrganizationMemberSchema =
  createSelectSchema(organizationMembers)
export const insertOrganizationMemberSchema = createInsertSchema(
  organizationMembers
).pick({
  organizationId: true,
  userId: true,
  role: true,
})
