import { ActivityIndicator, View } from 'react-native';
import React from 'react';

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , width: "100%"}}>
      <ActivityIndicator size={"large"} color={"gray"} />
    </View>
  );
};

export default index;
