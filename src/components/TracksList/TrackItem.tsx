import React, { FC } from "react";

import { TouchableOpacityProps, Image } from "react-native";
import styled from "styled-components/native";

// import { useNavigation } from "@react-navigation/native";
import { Column, Text } from "../../components";
import { ColumnProps } from "../Column";

export interface TrackItemProps {
  id: number;
  name: string;
  album_name: string;
  album_id: number;
  artist_name: string;
  artist_id: number;
  image_path: string;
  navigation: any;
}

const TrackItemComponent: FC<TrackItemProps> = ({
  id,
  name,
  album_name,
  album_id,
  artist_name,
  artist_id,
  image_path,
  navigation,
}): JSX.Element => {
  // const navigation = useNavigation();

  return (
    <ItemContainer key={id} onPress={() => navigation.navigate("Music")}>
      <Column p="5px">
        <Image
          source={{
            uri: "https://img.freepik.com/premium-photo/abstraction-fire-violin-key_899027-2717.jpg",
          }}
          style={{ width: 40, height: 40, borderRadius: 40 }}
        />
      </Column>
      <Column pl="10px">
        <Text fontSize="14px" fontWeight={700} color="white">
          {name}
        </Text>

        <Text fontSize="12px" fontWeight={400} color="white">
          {album_name}
        </Text>
      </Column>
    </ItemContainer>
  );
};

interface ItemContainerProps extends ColumnProps, TouchableOpacityProps {}

const ItemContainer: FC<ItemContainerProps> = styled.TouchableOpacity<ItemContainerProps>`
  flex-direction: row;
  width: 100%;
  padding: 10px;
`;

export default TrackItemComponent;
