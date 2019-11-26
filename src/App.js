import React from 'react';

import {Preloder} from "./components/Preloader";

import './scss/App.scss';
import DesktopApp from "./components/Desktop/DesktopApp";
import MobileApp from "./components/Mobile/MobileApp";
import {MobileXsApp} from "./components/MobileXs/MobileXsApp";
import {connect} from "react-redux";

import {SECTIONS__SET_ITEMS} from "./constants/sections";
import {CURRENT__SET_ITEMS} from "./constants/current";
import {ELEMENTS__SET_ITEMS} from "./constants/elements";
import {CONTENT__SET_ITEMS} from "./constants/content";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showPreloader: true,
            windowWidth: window.innerWidth,
        };

        this.url = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://dima.temploid.ru' : "";
        this.url += '/local/ajax/web-development.php';

        this.firstLoad = true; // TODO Костыль для корневого раздела, надо что-то придумать другое

        this.getDataFromServer = this.getDataFromServer.bind(this);

        this.onWindowResize = this.onWindowResize.bind(this);
    }

    onWindowResize() {
        console.log('onWindowResize');
        this.setState({windowWidth: window.innerWidth});
    }

    componentDidMount() {
        const {params} = this.props.match;
        this.getDataFromServer(params);
        window.addEventListener('resize', this.onWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {params} = this.props.match;
        this.getDataFromServer(params);
    }

    getDataFromServer(params) {

        let formBody = {};
        formBody.sectionCode = params.sectionCode || null;
        formBody.elementCode = params.elementCode || null;

        let getData = false; // Флаг на получение данных


        if (formBody.elementCode === null) {
            getData = (formBody.sectionCode !== this.props.current.sectionCode);
        } else {
            getData = (
                formBody.sectionCode !== this.props.current.sectionCode ||
                formBody.elementCode !== this.props.current.elementCode
            );
        }

        // TODO Костыль чтобы на корневой ссылке не зацикливало. Сделать нормально
        if (formBody.sectionCode !== null || formBody.elementCode !== null) this.firstLoad = true;

        // Проверяем state чтобы не соответствовал текущему запросу на cервер для избежания зацикливания
        if (getData && this.firstLoad) {

            document.getElementById('root').classList.add('is-loading');

            // TODO Костыль чтобы на корневой ссылке не зацикливало. Сделать нормально
            if (formBody.sectionCode === null && formBody.elementCode === null && this.firstLoad) this.firstLoad = false;

            formBody = JSON.stringify(formBody);

            fetch(this.url, {
                method: 'post',
                body: formBody,
            })
                .then(res => res.json())
                .then(json => {
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

            const windowWidth = window.innerWidth;

            const deviceType = (windowWidth < 200)
                ? <MobileXsApp />
                : (windowWidth < 1024)
                    ? <MobileApp/>
                    : <DesktopApp/>;

            return (<div>
                {deviceType}
            </div>)
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