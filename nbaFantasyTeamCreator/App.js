import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
  Modal,
  Image,
  TextInput,
} from 'react-native';

const App = () => {
  const [playersList, setPlayersList] = useState([]);
  const [playersVisible, setPlayersVisible] = useState(false);
  const [teamSetUp, setTeamSetUp] = useState(false);
  const [useDefaultImage, setUseDefaultImage] = useState(false);
  const [defaultImage, setDefaultImage] = useState('./assets/avatar.png');
  const [teamName, setTeamName] = useState('');
  const [cityName, setCityName] = useState('');
  const [teamRoster, setTeamRoster] = useState([]);
  useEffect(() => {
    const getPlayersList = async () => {
      return fetch('https://data.nba.net/10s/prod/v1/2021/players.json')
        .then(response => response.json())
        .then(json => {
          const data = json.league.sacramento;
          // console.log(data);
          setPlayersList(data);
        })
        .catch(error => {
          console.error(error);
        });
    };
    getPlayersList();
  }, []);

  const ListItem = ({item}) => {
    const playerImage =
      'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/' +
      item.personId +
      '.png';

    return (
      <View style={styles.listContainer}>
        <View>
          <Image
            style={{width: 100, height: 100, marginLeft: 5}}
            defaultSource={require('./assets/avatar.png')}
            source={
              useDefaultImage
                ? require('./assets/avatar.png')
                : {uri: playerImage}
            }
            resizeMode="cover"
          />
          <View style={styles.nameRow}>
            <Text style={styles.nameTitle}>{item.firstName}</Text>
            <Text style={styles.nameTitle}>{item.lastName}</Text>
          </View>
          <Text style={styles.listItem}>
            Position: {item.teamSitesOnly.posFull}
          </Text>
          <Text style={styles.listItem}>
            Date of Birth: {item.dateOfBirthUTC}
          </Text>
          <Text style={styles.listItem}>
            Height: {item.heightFeet} Feet {item.heightInches} Inches
          </Text>
          <Text style={styles.listItem}>Weight: {item.weightPounds} lb</Text>
          <Text style={styles.listItem}>College: {item.collegeName}</Text>
          <Text style={styles.listItem}>
            NBA Debut Year: {item.nbaDebutYear}
          </Text>
          <Text style={styles.listItem}>
            Draft Pick Number: {item.draft.pickNum}
          </Text>
          <Text style={styles.listItem}>
            Draft Round Number: {item.draft.roundNum}
          </Text>
          <Text style={styles.listItem}>
            Draft Season Year: {item.draft.seasonYear}
          </Text>
          <View style={styles.button}>
            <Button
              onPress={() => console.log('pressed')}
              title="Add Player"
              color="black"
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.titleView}>
          <Text style={styles.title}>NBA Fantasy Team Creator</Text>
        </View>
      </View>
      <View>
        <View style={styles.titleView}>
          <Text style={styles.sectionTitle}>Create Team:</Text>
          <View style={styles.button}>
            <Button
              onPress={() => setTeamSetUp(true)}
              title="Add Team Name and City"
              color="black"
            />
          </View>
          <View style={styles.button}>
            <Button
              onPress={() => setPlayersVisible(true)}
              title="Select Players"
              color="black"
            />
          </View>
          <View style={styles.titleViewRow}>
            <Text style={styles.sectionTitle}>{cityName}</Text>
            <Text style={styles.sectionTitle}>{teamName}</Text>
          </View>
          <Text style={styles.sectionTitle}>Roster:</Text>
        </View>
      </View>
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={playersVisible}
          onRequestClose={() => {
            setPlayersVisible(!playersVisible);
          }}>
          <View style={styles.container}>
            <View style={styles.titleView}>
              <Text style={styles.sectionTitle}>Player List</Text>
            </View>
            <TouchableOpacity
              style={styles.titleView}
              onPress={() => setPlayersVisible(!playersVisible)}>
              <Text style={styles.exitText}>Exit</Text>
            </TouchableOpacity>
            <FlatList
              data={playersList}
              renderItem={ListItem}
              keyExtractor={item => item.personId}
              horizontal={false}
            />
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={teamSetUp}
          onRequestClose={() => {
            setTeamSetUp(!teamSetUp);
          }}>
          <View style={styles.container}>
            <View style={styles.titleView}>
              <Text style={styles.sectionTitle}>Team Set Up</Text>
            </View>
            <TouchableOpacity
              style={styles.titleView}
              onPress={() => setTeamSetUp(!teamSetUp)}>
              <Text style={styles.exitText}>Exit</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Team City: {cityName}</Text>
            <Text style={styles.sectionTitle}>Team Name: {teamName}</Text>
            <TextInput
              placeholder="Type in city name"
              autoCapitalize="words"
              onChangeText={text => setCityName(text)}
              style={styles.inputStyle}
            />
            <TextInput
              placeholder="Type in team name"
              autoCapitalize="words"
              onChangeText={text => setTeamName(text)}
              style={styles.inputStyle}
            />

            <View style={styles.button}>
              <Button
                onPress={() => setTeamSetUp(!teamSetUp)}
                title="Submit"
                color="black"
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    marginLeft: 5,
    marginRight: 5,
  },
  listContainer: {
    flex: 1,
    margin: 10,
  },
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleViewRow: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 30,
  },
  sectionTitle: {
    fontSize: 25,
    marginRight: 5,
    marginTop: 10
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  nameTitle: {
    fontSize: 20,
  },
  listItem: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: 'gainsboro',
    borderRadius: 15,
    margin: 10,
  },
  exitText: {
    color: 'blue',
    fontSize: 15,
  },
  inputStyle: {
    borderBottomWidth: 1,
    margin: 10,
    height: 40,
  },
});
export default App;
