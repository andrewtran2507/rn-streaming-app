import React, { FC, useEffect, useState } from "react";
import DomSelector from "react-native-dom-parser";

import { FlatList } from "react-native";

import { Column, Row } from "../../components";

import TrackItem, { TrackItemProps } from "./TrackItem";

import { getTracks } from "../../services";

export interface SearchProps {
  searching: string;
}

const LIMIT_SEARCH_MUSICS = 3;

async function loadGraphicCards(searchUrl: string) {
  const response = await fetch(searchUrl); // fetch page
  return response.text();
}

const TracksList: FC<SearchProps> = ({ searching, navigation }) => {
  const [tracksList, setTracksList] = useState<TrackItemProps[]>([]);

  const fetchData = async (searching: string) => {
    try {
      if (searching) {
        const response = await getTracks(searching, LIMIT_SEARCH_MUSICS);
        console.log('response?.message?.body?.track_list?.map((d:any) => d?.track)', response?.message?.body?.track_list?.map((d:any) => d?.track));
        const tracks = response?.message?.body?.track_list?.map((d:any) => d?.track)?.map(
            (track: any) => {
              return {
                id: track.track_id,
                name: track.track_name,
                album_name: track.album_name,
                album_id: track.album_id,
                artist_name: track.artist_name,
                artist_id: track.album_id,
              };
            }
          );
          // await Promise.all(
          //   response?.message?.body?.track_list?.map(
          //     async ({ track }: any) => {
          //       const trackHtml = await loadGraphicCards(
          //         track.track_share_url
          //       );
          //       console.log('trackHtml', JSON.stringify(trackHtml));
          //       const rootNode = DomSelector(trackHtml);
          //       console.log('rootNode', rootNode);
          //       const imagePath = rootNode.getElementsByClassName(
          //         "banner-album-image-desktop"
          //       )[0].children[0].src;

          //       return {
          //         id: track.track_id,
          //         name: track.track_name,
          //         album_name: track.album_name,
          //         album_id: track.album_id,
          //         artist_name: track.artist_name,
          //         artist_id: track.album_id,
          //         image_path: imagePath,
          //       };
          //     }
          //   ),
          // );
        console.log('tracks ', JSON.stringify(tracks));
        setTracksList(tracks);
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    (async () => {
      await fetchData(searching);
    })()
  }, [searching]);

  return (
    <Column alignItems="center" flex={1} justifyContent="center">
      {searching !== "" && (
        <Row alignItems="center">
          {tracksList && (
            <FlatList
              renderItem={({ item }) => <TrackItem {...item} navigation={navigation} />}
              data={tracksList}
            />
          )}
        </Row>
      )}
    </Column>
  );
};

export default TracksList;
