import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Task } from '@/@types';
import { parseISO, format } from 'date-fns';
import { Colors, Spacing, Typography } from '@/constants';
import Fontisto from '@expo/vector-icons/Fontisto';

const TaskItem = (props: Task) => {
  const { title, starts_at, starts_in } = props;

  const startDate = parseISO(starts_at);
  const day = format(startDate, 'd');
  const month = format(startDate, 'MMM');

  return (
    <View style={styles.itemWrapper}>
      {/* Date Column */}
      <View style={styles.dateWrapper}>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.month}>{month}</Text>
      </View>

      {/* Task Details */}
      <View style={styles.detailsWrapper}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.timerWrapper}>
          <Fontisto name="clock" size={12} color={Colors.GRAY_MEDIUM} />
          <Text style={styles.timerText}>
            {' '}
            Starts at - {format(startDate, 'h:mma')}
          </Text>
        </View>
        <View style={styles.timerWrapper}>
          <Fontisto name="clock" size={12} color={Colors.GRAY_MEDIUM} />

          <Text style={styles.timerText}>
            {' '}
            Time left: {starts_in.days}d {starts_in.hours}h {starts_in.minutes}m{' '}
            {starts_in.seconds}s
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  itemWrapper: {
    width: '100%',
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9E9EA',
    marginBottom: Spacing.SCALE_12,
    shadowColor: '#eaecf2',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#E9E9EA',
    flexBasis: '20%',
    padding: Spacing.SCALE_12,
  },
  day: {
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.PRIMARY,
    fontWeight: 'bold',
  },
  month: {
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.GRAY_DARK,
    textTransform: 'uppercase',
  },
  detailsWrapper: {
    flexBasis: '80%',
    padding: Spacing.SCALE_12,
  },
  title: {
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.PRIMARY,
    fontWeight: '600',
  },
  time: {
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.GRAY_MEDIUM,
  },
  timerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.SCALE_2,
  },
  timerText: {
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.GRAY_MEDIUM,
  },
});
