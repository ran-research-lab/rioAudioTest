import React from 'react';
import { View } from 'react-native';
import AudioPlayer from './AudioPlayer';

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AudioPlayer />
    </View>
  );
};

export default App;
