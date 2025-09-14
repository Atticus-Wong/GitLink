import dotenv from 'dotenv'

dotenv.config()

const DISCORD_TOKEN = process.env.DISCORD_TOKEN
const DISCORD_CLIENT_ID = process.env.DICSORD_CLIENT_ID
// Put your github personal access tokens here
const GITHUB_ACCESS_TOKEN = process.env.GITHUB_PERSONAL_ACCESS_TOKEN
const GITHUB_USERNAME = process.env.GITHUB_USERNAME
const GITHUB_REPO = process.env.GITHUB_REPO
const NOTIFICATION_CHANNEL_ID = process.env.NOTIFICATION_CHANNEL_ID

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
  throw new Error(
    'Missing DISCORD_TOKEN or DISCORD_CLIENT_ID in environment variables'
  )
}

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  GITHUB_ACCESS_TOKEN,
  GITHUB_USERNAME,
  GITHUB_REPO,
  NOTIFICATION_CHANNEL_ID,
}
