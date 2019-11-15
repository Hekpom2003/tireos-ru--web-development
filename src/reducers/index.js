import { combineReducers } from 'redux';
import elements from './elements';
import sections from './sections';
import current from './current';
import content from './content';

export const reducer = combineReducers({
    elements,
    sections,
    current,
    content
});