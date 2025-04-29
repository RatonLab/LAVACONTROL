import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function EstadisticaLavadosDiariosLavador() {
  // Datos de ejemplo
  const data = {
    labels: ['Juan', 'Pedro', 'María', 'Lucía', 'Carlos', 'Ana'],
    datasets: [
      {
        data: [5, 8, 4, 9, 6, 7],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`, // Azul
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,  // Negro
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#2196F3',
    },
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lavados Diarios por Lavador</Text>
      <BarChart
        style={styles.chart}
        data={data}
        width={screenWidth - 32} // Ajuste al ancho de pantalla
        height={320}
        yAxisLabel=""
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        fromZero={true}
        showValuesOnTopOfBars={true}
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
