import React, { FC, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";


import { Column, Text, Button } from "../../components";
import { useEffect } from "react";

const Home: FC = ({navigation}: any) => {
  const [searchField, setSearchField] = useState<string>("");
  useEffect(() => {}, [searchField, setSearchField]);
  return (
    <ScrollView>
      <Column px="10px">
        <Text
          textAlign="center"
          color="white"
          mt="66px"
          mb="10px"
          fontWeight={700}
          variant="bigger"
        >
          Search
        </Text>
        <Button
          text="Artists or songs"
          variant="secondary"
          nameIcon="search"
          onPress={(): void => {
            navigation.navigate("Search");
          }}
        />
      </Column>
    </ScrollView>
  );
};

export default Home;
