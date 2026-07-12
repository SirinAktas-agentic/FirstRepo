import React, { useEffect } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import AvatarView from './AvatarView';
import { AvatarConfig, MotivationEvent } from '../types';

interface MotivationOverlayProps {
  event: MotivationEvent | null;
  level: number;
  avatar: AvatarConfig;
  onDismiss: () => void;
}

export default function MotivationOverlay({ event, level, avatar, onDismiss }: MotivationOverlayProps) {
  useEffect(() => {
    if (!event) return;
    const timeout = setTimeout(onDismiss, event.leveledUp ? 3200 : 2000);
    return () => clearTimeout(timeout);
  }, [event, onDismiss]);

  return (
    <Modal visible={!!event} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={[styles.card, event?.leveledUp && styles.cardLevelUp]}>
          <AvatarView level={level} size={90} avatar={avatar} />
          {event?.leveledUp ? <Text style={styles.levelBadge}>Seviye {event.newLevel}!</Text> : null}
          <Text style={styles.message}>{event?.message}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(76, 29, 149, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 28,
    alignItems: 'center',
    gap: 10,
    maxWidth: 280,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  cardLevelUp: {
    backgroundColor: '#FEF3C7',
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  levelBadge: {
    fontSize: 18,
    fontWeight: '800',
    color: '#B45309',
  },
  message: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4C1D95',
    textAlign: 'center',
  },
});
