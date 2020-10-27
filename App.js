import { StatusBar } from 'expo-status-bar';
import React, { createContext, useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import constants from 'expo-constants'
import Home from './screens/Home'
import CreateEmployee from './screens/CreateEmployee'
import Profile from './screens/Profile'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer , initState} from './reducers/reducers'

// const store = createStore(reducer)
export const myContext = createContext()
const Stack = createStackNavigator();


const myOptions = {
  title: "My Sweet Home",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#006aff"
  }
}
function App() {



  return (

    <View style={styles.container}>
      {/* <Home/> */}
      {/* <CreateEmployee/> */}
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ ...myOptions, title: "create Employee" }}
        />
        <Stack.Screen name="create"
          component={CreateEmployee}
          options={{ ...myOptions, title: "Profile" }}
        />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
      {/* <Profile/> */}
    </View>


  );
}

export default () => {

 const [state,dispatch] =  useReducer(reducer,initState)

  return (
    <myContext.Provider value={
      {state:state,dispatch:dispatch}
    }>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </myContext.Provider>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
    //  marginTop:constants.statusBarHeight,
    //  alignItems: 'center',
    // flexDirection:"row",
    // justifyContent: 'center'
  },
});
