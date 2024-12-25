import QueryKeys from '@/constants/querykeys';
import CustomButton from '@/libs/components/CustomButton';
import Overlay from '@/libs/components/Overlay';
import TaskItem from '@/libs/components/TaskItem';
import CreateNewTask from '@/libs/services/createNewTask';
import getAllTask from '@/libs/services/getAllTasks';
import getNextTask from '@/libs/services/getNextTask';
import { styles } from '@/libs/styles/tasks';
import { useTaskRoomStore } from '@/stores/useTaskRoomStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import {
  FlatList,
  Text,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import { Task } from '@/@types';
import { calculateTriggerTime } from '@/libs/utils/calculateTriggerTime';

Notifications.setNotificationCategoryAsync('task-actions', [
  {
    identifier: 'done',
    buttonTitle: 'Done',
    options: {
      isDestructive: false,
      opensAppToForeground: false,
    },
  },
  {
    identifier: 'skip',
    buttonTitle: 'Skip',
    options: {
      isDestructive: true,
      opensAppToForeground: false,
    },
  },
]);

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

  const { isError, refetch, isLoading, data, error, isFetching } = useQuery({
    queryKey: [QueryKeys.GET_ALL_TASKS],
    queryFn: () => getAllTask({ id: taskRoomId! }),
    enabled: !!taskRoomId,
  });

  const {
    isLoading: isNextTaskLoading,
    data: nextTaskData,
    isError: isNextTaskError,
    refetch: nextTaskRefetch,
    error: nextTaskError,
    isSuccess: isNextTaskSuccess,
  } = useQuery({
    queryKey: [QueryKeys.GET_NEXT_TASK],
    queryFn: () => getNextTask({ id: taskRoomId! }),
    enabled: false,
  });

  useEffect(() => {
    if (taskRoomId) refetch();
  }, [taskRoomId]);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const { actionIdentifier, notification } = response;

        if (actionIdentifier === 'done') {
          console.log('Task marked as done!');
        }

        if (actionIdentifier === 'skip') {
          console.log('Task skipped!');
        }

        Notifications.dismissNotificationAsync(notification.request.identifier);
      }
    );

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (isNextTaskSuccess) {
      sendNotification(nextTaskData.data);
    }
  }, [nextTaskData]);

  const sendNotification = async (task: Task) => {
    const { title, starts_in } = task;
    const triggerTime = calculateTriggerTime(starts_in);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: 'Reminder: You have a task!',
        categoryIdentifier: 'task-actions',
      },
      trigger: triggerTime,
    });
  };

  const handleCreateNewTaskRoom = () => {
    createTaskRoom();
  };

  const handleGetNextTask = () => {
    nextTaskRefetch();
    refetch();
  };

  if (isLoading)
    return (
      <Overlay>
        <ActivityIndicator size={'large'} color={'gray'} />
      </Overlay>
    );

  if (isError || isNextTaskError)
    return (
      <Overlay>
        <Text>Error: {error?.message || nextTaskError?.message}</Text>
      </Overlay>
    );

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
          <Text style={styles.title}>Current Room ID: {taskRoomId}</Text>

          <FlatList
            data={data?.data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TaskItem {...item} />}
            showsVerticalScrollIndicator={false}
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
