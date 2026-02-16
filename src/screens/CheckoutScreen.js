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
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function CheckoutScreen({ navigation }) {
  const { cartItems, restaurant, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [address, setAddress] = useState(user?.address || '');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [observation, setObservation] = useState('');
  const [loading, setLoading] = useState(false);

  const totals = getTotal();

  const handleFinishOrder = async () => {
    if (!address.trim()) {
      Alert.alert('Erro', 'Por favor, informe o endereço de entrega');
      return;
    }

    setLoading(true);

    // Simular processamento do pedido
    setTimeout(() => {
      setLoading(false);
      
      Alert.alert(
        'Pedido realizado! 🎉',
        'Seu pedido foi enviado para o restaurante',
        [
          {
            text: 'Acompanhar Pedido',
            onPress: () => {
              clearCart();
              navigation.navigate('HomeTab', {
                screen: 'OrderTracking',
                params: { orderId: Math.random().toString(36).substr(2, 9) }
              });
            }
          },
          {
            text: 'OK',
            onPress: () => {
              clearCart();
              navigation.navigate('HomeTab');
            }
          }
        ]
      );
    }, 2000);
  };

  const paymentMethods = [
    { id: 'credit', name: 'Cartão de Crédito', icon: 'card' },
    { id: 'debit', name: 'Cartão de Débito', icon: 'card' },
    { id: 'money', name: 'Dinheiro', icon: 'cash' },
    { id: 'pix', name: 'PIX', icon: 'qr-code' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endereço de Entrega</Text>
          <View style={styles.addressContainer}>
            <Ionicons name="location-outline" size={24} color="#EA1D2C" />
            <TextInput
              style={styles.addressInput}
              placeholder="Digite seu endereço completo"
              value={address}
              onChangeText={setAddress}
              multiline
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentOption,
                paymentMethod === method.id && styles.selectedPayment
              ]}
              onPress={() => setPaymentMethod(method.id)}
            >
              <View style={styles.paymentOptionLeft}>
                <Ionicons 
                  name={method.icon} 
                  size={24} 
                  color={paymentMethod === method.id ? '#fff' : '#666'} 
                />
                <Text style={[
                  styles.paymentOptionText,
                  paymentMethod === method.id && styles.selectedPaymentText
                ]}>
                  {method.name}
                </Text>
              </View>
              {paymentMethod === method.id && (
                <Ionicons name="checkmark-circle" size={24} color="#fff" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Observações</Text>
          <TextInput
            style={styles.observationInput}
            placeholder="Alguma observação? (ex: ponto da carne, tirar cebola...)"
            value={observation}
            onChangeText={setObservation}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
          <View style={styles.orderSummary}>
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
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>R$ {totals.items.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Taxa de entrega</Text>
              <Text style={styles.summaryValue}>R$ {totals.delivery.toFixed(2)}</Text>
            </View>
            
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>R$ {totals.total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerTotal}>
          <Text style={styles.footerTotalLabel}>Total</Text>
          <Text style={styles.footerTotalValue}>R$ {totals.total.toFixed(2)}</Text>
        </View>
        
        <TouchableOpacity
          style={[styles.finishButton, loading && styles.finishButtonDisabled]}
          onPress={handleFinishOrder}
          disabled={loading}
        >
          {loading ? (
            <Text style={styles.finishButtonText}>Processando...</Text>
          ) : (
            <>
              <Text style={styles.finishButtonText}>Finalizar Pedido</Text>
              <Ionicons name="checkmark-circle" size={24} color="#fff" />
            </>
          )}
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
    color: '#333',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  addressInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedPayment: {
    backgroundColor: '#EA1D2C',
    borderColor: '#EA1D2C',
  },
  paymentOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentOptionText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#666',
  },
  selectedPaymentText: {
    color: '#fff',
  },
  observationInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  orderSummary: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EA1D2C',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerTotal: {
    flex: 1,
  },
  footerTotalLabel: {
    fontSize: 14,
    color: '#666',
  },
  footerTotalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EA1D2C',
  },
  finishButton: {
    flex: 1,
    backgroundColor: '#EA1D2C',
    paddingVertical: 14,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishButtonDisabled: {
    opacity: 0.6,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});