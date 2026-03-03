/* 
fitur : brat bret brot support emoji iphone 
api : https://api.nekorinn.my.id
type : plugins esm 
sumber : https://whatsapp.com/channel/0029VbAYjQgKrWQulDTYcg2K
*/

import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'

let handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text) return m.reply(`Kirim perintah *${usedPrefix + command} teks*\n\nContoh: *${usedPrefix + command} halo hilman*`)

  
  await conn.sendMessage(m.chat, {
    react: {
      text: '🕐',
      key: m.key
    }
  })

  try {
    const api = `https://api.nekorinn.my.id/maker/brat-v2?text=${encodeURIComponent(text)}`
    const res = await fetch(api)
    if (!res.ok) throw await res.text()

    const buffer = await res.buffer()

    const stiker = await sticker(buffer, false, 'Terakomari - MD', 'ʙy ᴀʟʟᴇɴ')
    await conn.sendMessage(m.chat, { sticker: stiker }, { quoted: m })

    
    await conn.sendMessage(m.chat, {
      react: {
        text: '✅',
        key: m.key
      }
    })
  } catch (e) {
    console.error(e)
    m.reply('Gagal membuat stiker!')

    
    await conn.sendMessage(m.chat, {
      react: {
        text: '❌',
        key: m.key
      }
    })
  }
}

handler.help = ['brat']
handler.tags = ['sticker']
handler.command = /^(brat)$/i
handler.limit = true
handler.premium = false
handler.group = false

export default handler