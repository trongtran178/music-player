import { GET_STARTED } from '../actions/types'
let initialState = {
    isLoading: true,
    isError: false,
    errorMessage: '',
    isPlaying: false,
    time: null,
    pauseOrPlayImageUrl: null,
    currentTrack: null,
    trackList: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_STARTED: {
            console.log("log-14", GET_STARTED)
            return {
                ...state,
                curr_track: {
                    name: "Night Owl",
                    artist: "Broke For Free",
                    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
                    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
                },
                trackIndex: 0,
                sliderPercent: 0, // 0 -> 100
                time: 0,
                pauseOrPlayImageUrl: 'http://www.myiconfinder.com/uploads/iconsets/256-256-10d2a30ffdb0715955f657ec78177331.png',
                isLoading: false
            }
        }
        default: return state
    }
}

