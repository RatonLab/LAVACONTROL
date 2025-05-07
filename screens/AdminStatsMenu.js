import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AdminStatsMenu() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📊 Menú de Estadísticas</Text>

      {/* Lavados por Lavador */}
      <Text style={styles.sectionTitle}>Lavados por Lavador</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EstadisticaLavadosDiariosLavador')}>
        <Text style={styles.buttonText}>Lavados Diarios por Lavador</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EstadisticaLavadosMensualesLavador')}>
        <Text style={styles.buttonText}>Lavados Mensuales por Lavador</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EstadisticaTiempoDiarioLavador')}>
        <Text style={styles.buttonText}>Tiempo Promedio Diario por Lavador</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EstadisticaTiempoMensualLavador')}>
        <Text style={styles.buttonText}>Tiempo Promedio Mensual por Lavador</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EstadisticaCantidadLavadosPorLavador')}>
        <Text style={styles.buttonText}>Cantidad Total por Lavador</Text>
      </TouchableOpacity>

      {/* Lavados por Local / Área */}
      <Text style={styles.sectionTitle}>Lavados por Local / Área</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EstadisticaCantidadLavadosLocal')}>
        <Text style={styles.buttonText}>Cantidad Lavados por Local</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EstadisticaCantidadLavadosArea')}>
        <Text style={styles.buttonText}>Cantidad Lavados por Área</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EstadisticaTiempoPromedioArea')}>
        <Text style={styles.buttonText}>Tiempo Promedio de Lavado por Área</Text>
      </TouchableOpacity>

      {/* Control de Calidad */}
      <Text style={styles.sectionTitle}>Control de Calidad</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EstadisticaControlCalidadDia')}>
        <Text style={styles.buttonText}>Unidades Controladas por Día</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EstadisticaControlCalidadMes')}>
        <Text style={styles.buttonText}>Unidades Controladas por Mes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EstadisticaControlCalidadLocal')}>
        <Text style={styles.buttonText}>Unidades Controladas por Local</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EstadisticaNoConformesLavador')}>
        <Text style={styles.buttonText}>% No Conformes por Lavador</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EstadisticaNoConformesLocal')}>
        <Text style={styles.buttonText}>% No Conformes por Local</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EstadisticaTopNoConformidadesMes')}>
        <Text style={styles.buttonText}>Top No Conformidades del Mes</Text>
      </TouchableOpacity>

      {/* Botón volver */}
      <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>🔙 Volver al Menú Principal</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 20,
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
    alignSelf: 'flex-start'
  },
  button: {
    width: '100%',
    backgroundColor: '#E3F2FD',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#1E88E5',
    fontSize: 16,
    fontWeight: 'bold'
  },
  backButton: {
    backgroundColor: '#B0BEC5',
    marginTop: 20
  }
});
