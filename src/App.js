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

        this.state = {
            showPreloader: true,
            // siteparams: this.props.match.params,
        };

        this.url = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://dima.temploid.ru' : "";
        this.url += '/local/ajax/web-development.php';

        this.firstLoad = true; // TODO Костыль для корневого раздела, надо что-то придумать другое


        this.getDataFromServer = this.getDataFromServer.bind(this);
    }

    componentDidMount() {
        const {params} = this.props.match;
        this.getDataFromServer(params);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {params} = this.props.match;
        this.getDataFromServer(params);
    }

    getDataFromServer(params) {



        let body = {};
        body.sectionCode = params.sectionCode || null;
        body.elementCode = params.elementCode || null;

        let getData = false; // Флаг на получение данных


        if (body.elementCode === null) {
            getData = (body.sectionCode !== this.props.current.sectionCode);
        } else {
            getData = (
                body.sectionCode !== this.props.current.sectionCode ||
                body.elementCode !== this.props.current.elementCode
            );
        }

        console.log('here1',getData);

        // Проверяем state чтобы не соответствовал текущему запросу на cервер для избежания зацикливания
        if (getData && this.firstLoad) {

            console.log('here2');

            document.getElementById('root').classList.add('is-loading');

            // TODO Костыль чтобы на корневой ссылке не зацикливало. Сделать нормально
            if (body.sectionCode === null && body.elementCode === null && this.firstLoad) this.firstLoad = false;

            body = JSON.stringify(body);

            fetch(this.url, {
                method: 'post',
                body,
            })
                .then(res => res.json())
                .then(json => {
                    console.log('here',document.getElementById('root').classList);
                    document.getElementById('root').classList.remove('is-loading');
                    this.props._setDataFromServer(json);
                    this.setState({showPreloader: false})
                });
        }
    }

    render() {

        if (this.state.showPreloader) {
            return (
                <Preloder/>
            )
        } else {
            return (
                <div className="web-development">
                    <Sections/>
                    <Elements/>
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
