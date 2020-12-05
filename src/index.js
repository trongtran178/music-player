import React, { Component } from 'react'
import { Provider } from "react-redux";

import NavigationContainer from './navigation/containers'
import Layout from './components/layout'
import store from './store'
export default class MusicApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <Layout>
                    <NavigationContainer />
                </Layout>
            </Provider>
        )
    }
}
