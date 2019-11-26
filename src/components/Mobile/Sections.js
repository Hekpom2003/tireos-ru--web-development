import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import './Sections.scss';

class Sections extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            opened: '',
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({opened: (this.state.opened === '') ? 'is-opened' : ''});
    }

    render() {

        let current = {}, items = [];

        for (let section of this.props.sections) {
            if (section.code === this.props.current.sectionCode) {
                current = section;
            } else {
                items.push(section);
            }
        }

        return (
            <div className="wdm-sections">
                <div className="wdm-sections__title">Тип сайта</div>
                <div className={"select-box " + this.state.opened}>
                    <div className="select-box__value" onClick={this.handleClick}>{current.name}</div>
                    <ul className="select-box__items">
                        {
                            items.map(item => {
                                return <li key={item.code}>
                                    <Link to={"/development/" + item.code + '/'} onClick={this.handleClick}>
                                        {item.name}
                                    </Link>
                                </li>
                            })
                        }

                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateProp = state => ({
    current: state.current,
    sections: state.sections,
});

const mapDispachProps = dispatch => {
    return {}
};

export default connect(mapStateProp, mapDispachProps)(Sections);