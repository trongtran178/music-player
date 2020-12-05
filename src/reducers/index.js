import { combineReducers } from "redux";
import navigationData from '../navigation/reducers'
import playMusicReducer from '../features/play-music/reducers'

export default combineReducers({
    navigationData,
    playMusic: playMusicReducer
});
