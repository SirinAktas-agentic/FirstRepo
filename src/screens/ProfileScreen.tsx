import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import AvatarView from '../components/AvatarView';
import ProgressBar from '../components/ProgressBar';
import { computeLevelInfo, levelTitle } from '../lib/gamification';
import { POINTS_PER_LEVEL } from '../types';
import { HAIR_COLOR_OPTIONS, HAIR_STYLE_OPTIONS } from '../data/avatarOptions';

export default function ProfileScreen() {
  const { state, updateAvatar } = useApp();
  const { totalPoints, completedCount } = state.gamification;
  const { level, progress, pointsToNext } = computeLevelInfo(totalPoints);
  const { avatar } = state;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.avatarCard}>
        <AvatarView level={level} size={140} avatar={avatar} />
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

      <View style={styles.customizeCard}>
        <Text style={styles.customizeTitle}>Avatarını Özelleştir</Text>

        <Text style={styles.customizeLabel}>Saç Rengi</Text>
        <View style={styles.swatchRow}>
          {HAIR_COLOR_OPTIONS.map((option) => {
            const selected = option.value === avatar.hairColor;
            return (
              <Pressable
                key={option.value}
                accessibilityLabel={option.label}
                onPress={() => updateAvatar({ ...avatar, hairColor: option.value })}
                style={[
                  styles.swatch,
                  { backgroundColor: option.value },
                  selected && styles.swatchSelected,
                ]}
              >
                {selected ? <Text style={styles.swatchCheck}>✓</Text> : null}
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.customizeLabel}>Saç Stili</Text>
        <View style={styles.pillRow}>
          {HAIR_STYLE_OPTIONS.map((option) => {
            const selected = option.value === avatar.hairStyle;
            return (
              <Pressable
                key={option.value}
                onPress={() => updateAvatar({ ...avatar, hairStyle: option.value })}
                style={[styles.pill, selected && styles.pillSelected]}
              >
                <Text style={[styles.pillText, selected && styles.pillTextSelected]}>{option.label}</Text>
              </Pressable>
            );
          })}
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
  customizeCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1E9FF',
    gap: 4,
  },
  customizeTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4C1D95',
    marginBottom: 6,
  },
  customizeLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    marginTop: 10,
    marginBottom: 8,
  },
  swatchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  swatch: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  swatchSelected: {
    borderColor: '#1F2937',
  },
  swatchCheck: {
    color: 'white',
    fontWeight: '800',
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  pillSelected: {
    backgroundColor: '#7C3AED',
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
  },
  pillTextSelected: {
    color: 'white',
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
