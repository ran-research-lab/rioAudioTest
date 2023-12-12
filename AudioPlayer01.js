import React from 'react';
import { View, Button } from 'react-native';
import { Audio } from 'expo-av';

const AudioPlayer = () => {
  const soundObject = new Audio.Sound();

  const handlePlay = async () => {
    try {
      await soundObject.loadAsync(require('./audiofile.mp3'));
      await soundObject.playAsync();
    } catch (error) {
      console.error('Failed to play audio. Reason:', error);
    }
  };

  return (
    <View>
      <Button title="Play" onPress={handlePlay} />
    </View>
  );
};

export default AudioPlayer;
