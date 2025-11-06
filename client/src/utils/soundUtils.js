import correctoUrl from '../assets/sounds/correcta.mp3?url';
import incorrectoUrl from '../assets/sounds/incorrecto.mp3?url';

export const playCorrectSound = () => {
  return new Promise((resolve) => {
    const audio = new Audio(correctoUrl);
    audio.volume = 0.5;
    audio.onended = resolve;
    audio.play().catch(error => {
      console.log('Error al reproducir sonido correcto:', error);
      resolve();
    });
  });
};

export const playIncorrectSound = () => {
  const audio = new Audio(incorrectoUrl);
  audio.volume = 0.5;
  audio.play().catch(error => console.log('Error al reproducir sonido incorrecto:', error));
};
