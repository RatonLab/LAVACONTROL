import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function EstadisticaNoConformesLocal() {
  const data = {
    labels: ['Local 1', 'Local 2', 'Local 3', 'Local 4'],
    datasets: [
      {
        data: [12, 9, 15, 8], // Porcentaje de no conformes
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`, // Rojo
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>% No Conformes por Local</Text>
      <BarChart
        data={data}
        width={screenWidth - 32}
        height={320}
        yAxisSuffix="%"
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
    color: '#F44336',
  },
  chart: {
    marginHorizontal: 16,
    borderRadius: 16,
  },
});
