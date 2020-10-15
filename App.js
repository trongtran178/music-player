/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { Player } from '@react-native-community/audio-toolkit'
import Slider from '@react-native-community/slider';

const trackList = [
  {
    name: "Night Owl",
    artist: "Broke For Free",
    image: `https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250`,
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
  },
  {
    name: "Enthusiast",
    artist: "Tours",
    image: `https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250`,
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
  },
  {
    name: "Shipping Lanes",
    artist: "Chad Crouch",
    image: `https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250`,
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
  }
]

let audioPlayer;
let updateTimer;

export default class App extends Component {
  _isMounted = false;
  state = {
    curr_track: {
      name: "Night Owl",
      artist: "Broke For Free",
      image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
      path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
    },
    isPlaying: true,
    pauseOrPlayImageUrl: 'http://www.myiconfinder.com/uploads/iconsets/256-256-10d2a30ffdb0715955f657ec78177331.png',
    trackIndex: 0,
    time: 0.0,
    sliderPercent: 0 // 0 -> 100
  }

  constructor(props) {
    super(props);
  };

  prevTrack = () => {
    return
    this.setState({
      curr_track: trackList[this.state.trackIndex > 0
        ? this.state.trackIndex - 1
        : trackList.length - 1],
      time: 0,
      sliderPercent: 0,
      trackIndex: this.state.trackIndex > 0
        ? this.state.trackIndex - 1
        : trackList.length - 1
    }, () => {
      this.loadTrack(this.state.trackIndex)
    })
  };

  nextTrack = () => {
    return
    this.setState({
      curr_track: trackList[this.state.trackIndex < trackList.length - 1
        ? this.state.trackIndex + 1
        : 0],
      time: 0,
      sliderPercent: 0,
      trackIndex: this.state.trackIndex < trackList.length - 1
        ? this.state.trackIndex + 1
        : 0,
    }, () => {
      this.loadTrack(this.state.trackIndex)
    })
  }

  loadTrack = (trackIndex) => {
    return
    audioPlayer.stop();
    audioPlayer = null
    clearInterval(updateTimer)
    audioPlayer = new Player(trackList[trackIndex].path)
    if (this.state.isPlaying) {
      audioPlayer.prepare(() => {
        audioPlayer.play();
        audioPlayer.looping = true;
        let duration = Number.parseInt(audioPlayer.duration / 1000);
        updateTimer = setInterval(() => {
          this.setState({
            time: this.state.time + 1.0,
            sliderPercent: ((this.state.time + 1.0) / duration) * 100
          }, () => {
            if (this.state.time >= Number.parseInt(audioPlayer.duration / 1000)) {
              this.setState({
                time: 0,
                sliderPercent: 0
              })
            }
          })
        }, 1000);
      })
    }
  }

  handleSeekTime = (time) => {
    return
    let minutes = Number.parseInt(time / 60);
    let seconds = time - (minutes * 60);
    let results = "";
    if (minutes < 10) results += "0"
    results += minutes + ":";
    if (seconds < 10) results += "0"
    results += seconds;

    return results;
  }

  handleAudioDuration(audioDuration) {
    return
    let time = Number.parseInt(audioDuration / 1000)
    let minutes = Number.parseInt(time / 60);
    let seconds = time - (minutes * 60);
    let results = "";
    if (minutes < 10) results += "0"
    results += minutes + ":";
    if (seconds < 10) results += "0"
    results += seconds;
    return results;

  }

  handlePlayPause = () => {
    return
    if (this.state.isPlaying) {
      clearInterval(updateTimer)
      this.setState({
        isPlaying: false,
        pauseOrPlayImageUrl: 'http://www.myiconfinder.com/uploads/iconsets/256-256-3c541556ef22340382e659ac8a579f69.png',
      })
      audioPlayer.pause()
    } else {
      this.setState({
        isPlaying: true,
        pauseOrPlayImageUrl: 'http://www.myiconfinder.com/uploads/iconsets/256-256-10d2a30ffdb0715955f657ec78177331.png',
      })
      audioPlayer.play()
      let duration = Number.parseInt(audioPlayer.duration / 1000);
      updateTimer = setInterval(() => {
        this.setState({
          time: this.state.time + 1,
          sliderPercent: ((this.state.time + 1) / duration) * 100
        })
      }, 1000);
    }
  }

  onSliderValueChange = (value) => {
    return
    audioPlayer.seek((value / 100) * audioPlayer.duration)
    let duration = Number.parseInt(audioPlayer.duration / 1000);
    let newTime = Number.parseInt((duration / 100) * value);
    this.setState({
      time: newTime,
      sliderPercent: value,
    })
  }

  _resetState = () => {
    return
    clearInterval(updateTimer);
    this.setState({
      time: 0,
      sliderPercent: 0
    })
  }

  render() {
    return (
      <View style={{ flexDirection: 'column', justifyContent: 'center' }} >
        <View style={{ marginTop: 96 }}>
          <Text style={{ alignSelf: 'center', margin: 16 }}>Playing {this.state.trackIndex + 1} of 3</Text>
          <Image source={{ uri: this.state.curr_track.image }}
            style={{ width: 250, height: 250, borderRadius: 250 / 2, alignSelf: 'center' }} />
          <Text style={{ alignSelf: 'center', margin: 8 }}>{this.state.curr_track.name}</Text>
          <Text style={{ alignSelf: 'center' }}>{this.state.curr_track.artist}</Text>
        </View>
        <Slider style={{ marginHorizontal: 48 }} step={0.0001} disabled={false}
          minimumValue={1}
          maximumValue={100}
          onValueChange={value => this.onSliderValueChange(value)}
          value={this.state.sliderPercent}></Slider>
        <Text style={{ alignSelf: 'center' }}>{this.handleSeekTime(this.state.time)} - {this.handleAudioDuration(audioPlayer ? audioPlayer.duration : 0)}</Text>
        <View style={{ flexDirection: 'row', marginTop: 16, justifyContent: 'space-evenly', alignItems: 'center' }}>
          <TouchableOpacity activeOpacity={0.85}
            onPress={this.prevTrack}>
            <Image style={styles.forwardIcon}
              source={{ uri: 'http://www.myiconfinder.com/uploads/iconsets/256-256-b2575601b7b7d153042eae0ea9ca6056.png' }} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.85}
            onPress={this.handlePlayPause}>
            <Image style={{ width: 96, height: 96 }}
              source={{ uri: this.state.pauseOrPlayImageUrl }} ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.85} onPress={this.nextTrack}>
            <Image style={styles.forwardIcon}
              source={{ uri: 'http://www.myiconfinder.com/uploads/iconsets/256-256-571c2895b25ca9eedb05a1d41445b4d8.png' }} />
          </TouchableOpacity>
        </View>
      </View >
    );
  }

  componentDidMount() {
    this._isMounted = true
    // audioPlayer = new Player(trackList[0].path)
    // this.loadTrack(0);
  }
}

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
