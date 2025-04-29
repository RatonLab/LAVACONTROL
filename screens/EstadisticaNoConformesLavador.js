import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function EstadisticaNoConformesLavador() {
  const data = {
    labels: ['Juan', 'Pedro', 'María', 'Lucía', 'Carlos'],
    datasets: [
      {
        data: [15, 10, 8, 5, 12], // Porcentaje de unidades no conformes
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
      <Text style={styles.title}>% No Conformes por Lavador</Text>
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
