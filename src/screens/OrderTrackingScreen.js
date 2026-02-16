import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OrderTrackingScreen({ route, navigation }) {
  const { orderId } = route.params;
  const [status, setStatus] = useState('preparando');
  const [timeRemaining, setTimeRemaining] = useState(30);

  useEffect(() => {
    // Simular atualização de status do pedido
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setStatus('entregue');
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 60000); // Atualizar a cada minuto

    return () => clearInterval(timer);
  }, []);

  const getStatusIcon = (statusName) => {
    switch (statusName) {
      case 'confirmado':
        return 'checkmark-circle';
      case 'preparando':
        return 'restaurant';
      case 'saiu':
        return 'bicycle';
      case 'entregue':
        return 'home';
      default:
        return 'time';
    }
  };

  const getStatusColor = (statusName) => {
    switch (statusName) {
      case 'confirmado':
        return '#4CAF50';
      case 'preparando':
        return '#FF9800';
      case 'saiu':
        return '#2196F3';
      case 'entregue':
        return '#9C27B0';
      default:
        return '#999';
    }
  };

  const steps = [
    { id: 'confirmado', label: 'Pedido confirmado', time: '19:30' },
    { id: 'preparando', label: 'Preparando', time: '19:35' },
    { id: 'saiu', label: 'Saiu para entrega', time: '19:50' },
    { id: 'entregue', label: 'Entregue', time: '20:15' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Acompanhar Pedido</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.orderInfo}>
        <Text style={styles.orderId}>Pedido #{orderId}</Text>
        <Text style={styles.restaurantName}>Pizza Suprema</Text>
      </View>

      <View style={styles.trackingContainer}>
        {steps.map((step, index) => {
          const isComplete = steps.findIndex(s => s.id === status) >= index;
          const isCurrent = step.id === status;

          return (
            <View key={step.id} style={styles.stepContainer}>
              <View style={styles.stepLeft}>
                <View
                  style={[
                    styles.stepIcon,
                    isComplete && styles.stepIconComplete,
                    isCurrent && styles.stepIconCurrent
                  ]}
                >
                  <Ionicons
                    name={getStatusIcon(step.id)}
                    size={20}
                    color={isComplete ? '#fff' : '#999'}
                  />
                </View>
                {index < steps.length - 1 && (
                  <View
                    style={[
                      styles.stepLine,
                      isComplete && styles.stepLineComplete
                    ]}
                  />
                )}
              </View>

              <View style={styles.stepContent}>
                <Text
                  style={[
                    styles.stepLabel,
                    isComplete && styles.stepLabelComplete
                  ]}
                >
                  {step.label}
                </Text>
                <Text style={styles.stepTime}>{step.time}</Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.deliveryInfo}>
        <Text style={styles.deliveryTitle}>Tempo estimado</Text>
        <Text style={styles.deliveryTime}>
          {timeRemaining} minutos
        </Text>
      </View>

      {status === 'entregue' && (
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTitle}>Avalie seu pedido</Text>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity key={star}>
                <Ionicons name="star-outline" size={32} color="#FFD700" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderInfo: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  orderId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  trackingContainer: {
    padding: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepLeft: {
    alignItems: 'center',
    marginRight: 15,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  stepIconComplete: {
    backgroundColor: '#4CAF50',
  },
  stepIconCurrent: {
    backgroundColor: '#EA1D2C',
  },
  stepLine: {
    width: 2,
    height: 30,
    backgroundColor: '#f0f0f0',
    marginTop: 5,
  },
  stepLineComplete: {
    backgroundColor: '#4CAF50',
  },
  stepContent: {
    flex: 1,
    justifyContent: 'center',
  },
  stepLabel: {
    fontSize: 16,
    color: '#999',
    marginBottom: 2,
  },
  stepLabelComplete: {
    color: '#333',
    fontWeight: '500',
  },
  stepTime: {
    fontSize: 14,
    color: '#666',
  },
  deliveryInfo: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    alignItems: 'center',
  },
  deliveryTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  deliveryTime: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#EA1D2C',
  },
  ratingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  stars: {
    flexDirection: 'row',
    gap: 10,
  },
});