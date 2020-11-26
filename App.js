import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { Navbar } from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'
import { THEME } from './src/theme'

const loadApplication = async () => {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [todoId, setTodoId] = useState(null)
  const [todos, setTodos] = useState([])

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={console.warn}
        onFinish={() => setIsReady(true)}
      />
    )
  }

  const addTodo = (title) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Date.now().toString(),
        title,
      },
    ])
  }

  const removeTodo = (id) => {
    const todo = todos.find((t) => t.id === id)

    Alert.alert(
      'Delete todo',
      `You are delete todo: ${todo.title}. Are you sure?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setTodoId(null)
            setTodos((prev) => prev.filter((item) => item.id !== id))
          },
        },
      ],
      { cancelable: false }
    )
  }

  const updateTodo = (id, title) => {
    setTodos((old) =>
      old.map((todo) => {
        if (todo.id === id) {
          todo.title = title
        }
        return todo
      })
    )
  }

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={setTodoId}
    />
  )

  if (todoId) {
    const selectTodo = todos.find((todo) => todo.id === todoId)
    content = (
      <TodoScreen
        todo={selectTodo}
        goBack={() => setTodoId(null)}
        onRemove={removeTodo}
        onSave={updateTodo}
      />
    )
  }

  return (
    <View>
      <Navbar title={'ToDo App'} />
      <View style={styles.container}>{content}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
})
