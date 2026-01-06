import { StyleSheet, View, Text, Image } from 'react-native';

export default function ForecastItem({ data }) {
  const { dt, main, weather } = data;
  const weatherInfo = weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`;

  const date = new Date(dt * 1000);
  const time = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time}</Text>
      
      <Image 
        source={{ uri: iconUrl }} 
        style={styles.icon}
      />
      
      <Text style={styles.temp}>{Math.round(main.temp)}°C</Text>
      
      <Text style={styles.description} numberOfLines={1}>
        {weatherInfo.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#16213e',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 12,
    minWidth: 90,
  },
  time: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  icon: {
    width: 50,
    height: 50,
  },
  temp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    color: '#888',
    textAlign: 'center',
    maxWidth: 80,
  },
});
