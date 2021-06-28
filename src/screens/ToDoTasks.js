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
import {currentUser, getTasksOnFirebase} from '../services/FirebaseApi';

export default class ToDoTasks extends Component {
  _goToTasks() {
    this.props.navigation.navigate('Task');
  }

  state = {
    tasks: [],
  };

  async getTasks() {
    const user = await currentUser()
      .then(res => res)
      .catch(err => err);
    const tasks = await getTasksOnFirebase(user.uid).then(res => res);
    return tasks;
  }

  componentDidMount() {
    const tasks = this.getTasks().then(res => {
      this.setState({
        tasks: res.itens,
      });
      console.log(this.state.tasks, 'states');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TaskListView tasks={this.state.tasks} />
        <TouchableOpacity
          onPress={() => this._goToTasks()}
          style={styles.floatButton}>
          <Icon size={30} reverse name={'note'} />
        </TouchableOpacity>
      </View>
    );
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
