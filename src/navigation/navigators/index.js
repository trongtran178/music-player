import * as React from 'react';

import PlayMusicContainer from '../../features/play-music/containers'
import Splash from '../../features/splash/containers'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

export default function appNavigator() {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="PlayMusic" component={PlayMusicContainer} />
        </Stack.Navigator>
    )
}