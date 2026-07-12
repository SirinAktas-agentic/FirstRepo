import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import AvatarView from '../components/AvatarView';
import ProgressBar from '../components/ProgressBar';
import { computeLevelInfo, levelTitle } from '../lib/gamification';
import { POINTS_PER_LEVEL } from '../types';

export default function ProfileScreen() {
  const { state } = useApp();
  const { totalPoints, completedCount } = state.gamification;
  const { level, progress, pointsToNext } = computeLevelInfo(totalPoints);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.avatarCard}>
        <AvatarView level={level} size={140} />
        <Text style={styles.name}>{state.settings.childName}</Text>
        <Text style={styles.levelLabel}>
          Seviye {level} · {levelTitle(level)}
        </Text>
        <View style={styles.progressWrap}>
          <ProgressBar progress={progress / POINTS_PER_LEVEL} height={14} />
          <Text style={styles.progressText}>
            {progress}/{POINTS_PER_LEVEL} puan · sonraki seviyeye {pointsToNext} puan
          </Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalPoints}</Text>
          <Text style={styles.statLabel}>Toplam Puan</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{completedCount}</Text>
          <Text style={styles.statLabel}>Tamamlanan Görev</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{level}</Text>
          <Text style={styles.statLabel}>Seviye</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Nasıl puan kazanılır?</Text>
        <Text style={styles.infoText}>Her tamamlanan ödev veya etkinlik 5 puan kazandırır.</Text>
        <Text style={styles.infoText}>30 puan toplayınca bir seviye atlanır ve avatar gelişir.</Text>
        <Text style={styles.infoText}>
          Bir gün ya da hafta tamamlanmazsa, kalan ödev/etkinlikler otomatik olarak sonraki haftalara eklenir.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF7FF',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  avatarCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 24,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#F1E9FF',
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: '#4C1D95',
    marginTop: 6,
  },
  levelLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7C3AED',
  },
  progressWrap: {
    width: '80%',
    marginTop: 10,
    gap: 6,
  },
  progressText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1E9FF',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#7C3AED',
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1E9FF',
    gap: 6,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4C1D95',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18,
  },
});
