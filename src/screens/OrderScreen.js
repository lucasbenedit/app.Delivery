import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native';
import { useCart } from '../contexts/CartContext';

export default function OrderScreen({ navigation }) {
  const { cartItems, restaurant, getTotal, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('money');
  const [observation, setObservation] = useState('');

  const handleFinishOrder = () => {
    if (!address.trim()) {
      Alert.alert('Erro', 'Por favor, informe o endereço de entrega');
      return;
    }

    Alert.alert(
      'Pedido realizado!',
      'Seu pedido foi enviado com sucesso!',
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            navigation.navigate('HomeTab');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{restaurant?.name}</Text>
            {cartItems.map(item => (
              <View key={item.id} style={styles.orderItem}>
                <Text style={styles.orderItemName}>
                  {item.quantity}x {item.name}
                </Text>
                <Text style={styles.orderItemPrice}>
                  R$ {(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
            <View style={styles.divider} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>R$ {getTotal().toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Taxa de entrega</Text>
              <Text style={styles.totalValue}>R$ {restaurant?.deliveryFee?.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.finalTotal}>
                R$ {(getTotal() + (restaurant?.deliveryFee || 0)).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endereço de Entrega</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu endereço completo"
            value={address}
            onChangeText={setAddress}
            multiline
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
          <View style={styles.paymentOptions}>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === 'money' && styles.selectedPayment
              ]}
              onPress={() => setPaymentMethod('money')}
            >
              <Text style={[
                styles.paymentText,
                paymentMethod === 'money' && styles.selectedPaymentText
              ]}>Dinheiro</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === 'credit' && styles.selectedPayment
              ]}
              onPress={() => setPaymentMethod('credit')}
            >
              <Text style={[
                styles.paymentText,
                paymentMethod === 'credit' && styles.selectedPaymentText
              ]}>Crédito</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === 'debit' && styles.selectedPayment
              ]}
              onPress={() => setPaymentMethod('debit')}
            >
              <Text style={[
                styles.paymentText,
                paymentMethod === 'debit' && styles.selectedPaymentText
              ]}>Débito</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Observações</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Alguma observação? (ex: ponto do hambúrguer, tirar cebola...)"
            value={observation}
            onChangeText={setObservation}
            multiline
            numberOfLines={3}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.finishButton}
          onPress={handleFinishOrder}
        >
          <Text style={styles.finishButtonText}>Finalizar Pedido</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  restaurantInfo: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  orderItemName: {
    fontSize: 14,
    color: '#666',
  },
  orderItemPrice: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalValue: {
    fontSize: 14,
  },
  finalTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  paymentOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedPayment: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  paymentText: {
    fontSize: 14,
    color: '#666',
  },
  selectedPaymentText: {
    color: '#fff',
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  finishButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});