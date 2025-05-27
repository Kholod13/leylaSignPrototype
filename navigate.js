import React from "react";
//navigation
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
//components
import Main from "./components/Main";
import Folders from "./components/Folders";
import Simulator from "./components/Simulator";
import Profile from "./components/Profile";
import Onboarding from "./components/Onboarding";
import Login from "./components/login/Login";
import Register from "./components/register/Registration";
import { ProgressProvider } from './components/ProgressContext';
import RegistrationStep2 from "./components/register/RegistrationStep2";
import RegistrationStep3 from "./components/register/RegistrationStep3";
import RegistrationStep4 from "./components/register/RegistrationStep4";
import RegistrationStep5 from "./components/register/RegistrationStep5";
import RegistrationStep6 from "./components/register/RegistrationStep6";
import ForgotPassword from "./components/Forgot Password/ForgotPassword";
import CheckMail from "./components/CheckMail";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

const Stack = createStackNavigator();

export default function Navigate() {
    const { isLoggedIn } = useContext(AuthContext);
    if (isLoggedIn === null) return null; // ждём загрузку токена

    return <ProgressProvider>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false}}>
                {isLoggedIn ? (
                    <>
                    <Stack.Screen
                        name="Main"
                        component={Main}
                        options={{
                            title: 'Main',
                            headerShown: false,
                            animation: 'none',
                            }}
                    />
                    <Stack.Screen
                        name="Folders"
                        component={Folders}
                        options={{
                            title: 'Folders',
                            headerShown: false,
                            animation: 'none',
                        }}
                    />
                    <Stack.Screen
                            name="Simulator"
                            component={Simulator}
                            options={{
                                title: 'Simulator',
                                headerShown: false,
                                animation: 'none',
                            }}
                    />
                    <Stack.Screen
                            name="Profile"
                            component={Profile}
                            options={{
                                title: 'Profile',
                                headerShown: false,
                                animation: 'none',
                                }}
                    />
                    </>
                ) : (
                    <>
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
                            name="ForgotPassword"
                            component={ForgotPassword}
                            options={{
                                title: 'Forgot Password',
                                headerShown: false,
                                }}
                        />
                        <Stack.Screen
                            name="CheckMail"
                            component={CheckMail}
                            options={{
                                title: 'Check Mail',
                                headerShown: false,
                                }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    </ProgressProvider>
}