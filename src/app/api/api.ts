export const apiUrl =
    process.env.CUSTOMIZE_CHAT_API_BASE_URL || 'http://localhost:8001'

export const API = {
    // ChatGPT通常回答
    NomalChatGptV1: `ws://${apiUrl.replace('http://', '')}/ws/nomal/chat/gpt/v1`,

    // Gemini通常回答
    NomalChatGeminiV1: `ws://${apiUrl.replace('http://', '')}/ws/nomal/chat/gemini/v1`,
}