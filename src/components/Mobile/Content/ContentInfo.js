import React from 'react';
import {connect} from "react-redux";

import './ContentInfo.scss';

class ContentInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfo: false,
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(showInfo) {
        this.setState({showInfo})
    }


    drawInfo() {

        const item = this.props.info[this.state.showInfo];

        return <div className="wdm-info-modal">
            <div className="wdm-info-modal__overlay" onClick={()=>{this.handleClick(false)}}/>
            <div className="wdm-info-modal__body">
                <div className="wdm-info-modal__close" onClick={()=>{this.handleClick(false)}}/>
                <div className="wdm-info-modal__content">
                    <h2>{item.name}</h2>
                    <div className="price">Цена: {item.priceText}</div>
                    <div className="description">{item.description}</div>
                </div>
            </div>
        </div>
    }

    render() {

        const modal = (this.state.showInfo !== false) ? this.drawInfo() : null;

        return (
            <div className="wdm-content-info">
                <ul className="">
                    {
                        this.props.info.map((item, index) =>
                            <li key={item.id} onClick={() => this.handleClick(index)}>
                                <div className="wdm-content-info__title">
                                {item.name} <span>?</span>
                                </div>
                                <div className="wdm-content-info__price">{item.priceText}</div>
                            </li>
                        )
                    }
                </ul>

                {modal}
            </div>
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
