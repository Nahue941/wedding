export const startLoopedAudio = (audioRef, setIsAudioPlaying, volume = 0.3) => {
  const audio = audioRef?.current;
  if (!audio) {
    return;
  }

  audio.loop = true;
  audio.volume = volume;
  const playPromise = audio.play();
  if (playPromise?.then) {
    playPromise.then(() => setIsAudioPlaying(true)).catch(() => {});
  } else {
    setIsAudioPlaying(true);
  }
};
