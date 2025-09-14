import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js'
import { config } from '../config'
import { tryCatch } from '../utils/trycatch'

export const data = new SlashCommandBuilder()
  .setName('pr')
  .setDescription('View all Pull Requests')
  .addStringOption((option) =>
    option
      .setName('repository')
      .setDescription(
        'Repository to fetch pull requests from. (AislePal/Architecture)'
      )
      .setRequired(true)
  )

async function fetchPullRequests(repository: string) {
  const response = await fetch(
    `https://api.github.com/repos/${config.GITHUB_USERNAME}/${repository}/pulls`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${config.GITHUB_ACCESS_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  )

  if (!response.ok) {
    throw new Error(
      `Failed to fetch pull requests, ${response.status} ${response.statusText}`
    )
  }

  const pulls = await response.json()
  return pulls
}

export async function execute(interaction: ChatInputCommandInteraction) {
  const repository = interaction.options.getString('repository', true)
  try {
    const response = await tryCatch(fetchPullRequests(repository))
    const pulls = response.data
    if (!Array.isArray(pulls) || pulls.length === 0) {
      await interaction.reply('No pull requests found.')
      return
    }

    const pullRequests = pulls
      .slice(0, 5) // Get the latest 5 pull requests
      .map((pr: any) => `- ${pr.title} (by ${pr.user.login}) - ${pr.html_url}`)
      .join('\n')

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(
        `Recent Pull Requests for ${config.GITHUB_USERNAME}/${config.GITHUB_REPO}`
      )
      .setDescription(pullRequests)
      .setURL(
        `https://github.com/${config.GITHUB_USERNAME}/${config.GITHUB_REPO}/pulls`
      )
      .setTimestamp()
      .setFooter({ text: 'Powered by GitHub' })

    await interaction.reply({ embeds: [embed] })
  } catch (error) {
    console.error(error)
    await interaction.reply('An error occurred while fetching pull requests.')
  }
}
