// screens/EstadisticaTopNoConformidadesMes.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EstadisticaTopNoConformidadesMes() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Top No Conformidades del Mes</Text>
      <Text style={styles.subtitle}>(En construcción... 🚧)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F9FF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
});
