import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AgendaTask } from '../types';

interface TaskItemProps {
  task: AgendaTask;
  onToggle: (id: string) => void;
}

const SUBJECT_COLORS: Record<string, string> = {
  Türkçe: '#DB2777',
  Matematik: '#2563EB',
  'Fen Bilimleri': '#16A34A',
  'Sosyal Bilgiler': '#D97706',
  İngilizce: '#0EA5E9',
  İspanyolca: '#B45309',
  'Din Kültürü ve Ahlak Bilgisi': '#7C3AED',
  'Bilişim Teknolojileri ve Yazılım': '#0891B2',
  'Görsel Sanatlar': '#C026D3',
  Müzik: '#4338CA',
  'Beden Eğitimi ve Spor': '#65A30D',
  Rehberlik: '#F97316',
  Etkinlik: '#F97316',
};

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  const color = SUBJECT_COLORS[task.subject] ?? '#6B7280';

  return (
    <Pressable
      onPress={() => onToggle(task.id)}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View style={[styles.checkbox, task.completed && { backgroundColor: color, borderColor: color }]}>
        {task.completed ? <Text style={styles.checkmark}>✓</Text> : null}
      </View>
      <View style={styles.textWrap}>
        <View style={styles.subjectRow}>
          <View style={[styles.subjectDot, { backgroundColor: color }]} />
          <Text style={[styles.subjectLabel, { color }]}>{task.subject}</Text>
          {task.rolledOver ? <Text style={styles.badge}>telafi</Text> : null}
          <Text style={styles.duration}>· 30 dk</Text>
        </View>
        <Text style={[styles.title, task.completed && styles.titleDone]}>{task.title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 4,
    gap: 12,
  },
  rowPressed: {
    opacity: 0.6,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#C4B5FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
  },
  textWrap: {
    flex: 1,
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  subjectDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  subjectLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  duration: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  badge: {
    fontSize: 10,
    color: '#FFFFFF',
    backgroundColor: '#F59E0B',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
    overflow: 'hidden',
    fontWeight: '700',
  },
  title: {
    fontSize: 14,
    color: '#1F2937',
  },
  titleDone: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
});
