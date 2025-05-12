import React from "react";
//navigation
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
//components
import Main from "./components/Main";   
import Login from "./components/Login";
import Register from "./components/Registration";

const Stack = createStackNavigator();

export default function Navigate() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={Main}
                options={{
                    title: 'Home',
                    headerShown: false,
                    //headerStyle: {backgroundColor: '#f4511e'},
                    //headerTintColor: '#fff',
                    //headerTitleStyle: {fontFamily: 'mt-light', fontSize: 22},
                    }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    title: 'Login',
                    }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    title: 'Register',
                    }}
            />
        </Stack.Navigator>
    </NavigationContainer>;
}