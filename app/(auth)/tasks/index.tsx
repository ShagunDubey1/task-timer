import { Colors, Spacing } from '@/constants';
import QueryKeys from '@/constants/querykeys';
import CustomButton from '@/libs/components/CustomButton';
import Overlay from '@/libs/components/Overlay';
import CreateNewTask from '@/libs/services/createNewTask';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import {
  View,
  Button,
  FlatList,
  Text,
  RefreshControl,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { SafeAreaView } from 'react-native-safe-area-context';

const TaskRoomScreen = () => {
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);

  const { mutate: createTaskRoom, status: newTaskStatus } = useMutation({
    mutationKey: [QueryKeys.CREATE_TASK],
    mutationFn: () => CreateNewTask(),
    onSuccess: (data) => {
      console.log('Order created successfully', data.data);
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Task Room Created',
        textBody: 'New Task Room is created successfully.',
        button: 'OK',
        onPressButton: () => {
          Dialog.hide();
        },
      });
    },
    onError: (error) => {
      console.log(`Error creating order: ${error}`);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error!',
        textBody: 'Failed to create new room! Please try again.',
        button: 'OK',
      });
    },
  });

  // const { isError, refetch, isFetched, isLoading, isSuccess, data, error } =
  //   useQuery({
  //     queryKey: [QueryKeys.CREATE_TASK],
  //     queryFn: CreateNewTask,
  //     enabled: false,
  //   });

  const handleCreateNewTaskRoom = () => {
    createTaskRoom();
  };

  // if (isLoading)
  //   return (
  //     <Overlay>
  //       <ActivityIndicator size={'large'} color={'gray'} />
  //     </Overlay>
  //   );

  // if (isError)
  //   return (
  //     <Overlay>
  //       <Text>Error: {error.message}</Text>
  //     </Overlay>
  //   );

  return (
    <SafeAreaView  style={styles.container}>
      <CustomButton
        text="Create New Task Room"
        onpress={handleCreateNewTaskRoom}
        type="primary"
        isLoading={newTaskStatus === 'pending'}
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
    </SafeAreaView>
  );
};

export default TaskRoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    padding: Spacing.SCALE_16,
  },
});
