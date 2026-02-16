import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('@user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (email === 'teste@email.com' && password === '123456') {
        const userData = {
          id: '1',
          name: 'João Silva',
          email: email,
          phone: '(11) 99999-9999',
          address: 'Rua das Flores, 123 - São Paulo, SP'
        };
        setUser(userData);
        await AsyncStorage.setItem('@user', JSON.stringify(userData));
        return { success: true };
      }
      
      return { success: false, error: 'Email ou senha inválidos' };
    } catch (error) {
      return { success: false, error: 'Erro ao fazer login' };
    }
  };

  const register = async (name, email, phone, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (email === 'teste@email.com') {
        return { success: false, error: 'Este email já está cadastrado' };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro ao realizar cadastro' };
    }
  };

  // FUNÇÃO DE LOGOUT COMPLETA
  const logout = async () => {
    try {
      console.log('Iniciando logout...');
      
      // 1. Limpa o estado do usuário
      setUser(null);
      
      // 2. Remove dados do AsyncStorage
      await AsyncStorage.removeItem('@user');
      await AsyncStorage.removeItem('@cart');
      await AsyncStorage.removeItem('@restaurant');
      
      console.log('Logout realizado com sucesso!');
      return { success: true };
    } catch (error) {
      console.error('Erro no logout:', error);
      return { success: false, error: 'Erro ao sair da conta' };
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const newUserData = { ...user, ...updatedData };
      setUser(newUserData);
      await AsyncStorage.setItem('@user', JSON.stringify(newUserData));
      return { success: true };
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      return { success: false, error: 'Erro ao atualizar perfil' };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};