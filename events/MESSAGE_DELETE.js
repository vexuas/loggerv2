import { badMessageCheck } from '../system/utils'
import { sendToLog } from '../system/modlog'

module.exports = {
  name: 'message_delete',
  type: 'MESSAGE_DELETE',
  toggleable: true,
  run: function (bot, raw) {
    const msg = raw.message
    let obj = {
      guildID: msg.guild.id,
      channelID: msg.channel.id,
      type: 'Message Deleted',
        changed: `► Content: \`${msg.content ? msg.content.replace(/\"/g, '"').replace(/`/g, '') : 'None.'}\`\n► Channel: **${msg.channel.name}**\n► Message ID: ${msg.id}`, // eslint-disable-line
      color: 8351671,
      against: {
        id: `${msg.author.id}`,
        username: `${msg.author.username}`,
        discriminator: `${msg.author.discriminator}`,
        avatar: `${msg.author.avatar}`
      }
    }
    if (msg.author.id !== bot.User.id && !badMessageCheck(msg.content)) {
      if (msg.attachments.length !== 0) {
        obj.changed += `\n► Attachment: [${msg.attachments[0].filename}](${msg.attachments[0].url})`
      }
      if (msg.embeds.length !== 0) {
        obj.changed += `\n► Embed: ⇓`
        sendToLog(bot, obj)
        sendToLog(bot, msg.embeds[0], msg.guild.id, msg.channel.id)
      } else {
        sendToLog(bot, obj)
      }
    }
  }
}