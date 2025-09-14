import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('create-issue')
  .setDescription('Creates a new issue on GitHub')

export async function execute(interaction: CommandInteraction) {
  await interaction.reply('Creating a new issue...')
}
