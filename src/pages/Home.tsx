import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks([...tasks, {id: (tasks.length +1), title: newTaskTitle, done: false}])
    console.log(tasks)
  }

  function handleToggleTaskDone(id: number) {
    let newTasksList = tasks
    var match = newTasksList.filter(function (el:Task) {
      if(el.id === id){
        el.done = !el.done;
      }
      return el
    }
      );
    setTasks(match)
  }

  function handleRemoveTask(id: number) {
    let newTasksList:Task[] = []
    console.log('id', id)
    tasks.filter(function (el:Task) {
      if(el.id !== id){
        newTasksList.push(el)
      }});
    setTasks(newTasksList)
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
    backgroundColor: '#EBEBEB'
  }
})