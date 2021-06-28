import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';

export default class ToDoTasks extends Component {
  _goToTasks() {
    this.props.navigation.navigate('Task');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this._goToTasks()}
          style={styles.floatButton}>
          <Icon size={30}reverse name={'note'} />
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
