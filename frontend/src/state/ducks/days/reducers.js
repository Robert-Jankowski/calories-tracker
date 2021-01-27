//TODAY: 2021-01-27
const defaultState = new Date().toISOString().slice(0, 10)

const displayedDate = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_DAY_MARKER':
            return action.payload;
        default:
            return state;
    }
}

const daysReducers = {displayedDate}

export default daysReducers;