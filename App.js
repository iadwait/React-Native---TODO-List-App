import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './src/components/Tasks'
import React, {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react'

export default function App() {

  useEffect(() => {
    retriveTasks()
  },[])

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss()
    console.log(task)
    const newTaskItems = [...taskItems, task]
    setTaskItems(newTaskItems)
    setTask(null)
    storeTaskLocally(newTaskItems)
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems]
    itemsCopy.splice(index, 1)
    setTaskItems(itemsCopy);
    storeTaskLocally(itemsCopy);
  }

  // Async Storage

  const storeTaskLocally = async (tasks) => {
    try {
      await AsyncStorage.removeItem('LocalTaskList')
      await AsyncStorage.setItem('LocalTaskList', JSON.stringify(tasks));
      console.log('Tasks has been stored locally')
    } catch (error) {
      Alert.alert('Error', 'There was error storing task locally')
    }
  }

  const retriveTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('LocalTaskList');

      if (storedTasks !== null) {
        const arrTasks = JSON.parse(storedTasks)
        setTaskItems(arrTasks)
        console.log('Tasks Fetched Success: ', arrTasks);
      }
    } catch (error) {
      Alert.alert('Error', 'Error occured while fetching taks locally')
    }
  }

  return (
    <View style={styles.container}>

      {/* Today's Task */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Task</Text>
        {/* Tasks View */}
        <View style={styles.items}>
          {
            taskItems.length > 0 ? (
              taskItems.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Task text={item} />
                  </TouchableOpacity>
                )
              })
            ) : (
                (
                  <View style={styles.noTaskContainer}>
                    <Text> No Taks Available </Text>
                  </View>
                )
            )
          }
        </View>
      </View>

      {/* Write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder="Write a Task..." onChangeText={setTask} value={task} />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
    paddingHorizontal: 20,
    flex: 1
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
    flex: 1
  },
  writeTaskWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 60 : 20
  },
  input: {
    paddingVertical: Platform.OS === 'ios' ? 15 : 0,
    height: Platform.OS === 'ios' ? 55 : 60,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "#C0C0C0",
    borderWidth: 1
  },
  addText: {
    fontSize: 30,
    color: 'black'
  },
  noTaskContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '80'
  }
});
