var React = require('react-native');
const colors = require('../colors');

const {
  Component,
  PropTypes,
  Text,
  Image,
  View,
  StyleSheet
} = React;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bluegrey800,
    paddingTop: 20,
    paddingBottom: 20
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    marginBottom: 10,
    alignSelf: 'center'
  },
  name: {
    color: colors.white,
    fontSize: 24,
    alignSelf: 'center'
  },
  handle: {
    color: colors.white,
    alignSelf: 'center'
  }
});

class Badge extends Component {

  render() {
    console.log(this.props)
    const {userInfo} = this.props;
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: userInfo.avatar_url}} />
        <Text style={styles.name}>{userInfo.name}</Text>
        <Text style={styles.handle}>{userInfo.login}</Text>
      </View>
    );
  }
}

Badge.propTypes = {
  userInfo: PropTypes.object.isRequired
};

module.exports = Badge;
