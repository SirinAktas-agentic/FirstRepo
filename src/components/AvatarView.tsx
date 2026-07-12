import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AvatarConfig } from '../types';

interface AvatarViewProps {
  level: number;
  size?: number;
  avatar: AvatarConfig;
}

function accessoryForLevel(level: number): string | null {
  if (level >= 7) return '👑';
  if (level >= 5) return '🕶️';
  if (level >= 3) return '🎀';
  return null;
}

export default function AvatarView({ level, size = 120, avatar }: AvatarViewProps) {
  const hairColor = avatar.hairColor;
  const hairStyle = avatar.hairStyle;
  const accessory = accessoryForLevel(level);
  const scale = size / 120;

  return (
    <View style={[styles.wrapper, { width: size, height: size * 1.05 }]}>
      {hairStyle === 'uzun' ? (
        <>
          <View
            style={[
              styles.longHairSide,
              {
                left: size * 0.02,
                top: size * 0.14,
                width: size * 0.16,
                height: size * 0.62,
                borderRadius: size * 0.08,
                backgroundColor: hairColor,
              },
            ]}
          />
          <View
            style={[
              styles.longHairSide,
              {
                right: size * 0.02,
                top: size * 0.14,
                width: size * 0.16,
                height: size * 0.62,
                borderRadius: size * 0.08,
                backgroundColor: hairColor,
              },
            ]}
          />
        </>
      ) : null}

      {hairStyle === 'atkuyrugu' ? (
        <View
          style={[
            styles.ponytail,
            {
              right: -size * 0.06,
              top: size * 0.2,
              width: size * 0.14,
              height: size * 0.42,
              borderRadius: size * 0.07,
              backgroundColor: hairColor,
              transform: [{ rotate: '18deg' }],
            },
          ]}
        />
      ) : null}

      {hairStyle === 'orgu' ? (
        <View
          style={[
            styles.braid,
            {
              left: size * 0.08,
              top: size * 0.34,
              width: size * 0.1,
              height: size * 0.5,
              borderRadius: size * 0.05,
              backgroundColor: hairColor,
              transform: [{ rotate: '8deg' }],
            },
          ]}
        />
      ) : null}

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
  longHairSide: {
    position: 'absolute',
  },
  ponytail: {
    position: 'absolute',
  },
  braid: {
    position: 'absolute',
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
