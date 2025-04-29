import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EstadisticaControlCalidadMes() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unidades Controladas por Mes</Text>
      <Text style={styles.subtitle}>Aquí irá el reporte mensual de unidades controladas.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2196F3', marginBottom: 20 },
  subtitle: { fontSize: 16, color: '#555' },
});
