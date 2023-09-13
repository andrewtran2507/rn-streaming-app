import React, { FC } from "react";
import { ScrollView } from "react-native";

import { Column, Text } from "../../components";
import Detail from "./Detail";

const Music: FC = () => {
  return (
    <ScrollView>
      <Column flex={1}>
        <Detail />
      </Column>
    </ScrollView>
  );
};

export default Music;
