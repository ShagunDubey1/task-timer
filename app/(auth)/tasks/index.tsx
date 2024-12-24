import { Colors, Spacing } from '@/constants';
import CustomButton from '@/libs/components/CustomButton';
import React, { useState } from 'react';
import {
  View,
  Button,
  FlatList,
  Text,
  RefreshControl,
  StyleSheet,
} from 'react-native';
// import { useCreateTaskRoom, useTaskRoomTasks } from '../hooks/useTaskRoom';

const TaskRoomScreen = () => {
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  // const { mutate: createRoom, isLoading: isCreating } = useCreateTaskRoom();
  // const {
  //   data: tasks,
  //   refetch,
  //   isFetching,
  // } = useTaskRoomTasks(currentRoomId || '');

  // const handleCreateRoom = () => {
  //   createRoom(undefined, {
  //     onSuccess: (data) => {
  //       setCurrentRoomId(data.id);
  //     },
  //   });
  // };

  const onSubmit = () => {};

  return (
    <View style={styles.container}>
      <CustomButton
        text="Create New Task Room"
        onpress={onSubmit}
        type="primary"
        // isLoading={loginStatus === 'pending'}
      />

      {currentRoomId && (
        <>
          <Text style={{ marginVertical: 10 }}>
            Current Room ID: {currentRoomId}
          </Text>
          {/* <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={{ padding: 10, borderBottomWidth: 1 }}>
                <Text>{item.title}</Text>
                <Text>{item.completed ? 'Completed' : 'Incomplete'}</Text>
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
          /> */}
        </>
      )}
    </View>
  );
};

export default TaskRoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    padding: Spacing.SCALE_16,
  },
});
