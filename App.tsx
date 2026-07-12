import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { AppProvider, useApp } from './src/context/AppContext';
import AgendaScreen from './src/screens/AgendaScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import MotivationOverlay from './src/components/MotivationOverlay';
import { computeLevelInfo } from './src/lib/gamification';

type Tab = 'agenda' | 'profile' | 'settings';

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'agenda', label: 'Ajanda', icon: '🗓️' },
  { key: 'profile', label: 'Mine', icon: '⭐' },
  { key: 'settings', label: 'Ayarlar', icon: '⚙️' },
];

function AppShell() {
  const [tab, setTab] = useState<Tab>('agenda');
  const { state, motivationEvent, clearMotivationEvent } = useApp();
  const level = computeLevelInfo(state.gamification.totalPoints).level;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenArea}>
        {tab === 'agenda' && <AgendaScreen />}
        {tab === 'profile' && <ProfileScreen />}
        {tab === 'settings' && <SettingsScreen />}
      </View>

      <View style={styles.tabBar}>
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <Pressable key={t.key} style={styles.tabItem} onPress={() => setTab(t.key)}>
              <Text style={[styles.tabIcon, active && styles.tabIconActive]}>{t.icon}</Text>
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{t.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <MotivationOverlay event={motivationEvent} level={level} onDismiss={clearMotivationEvent} />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FBF7FF',
  },
  screenArea: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EDE4FF',
    backgroundColor: 'white',
    paddingTop: 8,
    paddingBottom: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  tabIcon: {
    fontSize: 20,
    opacity: 0.5,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#7C3AED',
  },
});
