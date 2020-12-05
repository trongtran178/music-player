import ApplicationNavigator from "../navigators";

const navigationData = (state, action) => {
    const nextState = ApplicationNavigator?.router?.getStateForAction(
        action,
        state
    );
    if (typeof nextState == 'undefined') return null
    if (typeof state == 'undefined') return null
    return nextState || state;
}

export default navigationData;
