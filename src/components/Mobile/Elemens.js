import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import './Elements.scss';

class Elements extends React.Component{
    render() {
        return (
            <div className="wdm-elements">
                <div className="wdm-elements__title">Вид решения</div>

                <ul className="wdm-elements__items">
                    {this.props.elements.map(item => {

                        const {current} = this.props;

                        const isActive = (item.code === current.elementCode) ? 'is-active' : "";

                        return <li key={item.id} className={isActive}>
                            <Link to={"/development/" + current.sectionCode + '/' + item.code + '/'}>
                                {item.name}
                            </Link>
                        </li>
                    })}
                </ul>
            </div>

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