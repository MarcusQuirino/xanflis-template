import { relations } from 'drizzle-orm'
import { index, int, integer, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

import { createTable } from '@/server/db/create-table'

import organizationMembers from './organization-members'

const users = createTable(
  'user',
  {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    clerkId: text('clerk_id').notNull().unique(),
    role: text('role').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
      () => new Date()
    ),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
    deletedAt: integer('deleted_at', { mode: 'timestamp' }),
  },
  (table) => ({
    clerkIdIdx: index('clerk_id_idx').on(table.clerkId),
  })
)

export const userRelations = relations(users, ({ many }) => ({
  organizationMembers: many(organizationMembers),
}))

export default users

export const selectUserSchema = createSelectSchema(users)
export const insertUserSchema = createInsertSchema(users).pick({
  clerkId: true,
})

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
