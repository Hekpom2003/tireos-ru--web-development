import {CONTENT__SET_ITEMS, CONTENT__UPDATE_FILTER} from '../constants/content';

const initialState = {};

export default function sections(state = initialState, action) {
    switch (action.type) {
        case CONTENT__SET_ITEMS:
            return action.payload;
        case CONTENT__UPDATE_FILTER:
            return {...state, filter: action.payload};
        default:
            return state;
    }
}