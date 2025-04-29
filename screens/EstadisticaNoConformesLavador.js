import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EstadisticaNoConformesLavador() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>% No Conformes por Lavador</Text>
      <Text style={styles.subtitle}>Aquí irá el porcentaje de lavados no conformes por lavador.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2196F3', marginBottom: 20 },
  subtitle: { fontSize: 16, color: '#555' },
});
