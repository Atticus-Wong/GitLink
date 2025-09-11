import { CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { config } from '../config'

export const data = new SlashCommandBuilder()
  .setName('commits')
  .setDescription('View all Commits')

export async function execute(interaction: CommandInteraction) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${config.GITHUB_USERNAME}/${config.GITHUB_REPO}/commits`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${config.GITHUB_ACCESS_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    )

    if (!response.ok) {
      await interaction.reply(
        `Failed to fetch commits, ${response.status} ${response.statusText}`
      )
      return
    }

    const commits = await response.json()
    if (!Array.isArray(commits) || commits.length === 0) {
      await interaction.reply('No commits found.')
      return
    }

    const commitMessages = commits
      .slice(0, 5) // Get the latest 5 commits
      .map(
        (commit: any) =>
          `- ${commit.commit.message} (by ${commit.commit.author.name})`
      )
      .join('\n')

    await interaction.reply(
      `**Recent Commits for Atticus-Wong/GitLink:**\n${commitMessages}`
    )
  } catch (error) {
    console.error(error)
    await interaction.reply('An error occurred while fetching commits.')
  }
}
