import React from 'react';
import {connect} from "react-redux";

import '../../../scss/Content/ContentServices.scss';

class ContentServices extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showAll: false,
        };

        this.getButton = this.getButton.bind(this);
        this.drawItems = this.drawItems.bind(this);
        this.stateHandler = this.stateHandler.bind(this);
    }

    stateHandler() {
        this.setState({showAll: !this.state.showAll});
    }

    drawItems() {

        const items = this.state.showAll ? this.props.services : this.props.services.slice(0, 8);

        return <ul>
            {
                items.map(item => {
                    return <li key={item.id}>
                        <div className="dev-services-list__title">{item.name}</div>
                        <div className="dev-services-list__price">{item.price}</div>
                    </li>
                })
            }
        </ul>

    }

    getButton() {

        if (this.props.services.length > 8) {

            const countItems = this.props.services.length - 8;

            const text = (this.state.showAll) ? 'Серыть' : 'Показать еще';

            return <div className="dev-services-list__show-more">
                <button className="btn btn--primary-color" onClick={this.stateHandler}>{text} ({countItems})</button>
            </div>
        } else {
            return null;
        }
    }

    render() {

        if (this.props.services.length === 0) {
            return null;
        } else {

            return (
                <div className="dev-services-list">

                    <h2>Вам может понадобиться</h2>

                    {this.drawItems()}

                    {this.getButton()}

                </div>
            );
        }
    }
}

const mapStateProp = state => ({
    services: state.content.services,
});

const mapDispachProps = dispatch => {
    return {}
};

export default connect(mapStateProp, mapDispachProps)(ContentServices);
