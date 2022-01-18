import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import PlayerList from './components/PlayerList';
import RosterList from './components/RosterList';

const App = props => {
  const [playersList, setPlayersList] = useState([]);
  const [filteredPlayersList, setFilteredPlayersList] = useState([]);
  const [playersVisible, setPlayersVisible] = useState(false);
  const [teamSetUp, setTeamSetUp] = useState(false);
  const [useDefaultImage, setUseDefaultImage] = useState(true);
  const [defaultImage, setDefaultImage] = useState('./assets/avatar.png');
  const [teamName, setTeamName] = useState('');
  const [cityName, setCityName] = useState('');
  const [teamRoster, setTeamRoster] = useState([]);
  useEffect(() => {
    //Fetching inital player list
    const getPlayersList = async () => {
      return fetch('https://data.nba.net/10s/prod/v1/2021/players.json')
        .then(response => response.json())
        .then(json => {
          const data = json.league.sacramento;
          setPlayersList(data);
        })
        .catch(error => {
          console.error(error);
        });
    };
    getPlayersList();
  }, []);

  //handlers
  const openPlayersList = useCallback(() => {
    teamName && cityName
      ? setPlayersVisible(true)
      : Alert.alert('Please choose team city and name first');
  }, [teamName, cityName]);

  //player crud fuctions
  const addPlayers = useCallback(
    (personId, playerImage, playerPosition, firstName, lastName) => {
      if (teamRoster.filter(x => x.personId === personId).length > 0) {
        Alert.alert('Player already chosen');
      } else if (
        teamRoster.filter(x => x.playerPosition === playerPosition).length > 0
      ) {
        Alert.alert(
          'You already have player in that position on your team. Remove previous player first.',
        );
      } else {
        return teamRoster.push({
          personId: personId,
          playerImage: playerImage,
          playerPosition: playerPosition,
          firstName: firstName,
          lastName: lastName,
        });
      }
    },
    [teamRoster],
  );

  const removePlayer = useCallback(
    personId => {
      var rosterList = teamRoster.filter(x => {
        return x.personId !== personId;
      });
      console.log(rosterList);
      setTeamRoster(rosterList);
    },
    [teamRoster],
  );

  const filterPlayers = useCallback(
    playerPosition => {
      var playerList = playersList.filter(x => {
        return x.teamSitesOnly.posFull === playerPosition;
      });
      setFilteredPlayersList(playerList);
    },
    [playersList],
  );

  //child player and roster components
  const playerList = ({item}) => {
    const personId = item.personId;
    const playerImage =
      'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/' +
      personId +
      '.png';
    const playerPosition = item.teamSitesOnly.posFull;
    const firstName = item.firstName;
    const lastName = item.lastName;
    return (
      <PlayerList
        personId={personId}
        playerPosition={playerPosition}
        firstName={firstName}
        lastName={lastName}
        dateOfBirth={item.dateOfBirthUTC}
        heightFeet={item.heightFeet}
        heightInches={item.heightInches}
        weightPounds={item.weightPounds}
        collegeName={item.collegeName}
        nbaDebutYear={item.nbaDebutYear}
        draftPickNum={item.draft.pickNum}
        draftRoundNum={item.draft.roundNum}
        draftSeasonYear={item.draft.seasonYear}
        onPress={() => {
          addPlayers(
            personId,
            playerImage,
            playerPosition,
            firstName,
            lastName,
          );
          setPlayersVisible(false);
          console.log(playerImage);
        }}
      />
    );
  };

  const rosterList = ({item}) => {
    const personId = item.personId;
    const playerImage = item.playerImage;
    const playerPosition = item.playerPosition;
    const firstName = item.firstName;
    const lastName = item.lastName;
    return (
      <RosterList
        cityName={cityName}
        teamName={teamName}
        playerPosition={playerPosition}
        playerImage={playerImage}
        firstName={firstName}
        lastName={lastName}
        onPress={() => removePlayer(personId)}
      />
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
              onPress={() => openPlayersList()}
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
        <FlatList
          data={teamRoster}
          renderItem={rosterList}
          keyExtractor={item => item.personId}
          horizontal={true}
        />
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
            <View style={styles.titleView}>
              <Text style={styles.sectionTitle}>Filter By Position:</Text>
            </View>
            <View style={styles.titleViewRow}>
              <TouchableOpacity
                style={styles.titleView}
                onPress={() => {
                  filterPlayers('Forward');
                }}>
                <Text style={styles.positionText}>Forward</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.titleView}
                onPress={() => {
                  filterPlayers('Forward-Center');
                }}>
                <Text style={styles.positionText}>Forward-Center</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.titleView}
                onPress={() => {
                  filterPlayers('Center');
                }}>
                <Text style={styles.positionText}>Center</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.titleView}
                onPress={() => {
                  filterPlayers('Guard');
                }}>
                <Text style={styles.positionText}>Guard</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.titleView}
              onPress={() => {
                setFilteredPlayersList([]);
              }}>
              <Text style={styles.positionText}>Reset</Text>
            </TouchableOpacity>
            <FlatList
              data={
                filteredPlayersList.length > 0
                  ? filteredPlayersList
                  : playersList
              }
              renderItem={playerList}
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
  titleViewRowRoster: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 30,
  },
  sectionTitle: {
    fontSize: 25,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
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
  positionText: {
    color: 'blue',
    fontSize: 15,
    marginRight: 5,
  },
  inputStyle: {
    borderBottomWidth: 1,
    margin: 10,
    height: 40,
  },
});
export default App;
