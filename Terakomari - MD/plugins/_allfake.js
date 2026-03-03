import fs from 'fs'
import moment from 'moment-timezone'
let handler = m => m

handler.all = async function (m) {
  global.wm = 'Haruka - MD'

  let thumb
  try {
    thumb = fs.readFileSync('./thumbnail.jpg')
  } catch (e) {
    thumb = await (await fetch("https://files.catbox.moe/hwnuo9.jpg")).buffer()
  }

  global.adReply = {
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterName: `「 Terakomari - AI 」`,
        newsletterJid: "120363405424415956@newsletter"
      },
      externalAdReply: {
        title: `𝘵𝘦𝘳𝘢𝘬𝘰𝘮𝘢𝘳𝘪 𝘨𝘢𝘯𝘥𝘦𝘴𝘣𝘭𝘰𝘰𝘥`,
        body: `${momentGreeting()}`,
        previewType: "PHOTO",
        thumbnail: thumb
        
      }
    }
  }
}

export default handler

function momentGreeting() {
  const hour = moment.tz('Asia/Jakarta').hour()
  if (hour >= 18) return 'Konbanwa🍃'
  if (hour >= 15) return 'Konnichiwa🌾'
  if (hour > 10) return 'Konnichiwa🍂'
  if (hour >= 4) return 'Ohayou Gozaimasu🌿'
  return 'Oyasuminasai🪷'
}