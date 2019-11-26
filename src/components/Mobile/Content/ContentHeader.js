import React from 'react';
import {connect} from "react-redux";

import './ContentHeader.scss';

class ContentHeader extends React.Component {
    render() {

        const {header} = this.props;

        return (
            <div className="wdm-content-header">
                <div className='wdm-content-header__title'>{header.title}</div>
                <div className="wdm-content-header__description">{header.description}</div>
            </div>
        );
    }
}

const mapStateProp = state => ({
    header: state.content.header,
});

const mapDispachProps = dispatch => {
    return {}
};

export default connect(mapStateProp, mapDispachProps)(ContentHeader);
