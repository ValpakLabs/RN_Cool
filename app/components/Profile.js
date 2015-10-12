const React = require('react-native');
const colors = require('../colors');

const {
  Component,
  PropTypes,
  Text,
  Image,
  View,
  ScrollView,
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
    fontSize: 16,
    color: colors.lightblue500
  },
  rowContent: {
    fontSize: 20
  }
});

class Profile extends Component {
  render() {
    const {userInfo} = this.props;
    const topics = ['company', 'location', 'following', 'following', 'email', 'bio', 'public_repos'];

    const list = topics.map((topic, i) => {
      if (!userInfo[topic]) {
        return <View key={i} />
      }
      return (
        <View key={i}>
          <View style={styles.rowContainer}>
            <Text style={styles.rowTitle}>{this.getRowTitle(userInfo, topic)}</Text>
            <Text style={styles.rowContent}>{userInfo[topic]}</Text>
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

  getRowTitle(userInfo, topic) {
    topic = topic === 'public_repos' ? topic.replace('_', ' ') : topic;
    return topic[0] ? topic[0].toUpperCase() + topic.slice(1) : topic;
  }
}

Profile.propTypes = {
  userInfo: PropTypes.object.isRequired
}

module.exports = Profile;
