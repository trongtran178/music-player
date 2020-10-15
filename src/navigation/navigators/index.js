import { StackNavigator } from "react-navigation"
import * as screenNames from '../screen_names'
import Splash from 'features/splash/containers'
const appNavigator = StackNavigator({
    [screenNames.SPLASH]: {
        screen: Splash
    },
});

export default appNavigator