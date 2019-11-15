import React from 'react';
import {connect} from "react-redux";

import './../../scss/Content/ContentHeader.scss';

class ContentHeader extends React.Component {
    render() {

        const {header} = this.props;

        return (
            <div className="content-header">
                <div className='content-header__title'>{header.title}</div>
                <div className="content-header__description">{header.description}</div>
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
