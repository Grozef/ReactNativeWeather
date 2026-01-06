import { StyleSheet, View, Text, Image } from 'react-native';

export default function CurrentWeather({ data }) {
  const { name, main, weather, wind } = data;
  const weatherInfo = weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo.icon}@4x.png`;

  return (
    <View style={styles.container}>
      <Text style={styles.cityName}>{name}</Text>
      
      <View style={styles.mainInfo}>
        <Image 
          source={{ uri: iconUrl }} 
          style={styles.weatherIcon}
        />
        <Text style={styles.temperature}>{Math.round(main.temp)}°C</Text>
      </View>

      <Text style={styles.description}>
        {weatherInfo.description.charAt(0).toUpperCase() + weatherInfo.description.slice(1)}
      </Text>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Ressenti</Text>
          <Text style={styles.detailValue}>{Math.round(main.feels_like)}°C</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Humidité</Text>
          <Text style={styles.detailValue}>{main.humidity}%</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Vent</Text>
          <Text style={styles.detailValue}>{Math.round(wind.speed * 3.6)} km/h</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: '#16213e',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  cityName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  mainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherIcon: {
    width: 120,
    height: 120,
  },
  temperature: {
    fontSize: 64,
    fontWeight: '300',
    color: '#ffffff',
  },
  description: {
    fontSize: 20,
    color: '#a0a0a0',
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  detailItem: {
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
});
