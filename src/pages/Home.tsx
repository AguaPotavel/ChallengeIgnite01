import React, { useState } from "react"
import { StyleSheet, View, Alert } from "react-native"

import { Header } from "../components/Header"
import { Task, TasksList } from "../components/TasksList"
import { TodoInput } from "../components/TodoInput"

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleAddTask(newTaskTitle: string) {
    var match = tasks.filter(function (el: Task) {
      if (el.title === newTaskTitle) {
        return el
      }
    })

    if (match.length > 0) {
      Alert.alert(
        "Opa opa",
        "Você não pode cadastrar duas vezes a mesma task",
        [
          {
            text: "Ok"
          }
        ]
      )
    } else {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, title: newTaskTitle, done: false }
      ])
    }
  }

  function handleToggleTaskDone(id: number) {
    let newTasksList = tasks
    var match = newTasksList.filter(function (el: Task) {
      if (el.id === id) {
        el.done = !el.done
      }
      return el
    })
    setTasks(match)
  }

  function handleRemoveTask(id: number) {
    let newTasksList: Task[] = []
    Alert.alert("Remover item", "Você tem certeza que quer apagar este item?", [
      {
        text: "Sim",
        onPress: () => {
          tasks.filter(function (el: Task) {
            if (el.id !== id) {
              newTasksList.push(el)
            }
          })
          setTasks(newTasksList)
        }
      },
      {
        text: "Não"
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB"
  }
})
