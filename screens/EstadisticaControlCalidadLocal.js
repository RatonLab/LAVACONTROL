import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function EstadisticaControlCalidadLocal() {
  const data = [
    {
      name: 'Local 1',
      cantidad: 120,
      color: '#4CAF50',
      legendFontColor: '#333',
      legendFontSize: 15,
    },
    {
      name: 'Local 2',
      cantidad: 90,
      color: '#2196F3',
      legendFontColor: '#333',
      legendFontSize: 15,
    },
    {
      name: 'Local 3',
      cantidad: 60,
      color: '#FF9800',
      legendFontColor: '#333',
      legendFontSize: 15,
    },
    {
      name: 'Local 4',
      cantidad: 45,
      color: '#F44336',
      legendFontColor: '#333',
      legendFontSize: 15,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Unidades Controladas por Local</Text>
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
    color: '#4CAF50',
  },
  chart: {
    marginHorizontal: 16,
    borderRadius: 16,
  },
});
