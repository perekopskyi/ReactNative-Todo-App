import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AppTextBold } from '../components/ui/AppTextBold'

export const Todo = ({ todo: { id, title }, onRemove, onOpen }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={() => onOpen(id)}
      onLongPress={onRemove.bind(null, id)}
    >
      <View style={styles.todo}>
        <AppTextBold style={styles.title}>{title}</AppTextBold>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 10,
  },
})
