import {SECTIONS__SET_ITEMS} from '../constants/sections';

const initialState = [];

export default function sections(state = initialState, action) {
    switch (action.type) {
        case SECTIONS__SET_ITEMS:
            return action.payload;

        default:
            return state;
    }
}