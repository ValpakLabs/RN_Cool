var React = require('react-native');
var {
  Component,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  StatusBarIOS
} = React;

const colors = require('./app/colors');
const Main = require('./app/components/Main');

class RN_Cool extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          backButtonTitle: 'Back',
          title: 'Github Note Taker!!!!!',
          component: Main
        }}/>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.red500
  }
});

AppRegistry.registerComponent('RN_Cool', () => RN_Cool);
