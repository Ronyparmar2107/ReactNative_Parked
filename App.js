import { StyleSheet } from 'react-native';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';


import Navigator from './Navigation/Navigation'
import UserReducer from './Store/reducers/user';
import OwnerReducer from './Store/reducers/owner';

const RootReducer = combineReducers({
  user: UserReducer,
  owner: OwnerReducer
})

const store = createStore(RootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
