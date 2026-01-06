import { StyleSheet, View, Text, ActivityIndicator, Pressable } from 'react-native';

export default function Loader({ message, isError = false, onRetry }) {
  return (
    <View style={styles.container}>
      {!isError && (
        <ActivityIndicator size="large" color="#5e60ce" style={styles.spinner} />
      )}
      
      <Text style={[styles.message, isError && styles.errorMessage]}>
        {message}
      </Text>

      {isError && onRetry && (
        <Pressable
          style={({ pressed }) => [
            styles.retryButton,
            pressed && styles.pressed,
          ]}
          onPress={onRetry}
        >
          <Text style={styles.retryText}>Réessayer</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  spinner: {
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  errorMessage: {
    color: '#ff6b6b',
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#5e60ce',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  retryText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
