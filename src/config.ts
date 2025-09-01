import dotenv from 'dotenv'

dotenv.config()

const DISCORD_TOKEN = process.env.DISCORD_TOKEN
const DISCORD_CLIENT_ID = process.env.DICSORD_CLIENT_ID
// Put your github personal access tokens here
const GH_AISLE_PAL = process.env.GITHUB_AISLE_PAL_PAT
const GITHUB_ACCESS_TOKEN = process.env.GITHUB_PERSONAL_ACCESS_TOKEN
const GITHUB_USERNAME = process.env.GITHUB_USERNAME
const GITHUB_REPO = process.env.GITHUB_REPO

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
  throw new Error(
    'Missing DISCORD_TOKEN or DISCORD_CLIENT_ID in environment variables'
  )
}

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  GH_AISLE_PAL,
  GITHUB_ACCESS_TOKEN,
  GITHUB_USERNAME,
  GITHUB_REPO,
}
