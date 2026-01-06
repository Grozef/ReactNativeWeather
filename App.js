import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import Loader from './components/Loader';

const API_KEY = '9a971ce1dc8fe614aa09980420e4c0a6';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export default function App() {
  const [location, setLocation] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLocationAndWeather();
  }, []);

  const getLocationAndWeather = async () => {
    try {
      setLoading(true);
      setError(null);

      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission de localisation refusée');
        setLoading(false);
        return;
      }

      // Get current position
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });

      // Fetch weather data
      await fetchWeatherData(latitude, longitude);
    } catch (err) {
      setError('Erreur lors de la récupération de la position');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      // Fetch current weather
      const currentResponse = await fetch(
        `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${API_KEY}`
      );
      const currentData = await currentResponse.json();

      if (currentData.cod !== 200) {
        throw new Error(currentData.message || 'Erreur API météo');
      }

      setCurrentWeather(currentData);

      // Fetch 5-day forecast (every 3 hours)
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${API_KEY}`
      );
      const forecastData = await forecastResponse.json();

      if (forecastData.cod !== '200') {
        throw new Error(forecastData.message || 'Erreur API prévisions');
      }

      setForecast(forecastData);
    } catch (err) {
      setError('Erreur lors de la récupération des données météo');
      console.error(err);
    }
  };

  if (loading) {
    return <Loader message="Chargement de la météo..." />;
  }

  if (error) {
    return <Loader message={error} isError={true} onRetry={getLocationAndWeather} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {currentWeather && (
          <CurrentWeather data={currentWeather} />
        )}

        {forecast && (
          <ForecastList data={forecast} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollView: {
    flex: 1,
  },
});
