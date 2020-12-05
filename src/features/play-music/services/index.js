import axios from 'axios'

const fetchMusicService = () => {
    fetch("https://shazam.p.rapidapi.com/songs/list-artist-top-tracks?id=40008598&locale=en-US", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "082ba4f994msh6e83eb49a9fb468p1f78b6jsn383f90c26787",
            "x-rapidapi-host": "shazam.p.rapidapi.com"
        }
    }).then(response => {
        console.log(response);
    }).catch(err => {
        console.error(err);
    });
}