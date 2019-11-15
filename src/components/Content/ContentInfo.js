import React from 'react';
import {connect} from "react-redux";

import './../../scss/Content/ContentInfo.scss';

class ContentInfo extends React.Component {
    render() {
        return (

            <ul className="dev-info-list">
                {
                    this.props.info.map(item =>
                        <li key={item.id}>
                            <div className="dev-info-list__name">{item.name}</div>
                            <div className="dev-info-list__price">{item.priceText}</div>
                            <div className="dev-info-list__description">{item.description}</div>
                        </li>
                    )
                }
            </ul>
        );
    }
}

const mapStateProp = state => ({
    info: state.content.info,
});

const mapDispachProps = dispatch => {
    return {}
};

export default connect(mapStateProp, mapDispachProps)(ContentInfo);
