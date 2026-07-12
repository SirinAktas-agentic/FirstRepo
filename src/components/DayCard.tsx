import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AgendaTask } from '../types';
import TaskItem from './TaskItem';
import { formatDisplayDate, dayNameTR } from '../lib/dateUtils';

interface DayCardProps {
  date: string;
  tasks: AgendaTask[];
  isToday: boolean;
  onToggle: (id: string) => void;
}

export default function DayCard({ date, tasks, isToday, onToggle }: DayCardProps) {
  const completed = tasks.filter((t) => t.completed).length;
  const allDone = tasks.length > 0 && completed === tasks.length;

  if (tasks.length === 0) return null;

  return (
    <View style={[styles.card, isToday && styles.cardToday]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.dayName, isToday && styles.dayNameToday]}>
            {dayNameTR(date)} {isToday ? '· Bugün' : ''}
          </Text>
          <Text style={styles.dateLabel}>{formatDisplayDate(date)}</Text>
        </View>
        <View style={[styles.statusPill, allDone && styles.statusPillDone]}>
          <Text style={[styles.statusText, allDone && styles.statusTextDone]}>
            {completed}/{tasks.length} {allDone ? '🎉' : ''}
          </Text>
        </View>
      </View>
      <View style={styles.taskList}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F1E9FF',
  },
  cardToday: {
    borderColor: '#A855F7',
    borderWidth: 2,
    backgroundColor: '#FAF5FF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  dayName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4B5563',
  },
  dayNameToday: {
    color: '#7C3AED',
  },
  dateLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  statusPill: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusPillDone: {
    backgroundColor: '#DCFCE7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
  },
  statusTextDone: {
    color: '#15803D',
  },
  taskList: {
    marginTop: 4,
  },
});
