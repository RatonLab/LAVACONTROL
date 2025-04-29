import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function EstadisticaTiempoDiarioLavador() {
  // Datos de ejemplo
  const data = {
    labels: ['Juan', 'Pedro', 'María', 'Lucía', 'Carlos', 'Ana'],
    datasets: [
      {
        data: [18, 22, 16, 20, 25, 19], // Tiempo promedio en minutos
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Verde
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#4CAF50',
    },
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tiempo Promedio Diario por Lavador</Text>
      <BarChart
        data={data}
        width={screenWidth - 32}
        height={320}
        yAxisLabel=""
        yAxisSuffix=" min"
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        fromZero={true}
        showValuesOnTopOfBars={true}
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
    color: '#4CAF50',
  },
  chart: {
    borderRadius: 16,
    marginHorizontal: 16,
  },
});
