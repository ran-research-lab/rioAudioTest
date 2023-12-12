import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import { Audio } from 'expo-av';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundDuration, setSoundDuration] = useState(null);
  const [soundPosition, setSoundPosition] = useState(null);
  const soundObject = new Audio.Sound();

  useEffect(() => {
    const updateSoundPosition = async () => {
      try {
        const { positionMillis, durationMillis } = await soundObject.getStatusAsync();
        await setSoundPosition(positionMillis);
        setSoundDuration(durationMillis);
      } catch (error) {
        console.error('Failed to get sound position. Reason:', error);
      }
    };

    const interval = setInterval(updateSoundPosition, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handlePlay = async () => {
    try {
      if (!isPlaying) {
        await soundObject.loadAsync(require('./audiofile.mp3'));
        await soundObject.playAsync();
        setIsPlaying(true);
      } else {
        await soundObject.stopAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Failed to play audio. Reason:', error);
    }
  };

  const formatTime = (milliseconds) => {
    if (milliseconds === null || isNaN(milliseconds)) {
      return '--:--';
    }

    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
  };

  return (
    <View>
      <Button title={isPlaying ? 'Stop' : 'Play'} onPress={handlePlay} />
      <Text>{formatTime(soundPosition)} / {formatTime(soundDuration)}</Text>
    </View>
  );
};

export default AudioPlayer;
