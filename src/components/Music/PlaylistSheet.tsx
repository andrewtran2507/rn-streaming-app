import React, { useEffect, useState } from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Spacer } from './Spacer';

import
TrackPlayer, 
{ 
  useTrackPlayerEvents,
  Event,
  State
} from 'react-native-track-player';

export const PlaylistSheet: React.FC = ({queue}) => {
  const [currentTrack, setCurrentTrack] = useState(0);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], (event: any) => {
    if(event?.state == State?.nextTrack) {
      TrackPlayer.getCurrentTrack().then((index: any) => setCurrentTrack(index));
    }
  });

  function PlaylistItem({index, title, isCurrent}: any) {

    function handleItemPress() {
      TrackPlayer.skip(index);
    }

    return (
      <TouchableOpacity onPress={handleItemPress}>
        <Text
          style={{...styles.playlistItem,
            ...{backgroundColor: isCurrent ? '#ddd' : 'transparent'}}}>
        {title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
      <Spacer />
      <View style={styles.playlist}>
        <FlatList
          data={queue}
          renderItem={({item, index}) => 
            <PlaylistItem
              index={index}
              title={item?.title || ''}
              isCurrent={currentTrack == index}
            />
          }
        />
      </View>
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: '4%',
    marginHorizontal: 16,
  },
  optionRowLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  playlist: {
    marginTop: 40,
    marginBottom: 40
  },
  playlistItem: {
    fontSize: 16,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
    color: 'red',
  },
});
