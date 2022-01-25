import React, {useState} from 'react';
import PlayerList from './PlayerList';
import RosterList from './RosterList';

const HOC = Component => {
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

export const HigherOrderPlayerList = HOC(PlayerList);
export const HigherOrderRosterList = HOC(RosterList);
