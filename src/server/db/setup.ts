import { exec } from 'child_process'
import { eq } from 'drizzle-orm'
import { existsSync, writeFileSync } from 'fs'
import path from 'path'
import { promisify } from 'util'

import { db } from './index'
import { users } from './schema'

const execAsync = promisify(exec)

async function isProcessRunning(processName: string): Promise<boolean> {
  try {
    const { stdout } = await execAsync(`ps aux | grep "${processName}"`)
    return stdout.includes(processName) && !stdout.includes('grep')
  } catch {
    return false
  }
}

async function startDevServer() {
  const isRunning = await isProcessRunning(
    `turso dev --db-file ${path.join(process.cwd(), 'dev.db')}`
  )
  if (!isRunning) {
    console.log('Starting development database server...')
    exec(
      `turso dev --db-file ${path.join(process.cwd(), 'dev.db')}`,
      (error) => {
        if (error) {
          console.error('Failed to start database server:', error)
          process.exit(1)
        }
      }
    )
    // Wait for server to start
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }
}

async function pushSchema() {
  console.log('Pushing database schema...')
  try {
    await execAsync('drizzle-kit push')
    console.log('Schema pushed successfully')
  } catch (error) {
    console.error('Failed to push schema:', error)
    process.exit(1)
  }
}

async function seedData() {
  console.log('Checking if seeding is needed...')

  // Check if we have any users as a proxy for seeded data
  const existingUsers = await db
    .select()
    .from(users)
    .where(eq(users.id, 1))
    .all()

  if (existingUsers.length === 0) {
    console.log('Seeding initial data...')

    // Add your seeding logic here
    await db.insert(users).values([
      {
        clerkId: 'user_2qFpr8nLn5yf7VUnzt0DMcUhC1s',
        role: 'admin',
      },
      // Add more seed data as needed
    ])

    console.log('Data seeded successfully')
  } else {
    console.log('Database already contains data, skipping seed')
  }
}

async function setup() {
  const dbPath = path.join(process.cwd(), 'dev.db')

  if (!existsSync(dbPath)) {
    console.log('Database file not found, initializing...')
    writeFileSync(dbPath, '')
    console.log('Created empty database file at:', dbPath)
  }

  try {
    await startDevServer()
    await pushSchema()
    await seedData()
    console.log('Database setup completed successfully')
  } catch (error) {
    console.error('Database setup failed:', error)
    process.exit(1)
  }
}

// Only run setup if this file is being executed directly
if (require.main === module) {
  setup()
}

export { setup }
