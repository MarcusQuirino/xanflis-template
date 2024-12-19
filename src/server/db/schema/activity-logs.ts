import { relations } from 'drizzle-orm'
import { int, integer, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

import { createTable } from '../create-table'
import { organizations } from './organizations'
import users from './users'

export const activityLogs = createTable('activity_log', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  organizationId: int('organization_id')
    .notNull()
    .references(() => organizations.id),
  userId: int('user_id')
    .notNull()
    .references(() => users.id),
  action: text('action').notNull(),
  timestamp: integer('timestamp', { mode: 'timestamp' }).$defaultFn(
    () => new Date()
  ),
})

export const activityLogRelations = relations(activityLogs, ({ one }) => ({
  organization: one(organizations, {
    fields: [activityLogs.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}))

export default activityLogs

export const selectActivityLogSchema = createSelectSchema(activityLogs)
export const insertActivityLogSchema = createInsertSchema(activityLogs).pick({
  organizationId: true,
  userId: true,
  action: true,
})

export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_TEAM = 'CREATE_TEAM',
  REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER',
  INVITE_TEAM_MEMBER = 'INVITE_TEAM_MEMBER',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
}
