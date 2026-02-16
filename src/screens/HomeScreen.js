import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { restaurants, categories } from '../data/mockData';
import RestaurantCard from '../components/RestaurantCard';
import CategoryButton from '../components/CategoryButton';
import SearchBar from '../components/SearchBar';
import { useCart } from '../contexts/CartContext';

export default function HomeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchText, setSearchText] = useState('');
  const { getTotalItems } = useCart();

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesCategory = selectedCategory === 'Todos' || restaurant.category === selectedCategory;
    const matchesSearch = restaurant.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartItemsCount = getTotalItems();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#EA1D2C" />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, João! 👋</Text>
          <Text style={styles.subtitle}>O que você quer comer hoje?</Text>
        </View>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('CartTab')}
        >
          <Ionicons name="cart-outline" size={24} color="#fff" />
          {cartItemsCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItemsCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <SearchBar value={searchText} onChangeText={setSearchText} />

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        <CategoryButton
          title="Todos"
          selected={selectedCategory === 'Todos'}
          onPress={() => setSelectedCategory('Todos')}
        />
        {categories.map(cat => (
          <CategoryButton
            key={cat.id}
            title={cat.name}
            icon={cat.icon}
            selected={selectedCategory === cat.name}
            onPress={() => setSelectedCategory(cat.name)}
          />
        ))}
      </ScrollView>

      <FlatList
        data={filteredRestaurants}
        renderItem={({ item }) => (
          <RestaurantCard
            restaurant={item}
            onPress={() => navigation.navigate('Restaurant', item)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.restaurantsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#EA1D2C',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  cartButton: {
    padding: 8,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#EA1D2C',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: -10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  restaurantsList: {
    padding: 16,
  },
});