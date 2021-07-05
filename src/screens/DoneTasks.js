import React, {Component} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {currentUser, listenTasksOnFirestore} from '../services/FirebaseApi';
import {TaskListView} from '../components/Components';

export default class DoneTasks extends Component {
  constructor(props) {
    super(props);
  }

  tasksListener;
  user;

  state = {
    tasks: [],
  };

  render() {
    return (
      <View style={styles.container}>
        <TaskListView
          tasks={this.state.tasks}
          navigation={this.props.navigation}
        />
      </View>
    );
  }

  async getTasks() {
    const user = await currentUser()
      .then(res => res)
      .catch(err => err);
    this.tasksListener = (await listenTasksOnFirestore(user.uid)).onSnapshot(
      snapshot => {
        const data = snapshot.data();
        console.log('DONE DATA', data);
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
                item => item.isDone === true && item.flagex == false,
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
});
