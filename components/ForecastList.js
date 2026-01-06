import { StyleSheet, View, Text, ScrollView } from 'react-native';
import ForecastItem from './ForecastItem';

export default function ForecastList({ data }) {
  const { list } = data;

  // Group forecasts by day
  const groupedByDay = {};
  list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' });
    
    if (!groupedByDay[dayKey]) {
      groupedByDay[dayKey] = [];
    }
    groupedByDay[dayKey].push(item);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prévisions sur 5 jours</Text>
      
      {Object.entries(groupedByDay).map(([day, items]) => (
        <View key={day} style={styles.dayContainer}>
          <Text style={styles.dayTitle}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {items.map((item) => (
              <ForecastItem key={item.dt} data={item} />
            ))}
          </ScrollView>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  dayContainer: {
    marginBottom: 20,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5e60ce',
    marginBottom: 10,
  },
  horizontalScroll: {
    flexDirection: 'row',
  },
});
