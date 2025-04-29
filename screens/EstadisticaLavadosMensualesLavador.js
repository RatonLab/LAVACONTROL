import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function EstadisticaLavadosMensualesLavador() {
  // Datos de ejemplo
  const data = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      {
        data: [20, 45, 28, 80],
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`, // Línea azul
        strokeWidth: 2,
      },
      {
        data: [30, 25, 48, 50],
        color: (opacity = 1) => `rgba(255, 152, 0, ${opacity})`, // Línea naranjo
        strokeWidth: 2,
      },
    ],
    legend: ['Juan', 'Pedro'],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#2196F3',
    },
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lavados Mensuales por Lavador</Text>
      <LineChart
        data={data}
        width={screenWidth - 32}
        height={320}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        fromZero
        verticalLabelRotation={20}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2196F3',
  },
  chart: {
    borderRadius: 16,
    marginHorizontal: 16,
  },
});
