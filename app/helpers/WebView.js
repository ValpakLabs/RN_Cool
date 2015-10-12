const React = require('react-native');
const colors = require('../colors');

const {
  Component,
  PropTypes,
  View,
  WebView,
  StyleSheet
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey500,
    flexDirection: 'column'
  }
});

class Web_View extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView url={this.props.url} />
      </View>
    );
  }
}

Web_View.propTypes = {
  url: PropTypes.string.isRequired
}

module.exports = Web_View;
