const React = require('react-native');
const {
  Component,
  PropTypes,
  View,
  ListView,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image
} = React;

const api = require('../utils/api');
const colors = require('../colors');
const Badge = require('./Badge');
const Seperator = require('../helpers/Seperator');

class Notes extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.notes),
      note: '',
      error: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderHeader={() => <Badge userInfo={this.props.userInfo}/>}/>
        {this.footer()}
      </View>
    );
  }

  renderRow(rowData) {
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text>{rowData}</Text>
        </View>
        <Seperator />
      </View>
    );
  }

  footer() {
    return (
      <View style={styles.footerContainer}>
        <TextInput
          style={styles.textInput}
          value={this.state.note}
          onChange={this.handleChange.bind(this)}
          placeholder='New Note' />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor={colors.red500}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }

  handleChange(ev) {
    this.setState({note: ev.nativeEvent.text})
  }

  handleSubmit() {
    const note = this.state.note;
    this.setState({note: ''});
    api.addNote(this.props.userInfo.login, note)
      .then(data => {
        this.setState({dataSource: this.ds.cloneWithRows(data)})
      })
      .catch(error => {
        console.error(error);
        this.setState({error})
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    textAlign: 'center',
    color: '#FFF'
  },
  footerContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  textInput: {
    flex: 1,
    height: 60,
    backgroundColor: colors.grey200,
    paddingLeft: 10,
    paddingRight: 10
  },
  rowContainer: {
    padding: 15
  },
  image: {
    height: 350
  },
  button: {
    backgroundColor: colors.lightgreen500,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    alignSelf: 'center'
  }
});

Notes.propTypes = {
  userInfo: PropTypes.object.isRequired,
  notes: PropTypes.object.isRequired
};

module.exports = Notes;
