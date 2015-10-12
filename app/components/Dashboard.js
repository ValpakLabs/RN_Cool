const React = require('react-native');
const {
  Component,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image
} = React;

const api = require('../utils/api');
const colors = require('../colors');
const Profile = require('./Profile');
const Repos = require('./Repos');
const Notes = require('./Notes');

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const {userInfo} = this.props;

    return (
      <View style={styles.mainContainer}>
        <Image source={{uri: userInfo.avatar_url}} style={styles.image}/>
        <TouchableHighlight
          style={this.getButtonStyle(0)}
          onPress={this.goToProfile.bind(this)}
          underlayColor={colors.lightblue800}>
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={this.getButtonStyle(1)}
          onPress={this.goToRepos.bind(this)}
          underlayColor={colors.lightblue800}>
          <Text style={styles.buttonText}>View Repos</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={this.getButtonStyle(2)}
          onPress={this.goToNotes.bind(this)}
          underlayColor={colors.lightblue800}>
          <Text style={styles.buttonText}>View Notes</Text>
        </TouchableHighlight>
      </View>
    );
  }

  goToProfile() {
    this.props.navigator.push({
      title: this.props.userInfo.name || 'Profile',
      component: Profile,
      passProps: {userInfo: this.props.userInfo}
    });
  }

  goToRepos() {
    api.getRepos(this.props.userInfo.login)
      .then(res => {
        this.props.navigator.push({
          title: 'Repos',
          component: Repos,
          passProps: {userInfo: this.props.userInfo, repos: res}
        });
      });
  }

  goToNotes() {
    api.getNotes('subpopular')
      .then(res => {
        this.props.navigator.push({
          title: 'Notes',
          component: Notes,
          passProps: {userInfo: this.props.userInfo, notes: res}
        });
      });
  }

  getButtonStyle(x) {
    let style = {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignSelf: 'stretch'
    };

    style.backgroundColor = {
      0: colors.lightblue500,
      1: colors.pink500,
      2: colors.lightgreen500
    }[x];

    return style;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.bluegrey800
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    textAlign: 'center',
    color: '#FFF'
  },
  image: {
    height: 350
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    alignSelf: 'center'
  }
});

module.exports = Dashboard;
