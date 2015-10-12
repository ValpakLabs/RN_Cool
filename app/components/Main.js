const React = require('react-native');
const {
  Component,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

const api = require('../utils/api');
const colors = require('../colors');
const Dashboard = require('./Dashboard');

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoading: false,
      error: false
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.searchInputWrapper}>
        <Text style={styles.title}>Search for a Github User</Text>
          <TextInput
            placeholder='username'
            style={styles.searchInput}
            value={this.state.username}
            onChange={this.handleChange.bind(this)} />
        </View>
        {this.state.error && <Text>{this.state.error}</Text>}
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor={colors.lightgreen600}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableHighlight>
      </View>
    );
  }

  handleChange(ev) {
    this.setState({username: ev.nativeEvent.text});
  }

  handleSubmit(ev) {
    this.setState({isLoading: true});
    api.getBio(this.state.username)
      .then(res => {
        if (res.message === 'Not Found') {
          this.setState({
            error: 'User not found.',
            isLoading: false
          });
        } else {
          console.log(this.props.navigator);
          this.props.navigator.push({
            name: res.name || 'Select an Option',
            component: Dashboard,
            passProps: {userInfo: res},
            index: 1
          });
          this.setState({
            isLoading: false,
            error: false,
            username: ''
          });
        }
      })
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 0,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.grey50
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    textAlign: 'center',
    color: colors.bluegrey800
  },
  searchInputWrapper: {
    marginTop: 30,
    marginRight: 20,
    marginLeft: 20,
    borderBottomColor: colors.bluegrey100,
    borderBottomWidth: 1,
  },
  searchInput: {
    borderColor: colors.bluegrey500,
    textAlign: 'center',
    color: '#000',
    height: 36,
    fontSize: 18
  },
  button: {
    height: 60,
    backgroundColor: colors.lightgreen500,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    alignSelf: 'center'
  }
});

module.exports = Main;
