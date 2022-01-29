import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import DefaultSourceImage from './DefaultSourceImage';

const PlayerList = props => {
  // const [isLoaded, setIsLoaded] = useState(false);
  const personId = props.personId;
  const playerImage =
    'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/' +
    personId +
    '.png';

  return (
    <View style={styles.listContainer}>
      <View>
        {/* {props.isLoaded ? (
          <Image
            style={styles.image}
            defaultSource={require('../assets/avatar.png')}
            source={{uri: playerImage}}
            onError={() => {
              props.onError();
            }}
            resizeMode="cover"
          />
        ) : (
          <Image
            style={styles.image}
            defaultSource={require('../assets/avatar.png')}
            source={require('../assets/avatar.png')}
            resizeMode="cover"
          />
        )} */}
        <DefaultSourceImage
          imageStyle={styles.image}
          defaultSourceImg={require('../assets/avatar.png')}
          sourceImg={{uri: playerImage}}
          resizeMode="cover"
        />
        <View style={styles.nameRow}>
          <Text style={styles.nameTitle} testID="firstName">
            {props.firstName}
          </Text>
          <Text style={styles.nameTitle}>{props.lastName}</Text>
        </View>
        <Text style={styles.listItem}>Position: {props.playerPosition}</Text>
        <Text style={styles.listItem}>Date of Birth: {props.dateOfBirth}</Text>
        <Text style={styles.listItem}>
          Height: {props.heightFeet} Feet {props.heightInches} Inches
        </Text>
        <Text style={styles.listItem}>Weight: {props.weightPounds} lb</Text>
        <Text style={styles.listItem}>College: {props.collegeName}</Text>
        <Text style={styles.listItem}>
          NBA Debut Year: {props.nbaDebutYear}
        </Text>
        <Text style={styles.listItem}>
          Draft Pick Number: {props.draftPickNum}
        </Text>
        <Text style={styles.listItem}>
          Draft Round Number: {props.draftRoundNum}
        </Text>
        <Text style={styles.listItem}>
          Draft Season Year: {props.draftSeasonYear}
        </Text>
        <View style={styles.button}>
          <Button
            onPress={() => {
              props.onPress();
            }}
            title="Add Player"
            color="black"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    margin: 10,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  nameTitle: {
    fontSize: 20,
    color: 'black',
  },
  listItem: {
    marginLeft: 10,
    color: 'black',
  },
  button: {
    backgroundColor: 'gainsboro',
    borderRadius: 15,
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 5,
  },
});
export default PlayerList;
