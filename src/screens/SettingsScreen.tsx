import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { compareISO } from '../lib/dateUtils';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export default function SettingsScreen() {
  const { state, updateSettings, resetProgress } = useApp();
  const [childName, setChildName] = useState(state.settings.childName);
  const [startDate, setStartDate] = useState(state.settings.startDate);
  const [endDate, setEndDate] = useState(state.settings.endDate);

  const handleSave = () => {
    if (!childName.trim()) {
      Alert.alert('Eksik bilgi', 'Lütfen bir isim gir.');
      return;
    }
    if (!DATE_REGEX.test(startDate) || !DATE_REGEX.test(endDate)) {
      Alert.alert('Geçersiz tarih', 'Tarihleri YYYY-AA-GG biçiminde gir (ör. 2026-07-12).');
      return;
    }
    if (compareISO(startDate, endDate) >= 0) {
      Alert.alert('Geçersiz tarih aralığı', 'Bitiş tarihi başlangıçtan sonra olmalı.');
      return;
    }

    Alert.alert(
      'Ajandayı yeniden oluştur',
      'Tarih aralığını değiştirmek ajandayı sıfırdan oluşturur ve mevcut ilerleme sıfırlanır. Devam edilsin mi?',
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'Evet, oluştur',
          style: 'destructive',
          onPress: () => updateSettings({ childName: childName.trim(), startDate, endDate }),
        },
      ],
    );
  };

  const handleReset = () => {
    Alert.alert('İlerlemeyi sıfırla', 'Tüm puanlar ve tikler silinecek. Emin misin?', [
      { text: 'Vazgeç', style: 'cancel' },
      { text: 'Sıfırla', style: 'destructive', onPress: resetProgress },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionLabel}>Çocuğun adı</Text>
      <TextInput style={styles.input} value={childName} onChangeText={setChildName} placeholder="Mine" />

      <Text style={styles.sectionLabel}>Yaz başlangıcı</Text>
      <TextInput
        style={styles.input}
        value={startDate}
        onChangeText={setStartDate}
        placeholder="2026-07-12"
        autoCapitalize="none"
      />

      <Text style={styles.sectionLabel}>Yaz bitişi (okul öncesi)</Text>
      <TextInput
        style={styles.input}
        value={endDate}
        onChangeText={setEndDate}
        placeholder="2026-09-06"
        autoCapitalize="none"
      />

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Kaydet ve Ajandayı Oluştur</Text>
      </Pressable>

      <View style={styles.divider} />

      <Text style={styles.sectionLabel}>İlerleme</Text>
      <Text style={styles.helperText}>
        Tarihleri değiştirmeden sadece puan ve tikleri sıfırlamak istersen aşağıdaki butonu kullan.
      </Text>
      <Pressable style={styles.dangerButton} onPress={handleReset}>
        <Text style={styles.dangerButtonText}>İlerlemeyi Sıfırla</Text>
      </Pressable>
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
    paddingBottom: 40,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4C1D95',
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9D8FD',
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1F2937',
  },
  helperText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 22,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#EDE4FF',
    marginVertical: 20,
  },
  dangerButton: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F87171',
  },
  dangerButtonText: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 14,
  },
});
