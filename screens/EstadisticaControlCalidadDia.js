import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function EstadisticaControlCalidadDia() {
  const data = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    datasets: [
      {
        data: [12, 15, 10, 18, 14, 9],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 87, 34, ${opacity})`, // Naranjo
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#FF5722',
    },
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Unidades Controladas por Día</Text>
      <BarChart
        data={data}
        width={screenWidth - 32}
        height={320}
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
    color: '#FF5722',
  },
  chart: {
    borderRadius: 16,
    marginHorizontal: 16,
  },
});
