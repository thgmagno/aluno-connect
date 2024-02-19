import translate from 'translate'

const EnglishToPortuguese = async (text: string) => {
  try {
    const translatedText = await translate(text, {
      engine: 'google',
      from: 'en',
      to: 'pt',
    })
    return translatedText
  } catch (error) {
    console.error('Error translating text:', error)
    return text
  }
}

export default EnglishToPortuguese
