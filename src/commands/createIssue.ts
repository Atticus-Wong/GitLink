import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js'
import { config } from '../config'

export const data = new SlashCommandBuilder()
  .setName('createissue')
  .setDescription('Creates a new issue on GitHub')
  .addStringOption((option) =>
    option
      .setName('repository')
      .setDescription(
        'Repository to create the issue in. (AislePal/Architecture)'
      )
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName('title')
      .setDescription('Title of the issue')
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName('description')
      .setDescription('Body/description of the issue')
      .setRequired(false)
  )

export async function execute(interaction: ChatInputCommandInteraction) {
  try {
    const repository = interaction.options.getString('repository', true)
    const title = interaction.options.getString('title', true)
    const description = interaction.options.getString('description', false)

    if (!config.GITHUB_ACCESS_TOKEN) {
      throw new Error('GitHub access token is not configured.')
    }

    const response = await fetch(
      `https://api.github.com/repos/${config.GITHUB_USERNAME}/${repository}/issues`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${config.GITHUB_ACCESS_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({
          title: title,
          body: description,
        }),
      }
    )
    if (!response.ok) {
      const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('Error Creating Issue')
        .setDescription('An error occurred while creating the issue.')
      await interaction.reply({ embeds: [embed] })

      throw new Error(`GitHub API error: ${response.statusText}`)
    }
    const issueData = await response.json()
    const embed = new EmbedBuilder()
      .setColor('#4BB543')
      .setTitle(`✅ Issue Created: #${issueData.number}`)
      .setURL(issueData.html_url)
      .setDescription(`Title: ${title}\nDescription: ${description || ''}`)
    await interaction.reply({ embeds: [embed] })
  } catch (error) {
    console.error(error)
    const embed = new EmbedBuilder()
      .setColor('#ff0000')
      .setTitle('Error Creating Issue')
      .setDescription('An error occurred while creating the issue.')
    await interaction.reply({ embeds: [embed] })
  }
}
