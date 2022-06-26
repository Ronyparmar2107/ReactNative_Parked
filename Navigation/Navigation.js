import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../Screens/Login';
import UserHomePage from '../Screens/UserHomePage';
import Place from '../Screens/PlaceScreen';
import Parking from '../Screens/ParkingScreen';

const Navigator = createStackNavigator({
    Login: Login,
    Home: UserHomePage,
    Place: Place,
    Parking: Parking
})

export default createAppContainer(Navigator)