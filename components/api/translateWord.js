import axios from 'axios';
import { GOOGLE_TRANSLATE_API_KEY } from '@env';

export const translateWord = async (word, target = 'uk', source = 'en') => {
  if (!word || typeof word !== 'string') return '❌ Неверное слово';

  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
      {
        q: word,
        source: source,
        target: target,
        format: 'text',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const translatedText = response.data.data.translations[0].translatedText;
    return translatedText;
  } catch (error) {
    console.log('KEY:', GOOGLE_TRANSLATE_API_KEY);
    console.error('Google Translate API error:', error.response?.data || error.message);
    return '❌ Ошибка перевода';
  }
};
