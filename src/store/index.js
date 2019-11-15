import { reducer } from "../reducers/index";

import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

const store = createStore(reducer, devToolsEnhancer(
    // options like actionSanitizer, stateSanitizer
));


export default store;