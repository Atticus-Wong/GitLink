import dotenv from 'dotenv'

dotenv.config()

const DISCORD_TOKEN = process.env.DISCORD_TOKEN
const DISCORD_CLIENT_ID = process.env.DICSORD_CLIENT_ID

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
  throw new Error(
    'Missing DISCORD_TOKEN or DISCORD_CLIENT_ID in environment variables'
  )
}

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
}
