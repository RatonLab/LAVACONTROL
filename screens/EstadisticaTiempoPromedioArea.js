import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function EstadisticaTiempoPromedioArea() {
  const data = {
    labels: ['Mecánica', 'Desabolladura', 'Ventas', 'Rentacar', 'Lavado'],
    datasets: [
      {
        data: [24, 30, 18, 20, 15], // Tiempo en minutos
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(156, 39, 176, ${opacity})`, // Púrpura
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: '#9C27B0',
    },
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tiempo Promedio por Área</Text>
      <BarChart
        data={data}
        width={screenWidth - 32}
        height={320}
        yAxisSuffix=" min"
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        fromZero
        showValuesOnTopOfBars
        style={styles.chart}
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
    color: '#9C27B0',
  },
  chart: {
    marginHorizontal: 16,
    borderRadius: 16,
  },
});
