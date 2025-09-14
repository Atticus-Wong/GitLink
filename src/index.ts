import {
  Client,
  VoiceState,
  TextChannel,
  ChannelType,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  EmbedBuilder,
} from 'discord.js'
import { commands } from './commands'
import { config } from './config'
import { VOICE_CHANNEL_ID } from './utils/const'

import { deployCommands } from './deploy-commands'
const client = new Client({
  intents: [
    'Guilds',
    'GuildMessages',
    'DirectMessages',
    'MessageContent',
    'GuildVoiceStates',
    'GuildMembers',
  ],
})

client.once('clientReady', () => {
  console.log('Discord bot is ready! 🤖')
})

client.on('guildCreate', async (guild) => {
  await deployCommands({ guildId: guild.id })
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return
  }
  const { commandName } = interaction
  if (commands[commandName as keyof typeof commands]) {
    if (interaction.isChatInputCommand()) {
      commands[commandName as keyof typeof commands].execute(interaction)
    }
  }
})

client.on('voiceStateUpdate', (oldState: VoiceState, newState: VoiceState) => {
  if (!oldState.channelId && newState.channelId) {
    const newChannel = newState.channel

    if (
      newChannel &&
      newChannel.type === ChannelType.GuildVoice &&
      newChannel.members.size === 1
    ) {
      console.log(
        `Detected first person in ${newChannel.name}: ${newState.member?.user.tag}`
      )

      // Get the channel where we want to send the notification.
      const notificationChannel = client.channels.cache.get(
        config.NOTIFICATION_CHANNEL_ID || ''
      )

      // Check if the channel was found and is a text channel before sending the message.
      if (notificationChannel instanceof TextChannel) {
        const member = newState.member
        if (member) {
          const messageEmbed = new EmbedBuilder()
            .setColor(0x0099ff) // A nice blue color for the embed. You can change this.
            .setTitle(`🔔 A Meeting is taking place!`)
            .setDescription(
              `<@${member.id}> has just joined the voice channel \`${newChannel.name}\`. They are the first one in there!`
            )
            .setTimestamp()
            .setFooter({ text: 'Voice Channel Notifier' })

          // Create the "Join Channel" button component
          const joinButton = new ButtonBuilder()
            .setLabel('Join Voice Channel ')
            .setStyle(ButtonStyle.Link)
            .setURL(
              `https://discord.com/channels/${newChannel.guildId}/${newChannel.id}`
            )

          const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            joinButton
          )

          // Send the message with the embed and button component
          notificationChannel
            .send({
              embeds: [messageEmbed],
              components: [row],
            })
            .catch((err) =>
              console.error('Failed to send message with component:', err)
            )
        }
      } else {
        console.error(
          `Failed to send notification. Channel with ID ${config.NOTIFICATION_CHANNEL_ID} not found or is not a text channel.`
        )
      }
    }
  }
})

client.login(config.DISCORD_TOKEN)
