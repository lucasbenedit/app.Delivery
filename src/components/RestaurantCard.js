import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RestaurantCard({ restaurant, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{restaurant.name}</Text>
        
        <View style={styles.details}>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{restaurant.rating}</Text>
            <Text style={styles.reviews}>({restaurant.reviews})</Text>
          </View>
          
          <View style={styles.delivery}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.deliveryText}>{restaurant.deliveryTime} min</Text>
          </View>
          
          <View style={styles.delivery}>
            <Ionicons name="bicycle-outline" size={14} color="#666" />
            <Text style={styles.deliveryText}>
              {restaurant.deliveryFee > 0 ? `R$ ${restaurant.deliveryFee}` : 'Grátis'}
            </Text>
          </View>
        </View>

        <Text style={styles.category}>{restaurant.category}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  ratingText: {
    marginLeft: 4,
    color: '#666',
    fontWeight: 'bold',
  },
  reviews: {
    marginLeft: 4,
    color: '#999',
    fontSize: 12,
  },
  delivery: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  deliveryText: {
    marginLeft: 4,
    color: '#666',
  },
  category: {
    color: '#999',
    fontSize: 14,
  },
});