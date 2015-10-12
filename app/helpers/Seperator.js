const React = require('react-native');
const colors = require('../colors');

const {
  Component,
  PropTypes,
  View,
  StyleSheet,
} = React;

const styles = StyleSheet.create({
  seperator: {
    height: 1,
    backgroundColor: colors.grey200,
    flex: 1,
    marginLeft: 15
  }
});

class Seperator extends Component {
  render() {
    return (
      <View style={styles.seperator}></View>
    );
  }
}

Seperator.propTypes = {

}

module.exports = Seperator;
