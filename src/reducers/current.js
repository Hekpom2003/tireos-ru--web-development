import {CURRENT__SET_ITEMS} from '../constants/current';

const initialState = [];

export default function sections(state = initialState, action) {
    switch (action.type) {
        case CURRENT__SET_ITEMS:
            return action.payload;

        default:
            return state;
    }
}