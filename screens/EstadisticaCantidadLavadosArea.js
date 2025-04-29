import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function EstadisticaCantidadLavadosArea() {
  const data = [
    {
      name: 'Mecánica',
      cantidad: 30,
      color: '#2196F3',
      legendFontColor: '#333',
      legendFontSize: 15,
    },
    {
      name: 'Desabolladura',
      cantidad: 20,
      color: '#FF9800',
      legendFontColor: '#333',
      legendFontSize: 15,
    },
    {
      name: 'Ventas',
      cantidad: 15,
      color: '#9C27B0',
      legendFontColor: '#333',
      legendFontSize: 15,
    },
    {
      name: 'Rentacar',
      cantidad: 25,
      color: '#4CAF50',
      legendFontColor: '#333',
      legendFontSize: 15,
    },
    {
      name: 'Lavado',
      cantidad: 10,
      color: '#F44336',
      legendFontColor: '#333',
      legendFontSize: 15,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cantidad de Vehículos Lavados por Área</Text>
      <PieChart
        data={data}
        width={screenWidth - 32}
        height={320}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="cantidad"
        backgroundColor="transparent"
        paddingLeft="16"
        absolute
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
