import {createStackNavigator} from 'react-navigation-stack';
import {AddStudent} from '../AddStudent';
import {Auth} from '../Auth';
import {Guest} from '../Guest';
import {UserInfo} from '../UserInfo';

export const getStackNavigator = (initialRouteName: string) => {
  return createStackNavigator(
    {
      Guest: {screen: Guest},
      Auth: {screen: Auth},
      AddStudent: {screen: AddStudent},
      UserInfo: {screen: UserInfo},
    },
    {
      initialRouteName,
      headerMode: 'none',
    },
  );
};
