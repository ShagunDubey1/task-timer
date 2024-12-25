import { Colors, Spacing } from '@/constants';
import QueryKeys from '@/constants/querykeys';
import CustomButton from '@/libs/components/CustomButton';
import Overlay from '@/libs/components/Overlay';
import TaskItem from '@/libs/components/TaskItem';
import CreateNewTask from '@/libs/services/createNewTask';
import getAllTask from '@/libs/services/getAllTasks';
import getNextTask from '@/libs/services/getNextTask';
import { useTaskRoomStore } from '@/stores/useTaskRoomStore';
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
  const { taskRoomId, setTaskRoomId } = useTaskRoomStore();

  const { mutate: createTaskRoom, status: newTaskStatus } = useMutation({
    mutationKey: [QueryKeys.CREATE_TASK],
    mutationFn: () => CreateNewTask(),
    onSuccess: (data) => {
      console.log('Task New room created successfully', data.data.id);
      setTaskRoomId(data.data.id);
      console.log('Task Room ID set:', data.data.id);
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
      console.log(`Error creating new room: ${error}`);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error!',
        textBody: 'Failed to create new room! Please try again.',
        button: 'OK',
      });
    },
  });

  const { isError, refetch, isLoading, isSuccess, data, error, isFetching } =
    useQuery({
      queryKey: [QueryKeys.GET_ALL_TASKS],
      queryFn: () => getAllTask({ id: taskRoomId! }),
      enabled: !!taskRoomId,
    });

  const {
    isLoading: isNextTaskLoading,
    data: nextTaskData,
    error: nextTaskError,
    refetch: nextTaskRefetch,
  } = useQuery({
    queryKey: [QueryKeys.GET_NEXT_TASK],
    queryFn: () => getNextTask({ id: taskRoomId! }),
    enabled: false,
  });

  useEffect(() => {
    if (taskRoomId) refetch();
  }, [taskRoomId]);

  console.log('get all', error, data?.data);
  // console.log('Next task:', nextTaskData?.data, nextTaskError);

  const handleCreateNewTaskRoom = () => {
    createTaskRoom();
  };

  const handleGetNextTask = () => {
    nextTaskRefetch();
    refetch();
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
    <SafeAreaView style={styles.container}>
      {!taskRoomId && (
        <CustomButton
          text="Create New Task Room"
          onpress={handleCreateNewTaskRoom}
          type="primary"
          isLoading={newTaskStatus === 'pending'}
        />
      )}

      {taskRoomId && (
        <>
          <Text style={{ marginVertical: 10 }}>
            Current Room ID: {taskRoomId}
          </Text>

          <FlatList
            data={data?.data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TaskItem {...item} />}
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
          />

          <CustomButton
            text="Get Next Task"
            onpress={handleGetNextTask}
            type="primary"
            isLoading={isNextTaskLoading}
          />
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
    backgroundColor: Colors.FOREGROUND,
    padding: Spacing.SCALE_16,
    width: '100%',
  },
});
