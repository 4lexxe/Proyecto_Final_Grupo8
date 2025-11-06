// Utilidad para síntesis de voz usando Web Speech API (gratuita, nativa del navegador)

// Función para obtener la mejor voz femenina disponible
const getBestFemaleVoice = (lang) => {
  const voices = window.speechSynthesis.getVoices();
  const langCode = lang.split('-')[0];
  
  // Prioridad de voces (de mejor a menor calidad)
  const priorityNames = {
    'en': ['Google US English', 'Microsoft Zira', 'Samantha', 'Karen', 'Victoria', 'Google UK English Female'],
    'es': ['Google español', 'Microsoft Helena', 'Monica', 'Paulina', 'Google español de Estados Unidos', 'Mónica']
  };
  
  const priorities = priorityNames[langCode] || [];
  
  // Buscar voz por prioridad
  for (const priority of priorities) {
    const voice = voices.find(v => 
      v.lang.startsWith(langCode) && 
      v.name.includes(priority)
    );
    if (voice) return voice;
  }
  
  // Buscar cualquier voz de Google (mejor calidad)
  const googleVoice = voices.find(v => 
    v.lang.startsWith(langCode) && 
    v.name.toLowerCase().includes('google')
  );
  if (googleVoice) return googleVoice;
  
  // Buscar voz femenina genérica
  const femaleVoice = voices.find(v => 
    v.lang.startsWith(langCode) && 
    (v.name.toLowerCase().includes('female') || 
     v.name.toLowerCase().includes('woman') ||
     v.name.toLowerCase().includes('maria') ||
     v.name.toLowerCase().includes('samantha') ||
     v.name.toLowerCase().includes('karen') ||
     v.name.toLowerCase().includes('monica') ||
     v.name.toLowerCase().includes('zira') ||
     v.name.toLowerCase().includes('paulina'))
  );
  if (femaleVoice) return femaleVoice;
  
  // Última opción: cualquier voz del idioma
  return voices.find(v => v.lang.startsWith(langCode));
};

export const speak = (text, lang = 'en-US') => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();

    const speakWithVoice = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9; // Velocidad natural
      utterance.pitch = 1.1; // Tono ligeramente elevado pero natural
      utterance.volume = 1;
      
      const bestVoice = getBestFemaleVoice(lang);
      if (bestVoice) {
        utterance.voice = bestVoice;
        console.log(`Usando voz: ${bestVoice.name}`);
      }

      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      speakWithVoice();
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', speakWithVoice, { once: true });
    }
  } else {
    console.warn('Web Speech API no soportada en este navegador');
  }
};

export const speakEnglish = (text) => speak(text, 'en-US');
export const speakSpanish = (text) => speak(text, 'es-ES');
