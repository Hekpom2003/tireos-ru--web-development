import {ELEMENTS__SET_ITEMS} from "../constants/elements";

const initialState = [];

export default function elements(state = initialState, action) {
    switch (action.type) {
        case ELEMENTS__SET_ITEMS:
            return action.payload;
        default:
            return state;
    }

}