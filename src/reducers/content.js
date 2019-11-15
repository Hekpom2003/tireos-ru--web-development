import {CONTENT__SET_ITEMS} from '../constants/content';

const initialState = {};

export default function sections(state = initialState, action) {
    switch (action.type) {
        case CONTENT__SET_ITEMS:
            return action.payload;

        default:
            return state;
    }
}