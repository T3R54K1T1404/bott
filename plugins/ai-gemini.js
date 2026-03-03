import { GoogleGenerativeAI } from '@google/generative-ai'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Fitur ON/OFF Manual per Chat
    if (command === 'aion') {
        global.db.data.chats[m.chat].gemini = true
        return m.reply('✅ AI Gemini berhasil diaktifkan di chat ini.')
    }
    if (command === 'aioff') {
        global.db.data.chats[m.chat].gemini = false
        return m.reply('❌ AI Gemini berhasil dimatikan di chat ini.')
    }

    // Logika menjawab pertanyaan
    if (!text) return m.reply(`Masukkan pertanyaan!\nContoh: ${usedPrefix + command} Apa itu coding?`)
    
    // Cek apakah fitur aktif di chat ini
    if (!global.db.data.chats[m.chat].gemini && command === 'ai') {
        return m.reply(`Fitur AI sedang mati di chat ini. Ketik *${usedPrefix}aion* untuk mengaktifkan.`)
    }

    await conn.sendMessage(m.chat, { react: { text: "💡", key: m.key } })

    try {
        const genAI = new GoogleGenerativeAI(global.geminiCode)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
        
        const result = await model.generateContent(text)
        const response = await result.response
        m.reply(response.text())
    } catch (e) {
        console.error(e)
        m.reply('Gagal mendapatkan respon dari AI. Pastikan API Key benar.')
    }
}

handler.help = ['ai', 'aion', 'aioff']
handler.tags = ['ai']
handler.command = /^(ai|aion|aioff)$/i
handler.limit = true // Biar hemat limit

export default handler
