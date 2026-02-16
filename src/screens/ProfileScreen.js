import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { orders } from '../data/mockData';

export default function ProfileScreen() {
  const { user, logout, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedPhone, setEditedPhone] = useState(user?.phone || '');
  const [editedAddress, setEditedAddress] = useState(user?.address || '');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Função para salvar edições do perfil
  const handleSave = async () => {
    setLoading(true);
    const updated = await updateProfile({
      name: editedName,
      phone: editedPhone,
      address: editedAddress
    });
    
    if (updated.success) {
      setEditing(false);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } else {
      Alert.alert('Erro', updated.error || 'Erro ao atualizar perfil');
    }
    setLoading(false);
  };

  // Função para abrir modal de confirmação de logout
  const openLogoutModal = () => {
    setModalVisible(true);
  };

  // Função para fechar modal
  const closeLogoutModal = () => {
    setModalVisible(false);
  };

  // FUNÇÃO DE LOGOUT COMPLETA
  const handleLogout = async () => {
    try {
      setModalVisible(false);
      setLoading(true);
      
      console.log('Iniciando processo de logout...');
      
      const result = await logout();
      
      if (result.success) {
        console.log('Logout realizado com sucesso!');
        // Não precisa de Alert aqui porque o usuário será redirecionado
      } else {
        Alert.alert('Erro', result.error || 'Não foi possível sair da conta');
      }
    } catch (error) {
      console.error('Erro inesperado no logout:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  // Função para cor do status do pedido
  const getStatusColor = (status) => {
    switch (status) {
      case 'entregue': return '#4CAF50';
      case 'preparando': return '#FF9800';
      case 'cancelado': return '#f44336';
      default: return '#666';
    }
  };

  // Loading screen
  if (loading && !modalVisible) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#EA1D2C" />
        <Text style={styles.loadingText}>Processando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER DO PERFIL */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={100} color="#fff" />
          </View>
          
          {editing ? (
            <TextInput
              style={styles.nameInput}
              value={editedName}
              onChangeText={setEditedName}
              placeholder="Seu nome"
              placeholderTextColor="#rgba(255,255,255,0.7)"
              editable={!loading}
            />
          ) : (
            <Text style={styles.name}>{user?.name}</Text>
          )}
          
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        {/* SEÇÃO DE INFORMAÇÕES PESSOAIS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>
            <TouchableOpacity 
              onPress={() => editing ? handleSave() : setEditing(true)}
              disabled={loading}
            >
              <Text style={styles.editButton}>
                {editing ? 'Salvar' : 'Editar'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Telefone */}
          <View style={styles.infoItem}>
            <Ionicons name="call-outline" size={20} color="#666" />
            {editing ? (
              <TextInput
                style={styles.infoInput}
                value={editedPhone}
                onChangeText={setEditedPhone}
                placeholder="Telefone"
                keyboardType="phone-pad"
                editable={!loading}
              />
            ) : (
              <Text style={styles.infoText}>{user?.phone}</Text>
            )}
          </View>

          {/* Endereço */}
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={20} color="#666" />
            {editing ? (
              <TextInput
                style={[styles.infoInput, styles.addressInput]}
                value={editedAddress}
                onChangeText={setEditedAddress}
                placeholder="Endereço"
                multiline
                editable={!loading}
              />
            ) : (
              <Text style={styles.infoText}>{user?.address || 'Não informado'}</Text>
            )}
          </View>
        </View>

        {/* SEÇÃO DE HISTÓRICO DE PEDIDOS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Histórico de Pedidos</Text>
          {orders.map(order => (
            <TouchableOpacity key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderRestaurant}>{order.restaurantName}</Text>
                <View style={[styles.orderStatus, { backgroundColor: getStatusColor(order.status) }]}>
                  <Text style={styles.orderStatusText}>{order.status}</Text>
                </View>
              </View>
              
              <Text style={styles.orderDate}>
                {new Date(order.date).toLocaleDateString('pt-BR')}
              </Text>
              
              <View style={styles.orderItems}>
                {order.items.map((item, index) => (
                  <Text key={index} style={styles.orderItem}>
                    {item.quantity}x {item.name}
                  </Text>
                ))}
              </View>
              
              <Text style={styles.orderTotal}>Total: R$ {order.total.toFixed(2)}</Text>
            </TouchableOpacity>
          ))}
        </View>

      {/* BOTÃO DE SAIR DA CONTA */}
<TouchableOpacity 
  style={[styles.logoutButton, loading && styles.logoutButtonDisabled]}
  onPress={openLogoutModal}
  disabled={loading}
>
  <Ionicons 
    name="log-out-outline" 
    size={24} 
    color={loading ? "#999" : "#ff4444"} 
  />
  <Text style={[styles.logoutText, loading && styles.logoutTextDisabled]}>
    Sair da conta
  </Text>
</TouchableOpacity>

        {/* Versão do App */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Versão 1.0.0</Text>
        </View>
      </ScrollView>

      {/* MODAL DE CONFIRMAÇÃO DE LOGOUT */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeLogoutModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Ícone do modal */}
            <View style={styles.modalIconContainer}>
              <Ionicons name="log-out-outline" size={60} color="#EA1D2C" />
            </View>
            
            {/* Título */}
            <Text style={styles.modalTitle}>Sair da Conta</Text>
            
            {/* Mensagem */}
            <Text style={styles.modalMessage}>
              Tem certeza que deseja sair da sua conta?
            </Text>
            
            {/* Botões */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={closeLogoutModal}
              >
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.modalConfirmButton]}
                onPress={handleLogout}
              >
                <Text style={styles.modalConfirmText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  // Estilos do Header
  header: {
    backgroundColor: '#EA1D2C',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarContainer: {
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  nameInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingBottom: 4,
    marginBottom: 4,
    minWidth: 200,
  },
  email: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  // Estilos das Seções
  section: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    color: '#EA1D2C',
    fontSize: 16,
    fontWeight: '600',
  },
  // Estilos dos Itens de Informação
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
    flex: 1,
  },
  infoInput: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 4,
  },
  addressInput: {
    minHeight: 40,
  },
  // Estilos dos Cards de Pedido
  orderCard: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderRestaurant: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  orderStatusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  orderItems: {
    marginBottom: 8,
  },
  orderItem: {
    fontSize: 14,
    color: '#666',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EA1D2C',
  },
  // ESTILOS DO BOTÃO DE SAIR
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 10,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonDisabled: {
    opacity: 0.5,
  },
  logoutText: {
    fontSize: 18,
    color: '#ff4444',
    marginLeft: 8,
    fontWeight: '600',
  },
  logoutTextDisabled: {
    color: '#999',
  },
  versionContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  versionText: {
    color: '#999',
    fontSize: 12,
  },
  // ESTILOS DO MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalIconContainer: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalCancelButton: {
    backgroundColor: '#f0f0f0',
  },
  modalConfirmButton: {
    backgroundColor: '#EA1D2C',
  },
  modalCancelText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  modalConfirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});