// Speech utility using the Web Speech API.
// Simplified: project uses only English voices, so priority lists and Spanish helpers were removed.

// Function to obtain a suitable (preferably female) voice for the requested language.
const getBestFemaleVoice = (lang) => {
  const voices = window.speechSynthesis.getVoices();
  const langCode = lang.split('-')[0];

  // Priority names for English voices (best to good)
  const priorityNames = {
    'en': ['Google US English', 'Microsoft Zira', 'Samantha', 'Karen', 'Victoria', 'Google UK English Female']
  };

  const priorities = priorityNames[langCode] || [];

  // Try priority names first
  for (const priority of priorities) {
    const voice = voices.find(v => v.lang.startsWith(langCode) && v.name.includes(priority));
    if (voice) return voice;
  }

  // Any Google voice for the language
  const googleVoice = voices.find(v => v.lang.startsWith(langCode) && v.name.toLowerCase().includes('google'));
  if (googleVoice) return googleVoice;

  // Generic female-ish voice names (English-focused)
  const femaleVoice = voices.find(v => {
    const n = v.name.toLowerCase();
    return v.lang.startsWith(langCode) && (n.includes('female') || n.includes('woman') || n.includes('samantha') || n.includes('karen') || n.includes('zira'));
  });
  if (femaleVoice) return femaleVoice;

  // Fallback: any voice of that language
  return voices.find(v => v.lang.startsWith(langCode));
};

export const speak = (text, lang = 'en-US') => {
  return new Promise((resolve) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const speakWithVoice = () => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        utterance.volume = 1;
        
        const bestVoice = getBestFemaleVoice(lang);
        if (bestVoice) {
          utterance.voice = bestVoice;
          console.log(`Usando voz: ${bestVoice.name}`);
        }

        utterance.onend = resolve;
        window.speechSynthesis.speak(utterance);
      };

      if (window.speechSynthesis.getVoices().length > 0) {
        speakWithVoice();
      } else {
        window.speechSynthesis.addEventListener('voiceschanged', speakWithVoice, { once: true });
      }
    } else {
      console.warn('Web Speech API no soportada en este navegador');
      resolve();
    }
  });
};

export const speakEnglish = (text) => speak(text, 'en-US');
