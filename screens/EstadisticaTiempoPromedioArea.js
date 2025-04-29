import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatsTimeByArea() {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>📊 Estadísticas: Tiempo Promedio por Área</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 }
});
