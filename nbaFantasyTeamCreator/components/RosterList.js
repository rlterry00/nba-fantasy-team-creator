import React from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';

const RosterList = props => {
  return (
    <View style={styles.listContainer}>
      <View>
        <View style={styles.titleViewRowRoster}>
          <Text style={styles.sectionTitle}>{props.cityName}</Text>
          <Text style={styles.sectionTitle}>{props.teamName}</Text>
        </View>
        <Text style={styles.sectionTitle}>
          Position: {props.playerPosition}
        </Text>
        <View style={styles.nameRow}>
          {props.isLoaded ? (
            <Image
              style={styles.image}
              defaultSource={require('../assets/avatar.png')}
              source={{uri: props.playerImage}}
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
          )}

          <Text style={styles.sectionTitle}>{props.firstName}</Text>
          <Text style={styles.sectionTitle}>{props.lastName}</Text>
        </View>

        <View style={styles.button}>
          <Button
            onPress={() => props.onPress()}
            title="Remove Player"
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
  titleViewRowRoster: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 30,
    color: 'black',
  },
  sectionTitle: {
    fontSize: 25,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
    color: 'black',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    marginBottom: 5,
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
export default RosterList;
