import React, { useState, useEffect } from 'react';
import { Ghost, Skull, Siren } from 'lucide-react';

const horrorCharacters = [
  { icon: Ghost, sound: '/sounds/ghost-scream.mp3' },
  { icon: Skull, sound: '/sounds/skull-scream.mp3' },
  { icon: Siren, sound: '/sounds/siren-scream.mp3' },
];

const Jumpscare = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [character, setCharacter] = useState(horrorCharacters[0]);

  useEffect(() => {
    const showJumpscare = () => {
      const randomCharacter = horrorCharacters[Math.floor(Math.random() * horrorCharacters.length)];
      setCharacter(randomCharacter);
      setIsVisible(true);
      new Audio(randomCharacter.sound).play();
      setTimeout(() => setIsVisible(false), 1000);
    };

    const scheduleNextJumpscare = () => {
      const delay = Math.random() * (5 * 60 * 1000 - 30 * 1000) + 30 * 1000; // 0.5 to 5 minutes in milliseconds
      return setTimeout(showJumpscare, delay);
    };

    let timeoutId = scheduleNextJumpscare();

    return () => clearTimeout(timeoutId);
  }, []);

  if (!isVisible) return null;

  const Icon = character.icon;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
      <Icon className="text-horror-100 w-64 h-64 animate-pulse" />
    </div>
  );
};

export default Jumpscare;