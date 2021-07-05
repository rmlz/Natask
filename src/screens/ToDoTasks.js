import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {TaskListView} from '../components/Components';
import {Icon} from 'react-native-elements';
import {
  currentUser,
  getTasksOnFirebase,
  listenTasksOnFirestore,
} from '../services/FirebaseApi';

export default class ToDoTasks extends Component {
  _goToTasks() {
    this.props.navigation.navigate('Tarefa');
  }

  constructor(props) {
    super(props);
  }

  state = {
    tasks: [],
  };

  tasksListener;

  async getTasks() {
    const user = await currentUser()
      .then(res => res)
      .catch(err => err);
    this.tasksListener = (await listenTasksOnFirestore(user.uid)).onSnapshot(
      snapshot => {
        const data = snapshot.data();
        console.log('todo data is = ', data);
        if (data != undefined) {
          if (
            Object.keys(data).length === 0 ||
            data == undefined ||
            data == null
          ) {
            this.setState({tasks: []});
          } else {
            this.setState({
              tasks: data.itens.filter(
                item => item.isDone === false && item.flagex == false,
              ),
            });
          }
        }
      },
      error => console.log('ERROR DONE TASKS LISTENER FIREBASE'),
    );
  }

  componentDidMount() {
    this.setState({
      tasks: [],
    });
    const tasks = this.getTasks().then(res =>
      console.log('Tasks buscadas', res),
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TaskListView
          tasks={this.state.tasks}
          navigation={this.props.navigation}
        />
        <TouchableOpacity
          onPress={() => this._goToTasks()}
          style={styles.floatButton}>
          <Icon size={30} reverse name={'note'} />
        </TouchableOpacity>
      </View>
    );
  }
  componentWillUnmount() {
    try {
      this.tasksListener.unsubscribe();
    } catch (e) {
      console.log(e);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon: {
    width: 26,
    height: 26,
  },
  img: {
    width: 50,
    height: 50,
  },
  floatButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});
