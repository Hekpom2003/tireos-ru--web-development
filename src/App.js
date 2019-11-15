import React from 'react';
import {connect} from 'react-redux';

import {Preloder} from "./components/Preloader";
import Sections from "./components/Sections";
import Elements from "./components/Elements";
import Content from "./components/Content";

import {SECTIONS__SET_ITEMS} from "./constants/sections";
import {CURRENT__SET_ITEMS} from "./constants/current";
import {ELEMENTS__SET_ITEMS} from "./constants/elements";
import {CONTENT__SET_ITEMS} from "./constants/content";


import './scss/App.scss';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {showPreloader: true};

        this.url = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://dima.temploid.ru' : "";
        this.url += '/local/ajax/web-development.php';


        this.changeElement = this.changeElement.bind(this);
        this.changeSection = this.changeSection.bind(this);
        this.getDataFromServer = this.getDataFromServer.bind(this);
    }

    changeSection(sectionId) {
        this.getDataFromServer(sectionId);
    }

    changeElement(elementId) {
        this.setState({showPreloader: !this.state.showPreloader});
        this.getDataFromServer(this.props.current.sectionId, elementId)
    }

    getDataFromServer(sectionId = false, elementId = false) {

        const body = {};
        if (sectionId) body.sectionId = sectionId;
        if (elementId) body.elementId = elementId;

        fetch(this.url, {
            method: 'post',
            body: JSON.stringify(body),
        })
            .then(res => res.json())
            .then(json => {
                this.props._setDataFromServer(json);
                this.setState({showPreloader: false})
            });
    }

    componentDidMount() {
        this.getDataFromServer();
    }

    render() {

        if (this.state.showPreloader) {
            return (
                <Preloder/>
            )
        } else {
            return (
                <div className="web-development">
                    <Sections changeSection={sectionId => this.changeSection(sectionId)}/>
                    <Elements changeElement={elementId => this.changeElement(elementId)}/>
                    <Content/>
                </div>
            )
        }


    }
}

const mapStateProp = state => ({
    current: state.current
});

const mapDispachProps = dispatch => {
    return {
        _setDataFromServer: json => {
            if (json.sections) dispatch({type: SECTIONS__SET_ITEMS, payload: json.sections});
            if (json.current) dispatch({type: CURRENT__SET_ITEMS, payload: json.current});
            if (json.elements) dispatch({type: ELEMENTS__SET_ITEMS, payload: json.elements});
            if (json.content) dispatch({type: CONTENT__SET_ITEMS, payload: json.content});
        },

    }
};

export default connect(mapStateProp, mapDispachProps)(App);
