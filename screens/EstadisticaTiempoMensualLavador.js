import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function EstadisticaTiempoMensualLavador() {
  // Datos de ejemplo
  const data = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        data: [22, 20, 25, 23, 24, 21], // Tiempo promedio en minutos
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Verde
        strokeWidth: 2,
      },
      {
        data: [18, 19, 22, 20, 21, 19],
        color: (opacity = 1) => `rgba(255, 152, 0, ${opacity})`, // Naranjo
        strokeWidth: 2,
      },
    ],
    legend: ['Juan', 'Pedro'],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: '#4CAF50',
    },
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tiempo Promedio Mensual por Lavador</Text>
      <LineChart
        data={data}
        width={screenWidth - 32}
        height={320}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        fromZero
        verticalLabelRotation={20}
        yAxisSuffix=" min"
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
    color: '#4CAF50',
  },
  chart: {
    borderRadius: 16,
    marginHorizontal: 16,
  },
});
