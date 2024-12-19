import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyD_AA9nA23WVsusaPzT1KAKd4Mb_EyxOfE';
const genAI = new GoogleGenerativeAI(API_KEY);

export async function getGeminiResponse(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    throw error;
  }
}