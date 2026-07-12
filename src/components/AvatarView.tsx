import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface AvatarViewProps {
  level: number;
  size?: number;
}

const HAIR_COLORS = ['#7C4A25', '#5B3A29', '#C2410C', '#9333EA', '#DB2777', '#0EA5E9', '#16A34A'];

function accessoryForLevel(level: number): string | null {
  if (level >= 7) return '👑';
  if (level >= 5) return '🕶️';
  if (level >= 3) return '🎀';
  return null;
}

export default function AvatarView({ level, size = 120 }: AvatarViewProps) {
  const hairColor = HAIR_COLORS[(level - 1) % HAIR_COLORS.length];
  const accessory = accessoryForLevel(level);
  const scale = size / 120;

  return (
    <View style={[styles.wrapper, { width: size, height: size * 1.05 }]}>
      <View
        style={[
          styles.hair,
          {
            width: size * 1.05,
            height: size * 0.62,
            borderRadius: size * 0.55,
            backgroundColor: hairColor,
            top: 0,
          },
        ]}
      />
      <View
        style={[
          styles.face,
          {
            width: size * 0.86,
            height: size * 0.86,
            borderRadius: size * 0.43,
            top: size * 0.16,
          },
        ]}
      >
        <View style={[styles.eyesRow, { top: size * 0.32 }]}>
          <View style={[styles.eye, { width: size * 0.07, height: size * 0.07, borderRadius: size * 0.035 }]} />
          <View style={{ width: size * 0.22 }} />
          <View style={[styles.eye, { width: size * 0.07, height: size * 0.07, borderRadius: size * 0.035 }]} />
        </View>
        <View style={[styles.cheeksRow, { top: size * 0.46 }]}>
          <View style={[styles.cheek, { width: size * 0.1, height: size * 0.06, borderRadius: size * 0.05 }]} />
          <View style={{ width: size * 0.3 }} />
          <View style={[styles.cheek, { width: size * 0.1, height: size * 0.06, borderRadius: size * 0.05 }]} />
        </View>
        <View
          style={[
            styles.mouth,
            {
              width: size * 0.28,
              height: size * 0.14,
              borderBottomLeftRadius: size * 0.14,
              borderBottomRightRadius: size * 0.14,
              top: size * 0.55,
            },
          ]}
        />
      </View>
      {accessory ? (
        <Text style={[styles.accessory, { fontSize: 28 * scale, top: -6 * scale, right: -2 * scale }]}>
          {accessory}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  hair: {
    position: 'absolute',
    alignSelf: 'center',
  },
  face: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#FFDBAC',
  },
  eyesRow: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  eye: {
    backgroundColor: '#2D2D2D',
  },
  cheeksRow: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  cheek: {
    backgroundColor: '#FFAFA3',
    opacity: 0.7,
  },
  mouth: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#B23A48',
  },
  accessory: {
    position: 'absolute',
  },
});
