import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../Screens/Login';
import UserHomePage from '../Screens/UserHomePage';
import Place from '../Screens/PlaceScreen';
import Parking from '../Screens/ParkingScreen';
import SignUp from '../Screens/SignUp';
import OwnerHomeScreen from '../Screens/OwnerHomeScreen';
import AddPlaceScreen from '../Screens/AddPlaceScreen';

const Navigator = createStackNavigator({
    Login: Login,
    SignUp: SignUp,
    Home: UserHomePage,
    Place: Place,
    Parking: Parking,
    OwnerHome: OwnerHomeScreen,
    AddPlace: AddPlaceScreen,
},
    {
        defaultNavigationOptions: {
            headerTitleAlign: 'center',
        }
    }
)

export default createAppContainer(Navigator)