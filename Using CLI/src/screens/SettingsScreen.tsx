import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { createSettingsStyles } from '../assets/styles/settings.styles';
import DangerZone from '../components/DangerZone';
import Preferences from '../components/Preferences';
import ProgressStats from '../components/ProgressStats';
import useTheme from '../hooks/useTheme';

export default function SettingsScreen() {
  const { colors } = useTheme();
  const styles = createSettingsStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <LinearGradient colors={colors.gradients.primary} style={styles.iconContainer}>
              <Ionicons name="settings" size={28} color="#ffffff" />
            </LinearGradient>
            <Text style={styles.title}>Settings</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <ProgressStats />
          <Preferences />
          <DangerZone />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
