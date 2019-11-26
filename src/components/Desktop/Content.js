import React from 'react';
import ContentHeader from "./Content/ContentHeader";
import ContentServices from "./Content/ContentServices";
import ContentInfo from "./Content/ContentInfo";
import ContentPortfolio from "./Content/ContentPortfolio";

class Content extends React.Component{
    render() {
        return (
            <div>
                <ContentHeader/>
                <ContentInfo/>
                <ContentServices/>
                <ContentPortfolio/>
            </div>
        );
    }
}

export default Content;