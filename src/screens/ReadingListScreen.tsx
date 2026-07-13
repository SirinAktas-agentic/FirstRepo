import React, { useMemo } from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { READING_LIST } from '../data/readingList';
import { BOOK_STATUS_LABELS, ReadingBook } from '../types';

interface Section {
  title: string;
  data: ReadingBook[];
}

const STATUS_COLORS: Record<string, string> = {
  zorunlu: '#DC2626',
  secmeli: '#D97706',
  serbest: '#2563EB',
  tekrar: '#7C3AED',
  opsiyonel: '#6B7280',
  'sec-bir': '#16A34A',
};

export default function ReadingListScreen() {
  const { state, toggleBookRead } = useApp();

  const sections: Section[] = useMemo(() => {
    const bySubject = new Map<string, ReadingBook[]>();
    for (const book of READING_LIST) {
      const list = bySubject.get(book.subject) ?? [];
      list.push(book);
      bySubject.set(book.subject, list);
    }
    return Array.from(bySubject.entries()).map(([title, data]) => ({ title, data }));
  }, []);

  const totalRead = READING_LIST.filter((b) => state.readBooks[b.id]).length;

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Yaz Tatili Okuma Listesi</Text>
        <View style={styles.progressPill}>
          <Text style={styles.progressText}>
            {totalRead}/{READING_LIST.length} okundu
          </Text>
        </View>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled
        renderSectionHeader={({ section }) => {
          const subjectBooks = section.data;
          const subjectRead = subjectBooks.filter((b) => state.readBooks[b.id]).length;
          return (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionStats}>
                {subjectRead}/{subjectBooks.length}
              </Text>
            </View>
          );
        }}
        renderItem={({ item }) => {
          const read = !!state.readBooks[item.id];
          const color = STATUS_COLORS[item.status] ?? '#6B7280';
          return (
            <Pressable
              onPress={() => toggleBookRead(item.id)}
              style={({ pressed }) => [styles.bookRow, pressed && styles.bookRowPressed]}
            >
              <View style={[styles.checkbox, read && { backgroundColor: color, borderColor: color }]}>
                {read ? <Text style={styles.checkmark}>✓</Text> : null}
              </View>
              <View style={styles.bookText}>
                <View style={styles.badgeRow}>
                  <View style={[styles.badge, { backgroundColor: color }]}>
                    <Text style={styles.badgeText}>{BOOK_STATUS_LABELS[item.status]}</Text>
                  </View>
                </View>
                <Text style={[styles.bookTitle, read && styles.bookTitleDone]}>{item.title}</Text>
                <Text style={styles.bookAuthor}>{item.author}</Text>
                {item.note ? <Text style={styles.bookNote}>{item.note}</Text> : null}
              </View>
            </Pressable>
          );
        }}
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
  progressPill: {
    backgroundColor: '#7C3AED',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  progressText: {
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
  bookRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    gap: 12,
    borderWidth: 1,
    borderColor: '#F1E9FF',
  },
  bookRowPressed: {
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
  bookText: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  bookTitleDone: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  bookAuthor: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 1,
  },
  bookNote: {
    fontSize: 12,
    color: '#9333EA',
    marginTop: 4,
    lineHeight: 16,
  },
});
