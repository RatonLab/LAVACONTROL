import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function EstadisticaControlCalidadMes() {
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        data: [120, 135, 110, 145, 138, 125],
        color: (opacity = 1) => `rgba(255, 87, 34, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Unidades Controladas'],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 87, 34, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Unidades Controladas por Mes</Text>
      <LineChart
        data={data}
        width={screenWidth - 32}
        height={320}
        chartConfig={chartConfig}
        bezier
        fromZero
        style={styles.chart}
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
    color: '#FF5722',
  },
  chart: {
    marginHorizontal: 16,
    borderRadius: 16,
  },
});
