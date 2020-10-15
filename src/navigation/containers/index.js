import React, { Component } from 'react'
import { connect } from 'react-redux'
import { navigateBack } from '../actions'
import { addNavigationHelpers } from 'react-navigation'
import { BackHandler } from 'react-native'
import ApplicationNavigator from '../navigators'




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
        this.removeEventListener("hardwareBackPress", this.handleBackButton);
    }

    render() {
        return (
            <ApplicationNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.navigation
                })}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    ApplicationNavigatorContainer
)