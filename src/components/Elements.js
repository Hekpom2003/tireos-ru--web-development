import React from 'react';
import {connect} from "react-redux";
import './../scss/Elements.scss'

class Elements extends React.Component{
    render() {
        return (
            <ul className="div-elements-list">
                {this.props.elements.map( item => {

                    const isActive = (item.id === this.props.currentElementId)?'is-active':"";

                    return <li key={item.id} className={isActive} onClick={()=>this.props.changeElement(item.id)}>
                        <div className='div-elements-list__title'>{item.name}</div>
                        <div className='div-elements-list__price'>{item.priceText}</div>
                    </li>
                })}
            </ul>
        );
    }
}

const mapStateProp = state => ({
    elements: state.elements,
    currentElementId: state.current.elementId,
});

const mapDispachProps = dispatch => {
    return {}
};

export default connect(mapStateProp, mapDispachProps)(Elements);
