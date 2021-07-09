import React, { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Alert
} from "react-native"
import { ItemWrapper } from "./ItemWrapper"
import { Task } from "./TasksList"

import Icon from "react-native-vector-icons/Feather"
import IconsAction from "react-native-vector-icons/AntDesign"
// import editIcon from "../assets/icons/edit/edit.png"
// import closeIcon from "../assets/icons/close/close.png"
import trashIcon from "../assets/icons/trash/trash.png"

interface TaskItemProps {
  component: Task
  index: number
  toggleTaskDone: (id: number) => void
  removeTask: (id: number) => void
}

export function TaskItem({
  toggleTaskDone,
  removeTask,
  component,
  index
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(component.title)
  const [newTitle, setNewTitle] = useState(component.title)

  function handleCancelEdit() {
    setIsEditing(false)
    setNewTitle(oldTitle => title)
    setTitle(oldTitle => oldTitle)
  }

  function tryEdit() {
    if (component.done === true) {
      Alert.alert("Pera lá", "Você não pode editar uma task concluida", [
        {
          text: "Ok"
        }
      ])
    } else {
      setIsEditing(true)
    }
  }

  function handleConfirmChange() {
    setTitle(newTitle)
    setIsEditing(false)
  }

  return (
    <ItemWrapper index={index}>
      <View style={styles.informationContainer}>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => {
            isEditing === false && toggleTaskDone(component.id)
          }}
        >
          <View
            testID={`marker-${index}`}
            style={component.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {component.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          {isEditing !== true ? (
            <Text
              style={component.done ? styles.taskTextDone : styles.taskText}
            >
              {title}
            </Text>
          ) : (
            <TextInput
              style={
                component.done ? styles.taskTextDone : styles.taskTextInput
              }
              placeholder="Adicionar novo todo..."
              placeholderTextColor="#B2B2B2"
              returnKeyType="send"
              selectionColor="#666666"
              autoFocus={isEditing}
              value={newTitle}
              onChangeText={setNewTitle}
              onSubmitEditing={handleConfirmChange}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          testID={`edit-${index}`}
          style={[
            {
              paddingHorizontal: 14,
              borderRightWidth: 1,
              borderRightColor: "#dcdcdc"
            }
          ]}
          onPress={() => {
            isEditing ? handleCancelEdit() : tryEdit()
          }}
        >
          {isEditing ? (
            <IconsAction name="close" size={22} color="#B2B2B2" />
          ) : (
            <IconsAction name="edit" size={22} color="#B2B2B2" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 14 }}
          onPress={() => {
            isEditing === false && removeTask(component.id)
          }}
        >
          <Image
            style={isEditing ? styles.iconDisabled : styles.iconNormal}
            resizeMode={"contain"}
            source={trashIcon}
          />
        </TouchableOpacity>
      </View>
    </ItemWrapper>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center"
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
    marginVertical: 4
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
    marginVertical: 4
  },
  actionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  informationContainer: {
    display: "flex",
    flex: 1
  },
  iconDisabled: {
    opacity: 0.3,
    width: 24,
    height: 24
  },
  iconNormal: {
    opacity: 1,
    width: 24,
    height: 24
  },
  taskTextInput: {
    color: "#666",
    fontFamily: "Inter-Medium",
    display: "flex",
    flex: 1,
    padding: 0,
    margin: 0
  }
})
