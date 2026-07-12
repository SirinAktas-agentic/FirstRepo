import React, { useMemo, useRef } from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import DayCard from '../components/DayCard';
import { weekDatesFrom, weekRangeLabel, todayISO } from '../lib/dateUtils';
import { tasksForDate, weekStats } from '../lib/selectors';

interface Section {
  title: string;
  weekStart: string;
  data: string[];
}

export default function AgendaScreen() {
  const { state, toggleTask } = useApp();
  const today = todayISO();
  const listRef = useRef<SectionList<string, Section>>(null);

  const sections: Section[] = useMemo(
    () =>
      state.weeks.map((week) => ({
        title: weekRangeLabel(week.weekStart),
        weekStart: week.weekStart,
        data: weekDatesFrom(week.weekStart),
      })),
    [state.weeks],
  );

  const currentSectionIndex = useMemo(() => {
    const idx = sections.findIndex((s) => s.data.includes(today));
    return idx >= 0 ? idx : 0;
  }, [sections, today]);

  const scrollToToday = () => {
    listRef.current?.scrollToLocation({
      sectionIndex: currentSectionIndex,
      itemIndex: 0,
      viewPosition: 0,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>{state.settings.childName}'nin Yaz Ajandası</Text>
        <Pressable style={styles.todayButton} onPress={scrollToToday}>
          <Text style={styles.todayButtonText}>Bugüne git</Text>
        </Pressable>
      </View>
      <SectionList
        ref={listRef}
        sections={sections}
        keyExtractor={(date) => date}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled
        renderItem={({ item: date }) => (
          <DayCard date={date} tasks={tasksForDate(state, date)} isToday={date === today} onToggle={toggleTask} />
        )}
        renderSectionHeader={({ section }) => {
          const stats = weekStats(state, { weekStart: section.weekStart });
          return (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionStats}>
                {stats.completed}/{stats.total}
              </Text>
            </View>
          );
        }}
        onScrollToIndexFailed={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF7FF',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#4C1D95',
    flexShrink: 1,
  },
  todayButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  todayButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
  },
  listContent: {
    paddingHorizontal: 14,
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FBF7FF',
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9333EA',
    textTransform: 'uppercase',
  },
  sectionStats: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
  },
});
