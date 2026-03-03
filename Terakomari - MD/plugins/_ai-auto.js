import { GoogleGenerativeAI } from '@google/generative-ai'

export async function before(m, { conn }) {
    // Jangan balas jika: bukan pesan teks, pesan dari bot sendiri, atau pesan perintah (diawali prefix)
    if (!m.text || m.isBaileys || m.text.startsWith('.') || m.text.startsWith('#')) return 

    // Cek database apakah AI ON di chat ini
    let chat = global.db.data.chats[m.chat]
    if (!chat?.gemini) return 

    try {
        const genAI = new GoogleGenerativeAI(global.geminiCode)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
        
        const result = await model.generateContent(m.text)
        const response = await result.response
        await m.reply(response.text())
    } catch (e) {
        console.error(e)
    }
}
