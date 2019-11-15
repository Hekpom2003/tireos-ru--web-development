import React from 'react';
import {connect} from 'react-redux';

import './../scss/Sections.scss';

class Sections extends React.Component {
    render() {
        return (
            <ul className='web-development__sections dev-sections-list'>
                {
                    this.props.sections.map(item => {
                        const isActive = item.id === this.props.currentSectionId ? 'is-active' : '';

                        return <li key={item.id} className={isActive} onClick={() => this.props.changeSection(item.id)}>
                            <div className="dev-sections-list__icon">
                                <svg className="svg-icon" role="img">
                                    <use xlinkHref={"/local/templates/temploid/images/svg/sprites.svg#" + item.icon}/>
                                </svg>
                            </div>
                            <div className="dev-sections-list__text">{item.name}</div>
                        </li>
                    })
                }
            </ul>
        );
    }
}

const mapStateProp = state => ({
    sections: state.sections,
    currentSectionId: state.current.sectionId,
});

const mapDispachProps = dispatch => {
    return {}
};

export default connect(mapStateProp, mapDispachProps)(Sections);
