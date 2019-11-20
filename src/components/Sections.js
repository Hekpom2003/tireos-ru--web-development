import React from 'react';
import {connect} from 'react-redux';

import './../scss/Sections.scss';
import {Link} from "react-router-dom";

class Sections extends React.Component {
    render() {
        return (
            <ul className='web-development__sections dev-sections-list'>
                {
                    this.props.sections.map(item => {
                        const isActive = item.code === this.props.currentSectionCode ? 'is-active' : '';

                        return <li key={item.id} className={isActive}>
                            <Link to={"/development/" + item.code + '/'}>
                                <div className="dev-sections-list__icon">
                                    <svg className="svg-icon" role="img">
                                        <use
                                            xlinkHref={"/local/templates/temploid/images/svg/sprites.svg#" + item.icon}/>
                                    </svg>
                                </div>
                                <div className="dev-sections-list__text">{item.name}</div>
                            </Link>
                        </li>
                    })
                }
            </ul>
        );
    }
}

const mapStateProp = state => ({
    sections: state.sections,
    currentSectionCode: state.current.sectionCode,
});

const mapDispachProps = dispatch => {
    return {}
};

export default connect(mapStateProp, mapDispachProps)(Sections);
