import React, {useState} from 'react';
import {View, Image} from 'react-native';

const PreImage = props => {
  return (
    <View style={props.imageContainerStyle}>
      {props.isLoaded ? (
        <Image
          style={props.imageStyle}
          source={props.sourceImg}
          onError={() => {
            props.onError();
          }}
          {...props}
        />
      ) : (
        <Image
          style={props.imageStyle}
          source={props.defaultSourceImg}
          {...props}
        />
      )}
    </View>
  );
};

const DefaultSourceImage = Component => {
  const WithStateComponent = props => {
    const [isLoaded, setIsLoaded] = useState(true);
    return (
      <Component
        isLoaded={isLoaded}
        onError={() => setIsLoaded(false)}
        {...props}
      />
    );
  };
  return WithStateComponent;
};

export default DefaultSourceImage(PreImage);
