import React from 'react';
import {connect} from "react-redux";
import './../scss/Elements.scss'
import {Link} from 'react-router-dom';

class Elements extends React.Component {
    render() {
        return (
            <ul className="div-elements-list">
                {this.props.elements.map(item => {

                    const {current} = this.props;

                    const isActive = (item.code === current.elementCode) ? 'is-active' : "";

                    return <li key={item.id} className={isActive}>
                        <Link to={"/development/" + current.sectionCode + '/' + item.code + '/'}>
                            <div className='div-elements-list__title'>{item.name}</div>
                            <div className='div-elements-list__price'>{item.priceText}</div>
                        </Link>
                    </li>
                })}
            </ul>
        );
    }
}

const mapStateProp = state => ({
    elements: state.elements,
    current: state.current,
});

const mapDispachProps = dispatch => {
    return {}
};

export default connect(mapStateProp, mapDispachProps)(Elements);
