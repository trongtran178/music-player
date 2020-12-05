import * as actions from '../actions'

import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import React, { Component } from 'react'

import { Player } from '@react-native-community/audio-toolkit'
import Slider from '@react-native-community/slider';
import { connect } from 'react-redux'

let audioPlayer;

class PlayMusic extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        const { getStarted } = this.props
        fetch("https://shazam.p.rapidapi.com/songs/list-artist-top-tracks?id=40008598&locale=en-US", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "082ba4f994msh6e83eb49a9fb468p1f78b6jsn383f90c26787",
                "x-rapidapi-host": "shazam.p.rapidapi.com"
            }
        }).then(response => {
            console.log("LOG-36", JSON.stringify(response));
        }).catch(err => {
            console.error(err);
        });

        // setTimeout(() => { getStarted() }, 500)
    }

    onSliderValueChange = (value) => {
        return
    }

    handleSeekTime = (time) => {
        return
    }

    handleAudioDuration(audioDuration) {
        return
    }

    handlePlayPause = () => {
        return
    }

    prevTrack = () => {
        return
    }

    nextTrack = () => {
        const { getStarted } = this.props
        getStarted()
        // console.log("log-39", JSON.stringify(this.props))
        return
    }

    renderSongInfo() {
        const { curr_track, trackIndex } = this.props.playMusicState

        return (
            <View style={{ marginTop: 96 }}>
                <Text style={{ alignSelf: 'center', margin: 16 }}>Playing {trackIndex + 1} of 3</Text>
                <Image source={{ uri: curr_track.image }}
                    style={{ width: 250, height: 250, borderRadius: 250 / 2, alignSelf: 'center' }} />
                <Text style={{ alignSelf: 'center', margin: 8 }}>{curr_track.name}</Text>
                <Text style={{ alignSelf: 'center' }}>{curr_track.artist}</Text>
            </View>
        )
    }

    renderActions() {
        const { pauseOrPlayImageUrl } = this.props.playMusicState
        return (
            <View style={{ flexDirection: 'row', marginTop: 16, justifyContent: 'space-evenly', alignItems: 'center' }}>
                <TouchableOpacity activeOpacity={0.85}
                    onPress={this.prevTrack}>
                    <Image style={styles.forwardIcon}
                        source={{ uri: 'http://www.myiconfinder.com/uploads/iconsets/256-256-b2575601b7b7d153042eae0ea9ca6056.png' }} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.85}
                    onPress={this.handlePlayPause}>
                    <Image style={{ width: 96, height: 96 }}
                        source={{ uri: pauseOrPlayImageUrl }} ></Image>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.85} onPress={this.nextTrack}>
                    <Image style={styles.forwardIcon}
                        source={{ uri: 'http://www.myiconfinder.com/uploads/iconsets/256-256-571c2895b25ca9eedb05a1d41445b4d8.png' }} />
                </TouchableOpacity>
            </View>
        )
    }

    renderSlider() {
        return (
            <>
                <Slider style={{ marginHorizontal: 48 }} step={0.0001} disabled={false}
                    minimumValue={1}
                    maximumValue={100}
                    onValueChange={value => { }}
                    value={50} />
                <Text style={{ alignSelf: 'center' }}></Text>
            </>
        )
    }

    render() {
        const { isLoading } = this.props.playMusicState
        if (isLoading) return <View></View>
        return (
            <View style={{ justifyContent: 'center' }} >
                {this.renderSongInfo()}
                {this.renderSlider()}
                {this.renderActions()}
            </View >
        )
    }
}

const mapStateToProps = (state) => ({
    playMusicState: state.playMusic
})

export default connect(mapStateToProps, actions)(PlayMusic)

const styles = StyleSheet.create({
    tinyLogo: {
        minWidth: 200,
        minHeight: 200
    },

    forwardIcon: {
        width: 64,
        height: 64
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    }
});