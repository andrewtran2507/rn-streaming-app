import React, { FC, useState } from "react";
import { ScrollView } from "react-native";

import {
  Column,
  ArtistsList,
  TracksList,
  SearchInput,
  Row,
} from "../../components";
import { useEffect } from "react";

const Search: FC = ({navigation}: any) => {
  const [searchField, setSearchField] = useState<string>("");
  const [isClosed, setIsClosed] = useState<boolean>(false);

  const handleChange = (value: string) => {
    setSearchField(value);
  };

  useEffect(() => {}, [searchField, setSearchField, isClosed]);

  return (
    <ScrollView>
      <Column flex={1}>
        <Row>
          <SearchInput
            bg={"purple"}
            height={36}
            width="100%"
            placeholder="Search for a song or artist."
            returnKeyType="next"
            onClose={() => {
              handleChange("");
            }}
            value={searchField}
            color="white"
            onChangeText={handleChange}
          />
        </Row>

        <ArtistsList searching={searchField} navigation={navigation} />

        <TracksList searching={searchField} navigation={navigation} />
      </Column>
    </ScrollView>
  );
};

export default Search;
