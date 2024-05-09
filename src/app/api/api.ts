export const apiUrl =
    process.env.CUSTOMIZE_CHAT_API_BASE_URL || 'http://localhost:8001'

export const API = {
    // ChatGPT通常回答
    NomalChatGptV1: `${apiUrl}/nomal/chat/v1`,
}