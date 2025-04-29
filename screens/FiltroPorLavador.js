// screens/FiltroPorLavador.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FiltroPorLavador() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🧼 Filtrar por Lavador (pendiente)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});
