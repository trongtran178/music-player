import React, { Component } from 'react'
import { Text, View } from 'react-native'
export default class Splash extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { navigation } = this.props
        setTimeout(() => navigation && navigation.replace('PlayMusic'), 3000)
    }

    render() {
        return (
            <View>
                <Text>con me no</Text>
            </View>
        )
    }
}