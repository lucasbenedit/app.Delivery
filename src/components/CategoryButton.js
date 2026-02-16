import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CategoryButton({ title, icon, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, selected && styles.selectedButton]}
      onPress={onPress}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={20}
          color={selected ? '#fff' : '#666'}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, selected && styles.selectedText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  selectedButton: {
    backgroundColor: '#EA1D2C',
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: 14,
    color: '#666',
  },
  selectedText: {
    color: '#fff',
    fontWeight: '500',
  },
});