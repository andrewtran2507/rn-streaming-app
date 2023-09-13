import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import TrackPlayer, { usePlaybackState, RepeatMode } from 'react-native-track-player';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { PlaybackError } from './PlaybackError';
import { PlayPauseButton } from './PlayPauseButton';

const performSkipToNext = () => TrackPlayer.skipToNext();
const performSkipToPrevious = () => TrackPlayer.skipToPrevious();
async function handleShuffle() {
  let queue = await TrackPlayer.getQueue();
  await TrackPlayer.reset();
  queue.sort(() => Math.random() - 0.5);
  await TrackPlayer.add(queue);
}
async function handleRepeat() {
  await TrackPlayer.setRepeatMode(RepeatMode.Track);
}

export const PlayerControls: React.FC = () => {
  const playback = usePlaybackState();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.repeatBtn}>
          <TouchableWithoutFeedback onPress={handleRepeat}>
            <Feather name={'repeat'} size={30} color={'white'} />
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback onPress={performSkipToPrevious}>
          <AntDesign name={'stepbackward'} size={30} color={'white'} />
        </TouchableWithoutFeedback>
        <PlayPauseButton />
        <TouchableWithoutFeedback onPress={performSkipToNext}>
          <AntDesign name={'stepforward'} size={30} color={'white'} />
        </TouchableWithoutFeedback>

        <View style={styles.shuffleBtn}>
          <TouchableWithoutFeedback onPress={handleShuffle}>
            <FontAwesome name={'random'} size={30} color={'white'} />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <PlaybackError
        error={playback?.error ? playback?.error?.message : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  repeatBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 50
  },
  shuffleBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 50
  }
});
