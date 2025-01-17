import { sendToLog } from '../system/modlog'
import { updateOverview } from '../handlers/read'

module.exports = {
  name: 'guildBanAdd',
  type: 'guildBanAdd',
  toggleable: true,
  run: function (bot, raw) {
    updateOverview(raw.guild.id)
    let banned = raw.user
    let guild = raw.guild
    let obj = {
      guildID: guild.id,
      type: 'Member Banned',
      changed: `► Name: **${banned.username}#${banned.discriminator}**\n► ID: **${banned.id}**`,
      color: 8351671,
      against: banned
    }
    setTimeout(() => {
      guild.getAuditLogs(1, null, 22).then((entry) => {
        let user = entry.entries[0].user
        obj = {
          guildID: guild.id,
          type: 'Member Banned',
          changed: `► Name: \`${banned.username}#${banned.discriminator}\`\n► ID: **${banned.id}**${entry.entries[0].reason ? `\n► Reason: \`${entry.entries[0].reason}\`` : ''}`,
          color: 8351671,
          simple: `**${banned.username}#${banned.discriminator}** was banned by **${user.username}#${user.discriminator}**`,
          against: banned,
          from: user,
          image: {
            url: 'https://imgur.com/wwx46q6'
          }
        }
        sendToLog(this.name, bot, obj)
      }).catch(() => {
        obj.simple = `**${banned.username}#${banned.discriminator}** was banned.`
        obj.footer = {
          text: 'I cannot view audit logs!',
          icon_url: 'http://www.clker.com/cliparts/C/8/4/G/W/o/transparent-red-circle-hi.png'
        }
        sendToLog(this.name, bot, obj)
      })
    }, 1500)
  }
}
