import types from './types'

const changeDisplayedDate = (date) => ({
    type: types.SET_DAY_MARKER,
    payload: date
})


const actions = {changeDisplayedDate}

export default actions