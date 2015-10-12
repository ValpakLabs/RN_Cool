const React = require('react-native');
const colors = require('../colors');
const Web_View = require('../helpers/WebView')

const {
  Component,
  PropTypes,
  Text,
  Image,
  View,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
} = React;

const Badge = require('./Badge');
const Seperator = require('../helpers/Seperator');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    padding: 15
  },
  rowTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontSize: 20
  },
  stars: {

  },
  description: {
    marginTop: 5,
    fontSize: 14,
    color: colors.grey500
  }
});

class Repos extends Component {
  render() {
    const {userInfo, repos} = this.props;
    const list = repos.map((repo, i) => {
      console.log(repo)
      let desc = repo.description ? <Text style={styles.description}>{repo.description}</Text> : <View/>;
      return (
        <View key={i}>
          <View style={styles.rowContainer}>
            <View style={styles.rowTitle}>
              <TouchableHighlight
                onPress={this.openPage.bind(this, repo.html_url)}
                underlayColor={colors.white}>
                <Text style={styles.text}>{repo.name}</Text>
              </TouchableHighlight>
              <Text style={styles.stars}>Stars: {repo.stargazers_count}</Text>
            </View>
            {desc}
          </View>
          <Seperator />
        </View>
      );
    });

    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={userInfo}></Badge>
        {list}
      </ScrollView>
    );
  }

  openPage(url) {
    this.props.navigator.push({
      component: Web_View,
      title: 'Web View',
      passProps: {url}
    })
  }
}

Repos.propTypes = {
  userInfo: PropTypes.object.isRequired,
  repos: PropTypes.object.isRequired
}

module.exports = Repos;
