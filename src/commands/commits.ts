import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} from 'discord.js'
import { config } from '../config'

export const data = new SlashCommandBuilder()
  .setName('commits')
  .setDescription('View all Commits')
  .addIntegerOption((option) =>
    option
      .setName('count')
      .setDescription('Number of commits to retrieve (default is 5)')
      .setRequired(false)
      .setMinValue(1)
      .setMaxValue(20)
  )

export async function execute(interaction: ChatInputCommandInteraction) {
  const count = interaction.options.getInteger('count') || 5
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
      .slice(0, count) // Get the latest 5 commits
      .map(
        (commit: any, index: number) =>
          `${index + 1}. ${commit.commit.message} (by ${
            commit.commit.author.name
          })`
      )
      .join('\n')

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(
        `Recent Commits for ${config.GITHUB_USERNAME}/${config.GITHUB_REPO}`
      )
      .setDescription(commitMessages)
      .setURL(
        `https://github.com/${config.GITHUB_USERNAME}/${config.GITHUB_REPO}/commits`
      )
      .setTimestamp()
      .setFooter({ text: 'Powered by GitHub' })

    await interaction.reply({ embeds: [embed] })
  } catch (error) {
    console.error(error)
    await interaction.reply('An error occurred while fetching commits.')
  }
}
