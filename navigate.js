import React from "react";
//navigation
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
//components
import Main from "./components/Main";
import Onboarding from "./components/Onboarding";
import Login from "./components/login/Login";
import Register from "./components/register/Registration";
import { ProgressProvider } from './components/ProgressContext';
import RegistrationStep2 from "./components/register/RegistrationStep2";
import RegistrationStep3 from "./components/register/RegistrationStep3";
import RegistrationStep4 from "./components/register/RegistrationStep4";
import RegistrationStep5 from "./components/register/RegistrationStep5";
import RegistrationStep6 from "./components/register/RegistrationStep6";

const Stack = createStackNavigator();

export default function Navigate() {
    return <ProgressProvider>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Onboarding"
                    component={Onboarding}
                    options={{
                        title: 'Welcome',
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
                        headerShown: false,
                        }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        title: 'Register',
                        headerShown: false,
                        }}
                />
                <Stack.Screen
                    name="RegistrationStep2"
                    component={RegistrationStep2}
                    options={{
                        title: 'Registration Step 2',
                        headerShown: false,
                        }}
                />
                <Stack.Screen
                    name="RegistrationStep3"
                    component={RegistrationStep3}
                    options={{
                        title: 'Registration Step 3',
                        headerShown: false,
                        }}
                />
                <Stack.Screen
                    name="RegistrationStep4"
                    component={RegistrationStep4}
                    options={{
                        title: 'Registration Step 4',
                        headerShown: false,
                        }}
                />
                <Stack.Screen
                    name="RegistrationStep5"
                    component={RegistrationStep5}
                    options={{
                        title: 'Registration Step 5',
                        headerShown: false,
                        }}
                />
                <Stack.Screen
                    name="RegistrationStep6"
                    component={RegistrationStep6}
                    options={{
                        title: 'Registration Step 6',
                        headerShown: false,
                        }}
                />
                <Stack.Screen
                    name="Main"
                    component={Main}
                    options={{
                        title: 'Main',
                        headerShown: false,
                        }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    </ProgressProvider>
}