import React    , { Component } from 'react'

import ApplicationNavigator from '../navigators'
import { BackHandler } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux'
import { navigateBack } from '../actions'

const mapStateToProps = state => ({
    navigation: state.navigationData
})

const mapDispatchToProps = dispatch => ({ dispatch })

class ApplicationNavigatorContainer extends Component {

    handleBackButton = () => {
        const { navigation, dispatch } = this.props
        if (navigation.index === 0) return false
        dispatch(navigateBack())
        return true
    }

    componentWillMount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackButton)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    }

    render() {
        return (
            <NavigationContainer>
                <ApplicationNavigator
                    navigation={{
                        dispatch: this.props.dispatch,
                        state: this.props.navigation
                    }}
                />
            </NavigationContainer>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    ApplicationNavigatorContainer
)