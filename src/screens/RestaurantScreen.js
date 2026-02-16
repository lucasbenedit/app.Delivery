import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../contexts/CartContext';
import FoodCard from '../components/FoodCard';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 300;

export default function RestaurantScreen({ route, navigation }) {
  const restaurant = route.params;
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(restaurant.categories[0]);
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [HEADER_HEIGHT, 150],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2, HEADER_HEIGHT],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const filteredItems = restaurant.items.filter(
    item => item.category === selectedCategory
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryTab,
        selectedCategory === item && styles.categoryTabActive
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryTabText,
          selectedCategory === item && styles.categoryTabTextActive
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#EA1D2C" />
      
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Animated.Image
          source={{ uri: restaurant.coverImage }}
          style={[styles.coverImage, { opacity: headerOpacity }]}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <Animated.View style={[styles.headerInfo, { opacity: headerOpacity }]}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <View style={styles.infoRow}>
            <View style={styles.rating}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{restaurant.rating}</Text>
              <Text style={styles.reviews}>({restaurant.reviews})</Text>
            </View>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.deliveryTime}>{restaurant.deliveryTime} min</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.deliveryFee}>
              R$ {restaurant.deliveryFee.toFixed(2)}
            </Text>
          </View>
        </Animated.View>
      </Animated.View>

      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={restaurant.categories}
          renderItem={renderCategory}
          keyExtractor={item => item}
        />
      </View>

      <Animated.FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <FoodCard item={item} onAddToCart={() => addToCart(item, restaurant)} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.itemsList}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  headerInfo: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  restaurantName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    color: '#fff',
    fontWeight: 'bold',
  },
  reviews: {
    marginLeft: 4,
    color: '#fff',
    opacity: 0.9,
  },
  dot: {
    marginHorizontal: 8,
    color: '#fff',
    fontSize: 16,
  },
  deliveryTime: {
    color: '#fff',
  },
  deliveryFee: {
    color: '#fff',
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  categoryTabActive: {
    backgroundColor: '#EA1D2C',
  },
  categoryTabText: {
    fontSize: 14,
    color: '#666',
  },
  categoryTabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  itemsList: {
    padding: 16,
  },
});