import React, { FC, useState } from "react";
import { ScrollView } from "react-native";

import { Column } from "../../components";

import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Video, { FilterType } from 'react-native-video';

const filterTypes = [
    FilterType.NONE,
    FilterType.INVERT,
    FilterType.MONOCHROME,
    FilterType.POSTERIZE,
    FilterType.FALSE,
    FilterType.MAXIMUMCOMPONENT,
    FilterType.MINIMUMCOMPONENT,
    FilterType.CHROME,
    FilterType.FADE,
    FilterType.INSTANT,
    FilterType.MONO,
    FilterType.NOIR,
    FilterType.PROCESS,
    FilterType.TONAL,
    FilterType.TRANSFER,
    FilterType.SEPIA
];

const VideoPlayer: FC = () => {
  const [state, setState] = useState({
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    controls: true,
    paused: true,
    skin: 'embed',
    ignoreSilentSwitch: null,
    mixWithOthers: null,
    isBuffering: true,
    filter: FilterType.NONE,
    filterEnabled: true
  });

  const onLoad = (data: any) => {
    console.log('On load fired!', data);
    setState((st) => ({ ...st, duration: data.duration}));
  }

  const onProgress = (data: any) => {
    setState((st) => ({ ...st, currentTime: data.currentTime}));
  }

  const onBuffer = ({ isBuffering }: { isBuffering: boolean }) => {
    setState((st) => ({ ...st,  isBuffering }));
  }

  const getCurrentTimePercentage = () => {
    if (state.currentTime > 0) {
      return state.currentTime / state.duration;
    } else {
      return 0;
    }
  }

  const setFilter = (step: any) => {
    let index = filterTypes.indexOf(state.filter) + step;

    if (index === filterTypes.length) {
      index = 0;
    } else if (index === -1) {
      index = filterTypes.length - 1;
    }

    setState((st) => ({ ...st, 
      filter: filterTypes[index]
    }))
  }

  const renderSkinControl = (skin: any) => {
    const isSelected = state.skin == skin;
    const selectControls = skin == 'native' || skin == 'embed';
    return (
      <TouchableOpacity onPress={() => { setState((st) => ({ ...st, 
          controls: selectControls,
          skin: skin
        })) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {skin}
        </Text>
      </TouchableOpacity>
    );
  }

  const renderRateControl = (rate: any) => {
    const isSelected = (state.rate == rate);

    return (
      <TouchableOpacity onPress={() => { setState((st) => ({ ...st, rate: rate})) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    )
  }

  const renderResizeModeControl = (resizeMode: any) => {
    const isSelected = (state.resizeMode == resizeMode);

    return (
      <TouchableOpacity onPress={() => { setState((st) => ({ ...st, resizeMode: resizeMode})) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    )
  }

  const renderVolumeControl = (volume: any) => {
    const isSelected = (state.volume == volume);

    return (
      <TouchableOpacity onPress={() => { setState((st) => ({ ...st, volume: volume})) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    )
  }

  const renderIgnoreSilentSwitchControl = (ignoreSilentSwitch: any) => {
    const isSelected = (state.ignoreSilentSwitch == ignoreSilentSwitch);

    return (
      <TouchableOpacity onPress={() => { setState((st) => ({ ...st, ignoreSilentSwitch: ignoreSilentSwitch})) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {ignoreSilentSwitch}
        </Text>
      </TouchableOpacity>
    )
  }

  const renderMixWithOthersControl = (mixWithOthers: any) => {
    const isSelected = (state.mixWithOthers == mixWithOthers);

    return (
      <TouchableOpacity onPress={() => { setState((st) => ({ ...st, mixWithOthers: mixWithOthers})) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {mixWithOthers}
        </Text>
      </TouchableOpacity>
    )
  }

  // const renderCustomSkin = () => {
  //   const flexCompleted = getCurrentTimePercentage() * 100;
  //   const flexRemaining = (1 - getCurrentTimePercentage()) * 100;

  //   return (
  //     <View style={styles.container}>
  //       <TouchableOpacity style={styles.fullScreen} onPress={() => {setState((st) => ({ ...st, paused: !state.paused})) }}>
  //         <Video
  //           source={'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8'}
  //           style={styles.fullScreen}
  //           rate={state.rate}
  //           paused={state.paused}
  //           volume={state.volume}
  //           muted={state.muted}
  //           ignoreSilentSwitch={state.ignoreSilentSwitch}
  //           mixWithOthers={state.mixWithOthers}
  //           resizeMode={state.resizeMode}
  //           onLoad={onLoad}
  //           onBuffer={onBuffer}
  //           onProgress={onProgress}
  //           onEnd={() => { console.log('Done!') }}
  //           repeat={true}
  //           filter={state.filter}
  //           filterEnabled={state.filterEnabled}
  //         />
  //       </TouchableOpacity>

  //       <View style={styles.controls}>
  //         <View style={styles.generalControls}>
  //           <View style={styles.skinControl}>
  //             {renderSkinControl('custom')}
  //             {renderSkinControl('native')}
  //             {renderSkinControl('embed')}
  //           </View>
  //           {
  //             (state.filterEnabled) ?
  //                 <View style={styles.skinControl}>
  //                   <TouchableOpacity onPress={() => {
  //                     setFilter(-1)
  //                   }}>
  //                     <Text style={styles.controlOption}>Previous Filter</Text>
  //                   </TouchableOpacity>
  //                   <TouchableOpacity onPress={() => {
  //                     setFilter(1)
  //                   }}>
  //                     <Text style={styles.controlOption}>Next Filter</Text>
  //                   </TouchableOpacity>
  //                 </View> : null
  //           }
  //         </View>
  //         <View style={styles.generalControls}>
  //           <View style={styles.rateControl}>
  //             {renderRateControl(0.5)}
  //             {renderRateControl(1.0)}
  //             {renderRateControl(2.0)}
  //           </View>

  //           <View style={styles.volumeControl}>
  //             {renderVolumeControl(0.5)}
  //             {renderVolumeControl(1)}
  //             {renderVolumeControl(1.5)}
  //           </View>

  //           <View style={styles.resizeModeControl}>
  //             {renderResizeModeControl('cover')}
  //             {renderResizeModeControl('contain')}
  //             {renderResizeModeControl('stretch')}
  //           </View>
  //         </View>
  //         <View style={styles.generalControls}>
  //           {
  //             (Platform.OS === 'ios') ?
  //               <>
  //                 <View style={styles.ignoreSilentSwitchControl}>
  //                   {renderIgnoreSilentSwitchControl('ignore')}
  //                   {renderIgnoreSilentSwitchControl('obey')}
  //                 </View>
  //                 <View style={styles.mixWithOthersControl}>
  //                   {renderMixWithOthersControl('mix')}
  //                   {renderMixWithOthersControl('duck')}
  //                 </View>
  //               </> : null
  //           }
  //         </View>

  //         <View style={styles.trackingControls}>
  //           <View style={styles.progress}>
  //             <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]} />
  //             <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]} />
  //           </View>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // }

  const renderNativeSkin = () => {
    const videoStyle = state.skin == 'embed' ? styles.nativeVideoControls : styles.fullScreen;
    return (
      <View style={styles.container}>
        <View style={styles.fullScreen}>
          <Video
            source={require('./broadchurch.mp4')}
            style={videoStyle}
            rate={state.rate}
            paused={state.paused}
            volume={state.volume}
            muted={state.muted}
            ignoreSilentSwitch={state.ignoreSilentSwitch}
            mixWithOthers={state.mixWithOthers}
            resizeMode={state.resizeMode}
            onLoad={onLoad}
            onBuffer={onBuffer}
            onProgress={onProgress}
            onEnd={() => { console.log('End!') }}
            repeat={true}
            controls={state.controls}
            filter={state.filter}
            filterEnabled={state.filterEnabled}
          />
        </View>
        <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.skinControl}>
              {renderSkinControl('custom')}
              {renderSkinControl('native')}
              {renderSkinControl('embed')}
            </View>
            {
              (state.filterEnabled) ?
                  <View style={styles.skinControl}>
                    <TouchableOpacity onPress={() => {
                      setFilter(-1)
                    }}>
                      <Text style={styles.controlOption}>Previous Filter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      setFilter(1)
                    }}>
                      <Text style={styles.controlOption}>Next Filter</Text>
                    </TouchableOpacity>
                  </View> : null
            }
          </View>
          <View style={styles.generalControls}>
            <View style={styles.rateControl}>
              {renderRateControl(0.5)}
              {renderRateControl(1.0)}
              {renderRateControl(2.0)}
            </View>

            <View style={styles.volumeControl}>
              {renderVolumeControl(0.5)}
              {renderVolumeControl(1)}
              {renderVolumeControl(1.5)}
            </View>

            <View style={styles.resizeModeControl}>
              {renderResizeModeControl('cover')}
              {renderResizeModeControl('contain')}
              {renderResizeModeControl('stretch')}
            </View>
          </View>
          <View style={styles.generalControls}>
            {
              (Platform.OS === 'ios') ?
                <>
                  <View style={styles.ignoreSilentSwitchControl}>
                    {renderIgnoreSilentSwitchControl('ignore')}
                    {renderIgnoreSilentSwitchControl('obey')}
                  </View>
                  <View style={styles.mixWithOthersControl}>
                    {renderMixWithOthersControl('mix')}
                    {renderMixWithOthersControl('duck')}
                  </View>
                </> : null
            }
          </View>
        </View>

      </View>
    );
  }

  
  // return state.controls ? renderNativeSkin() : renderCustomSkin();
  return renderNativeSkin();
  
}


const VideoCMP: FC = () => {
  return (
    <ScrollView>
      <Column flex={1}>
        <VideoPlayer />
      </Column>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  skinControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ignoreSilentSwitchControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mixWithOthersControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  nativeVideoControls: {
    top: 184,
    height: 300
  }
});

export default VideoCMP;
