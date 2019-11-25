import React from 'react';
import Sections from "../Mobile/Sections";
import Elements from "../Mobile/Elemens";
import Content from "../Mobile/Content";

import './../../scss/Mobile/Mobile.scss';

class Mobile extends React.Component{
    render() {
        return (
            <div class="web-dev-mobile">
                <Sections/>
                <Elements/>
                <Content/>
            </div>
        );
    }
}

export default Mobile;