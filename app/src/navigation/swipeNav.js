import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';

import QuoteScreen from '../components/screens/home/homeScreen';
import SettingsScreen from '../components/screens/settings/settingsScreen';

const Tab = createMaterialTopTabNavigator()


const SwipeTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Quote"
            screenOptions={{
                tabBarStyle: { display: 'none' },
            }}
        >
            <Tab.Screen name="Quote" component={QuoteScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    )
}

export default SwipeTabs