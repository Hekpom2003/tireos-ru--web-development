import React from 'react';

import Sections from "./Sections";
import Elements from "./Elemens";
import ContentHeader from "./Content/ContentHeader";

import './MobileApp.scss';
import ContentInfo from "./Content/ContentInfo";
import ContentPortfolio from "./Content/ContentPortfolio";

class MobileApp extends React.Component {
    render() {
        return (
            <div className="web-dev-mobile">
                <div className="web-dev-mobile__header">
                    <Sections/>
                    <Elements/>
                </div>
                <div className="wdm-content">
                    <ContentHeader/>
                    <ContentInfo />
                    <ContentPortfolio/>
                </div>
            </div>
        );
    }
}

export default MobileApp;