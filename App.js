import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './src/components/Tasks'
import React, {useState} from 'react'

export default function App() {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    console.log(task)
    setTaskItems([...taskItems, task])
    setTask(null)
  }

  return (
    <View style={styles.container}>

      {/* Today's Task */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Task</Text>
        {/* Tasks View */}
        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return <Task key={index} text={item} />
            })
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
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30
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
  addText: {},
});
