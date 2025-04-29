import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function EstadisticaTopNoConformidadesMes() {
  const data = {
    labels: ['Vidrios sucios', 'Llantas sucias', 'Maletero sucio', 'Interior sucio', 'Motor no lavado'],
    datasets: [
      {
        data: [18, 15, 12, 10, 8], // Repeticiones
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`, // Azul
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Top 5 No Conformidades del Mes</Text>
      <BarChart
        data={data}
        width={screenWidth - 32}
        height={320}
        yAxisSuffix=""
        chartConfig={chartConfig}
        fromZero
        verticalLabelRotation={30}
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
    color: '#2196F3',
  },
  chart: {
    marginHorizontal: 16,
    borderRadius: 16,
  },
});
