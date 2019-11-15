import React from 'react';

import './../../scss/Content/PortfolioItem.scss';

class PortfolioItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeImageIndex: 0,
        };

        this.changeImageHandler = this.changeImageHandler.bind(this);
    }

    changeImageHandler(activeImageIndex) {
        this.setState({activeImageIndex})
    }


    render() {
        const picture = this.props.pictures[this.state.activeImageIndex];

        return (
            <div className="dev-portfolio-item">
                <ul className="dev-portfolio-item__image" style={{backgroundImage: "url('" + picture + "')"}}>
                    {
                        this.props.pictures.map((item, index) => {
                            const isActive = (index === this.state.activeImageIndex) ? 'is-active' : '';
                            return <li onMouseEnter={() => this.changeImageHandler(index)} className={isActive}
                                       key={index}/>
                        })
                    }
                </ul>

                <div className="dev-portfolio-item__row dev-portfolio-item__row--title">
                    <div className="dev-portfolio-item__title">
                        <a href={this.props.link} className="dev-portfolio-item__name">{this.props.name}</a>
                    </div>
                    <div className="dev-portfolio-item__value">
                        {this.props.price}
                    </div>
                </div>
                <div className="dev-portfolio-item__props">
                    {
                        this.props.props.map((item, index) => {

                            const descrition = item.description
                                ? <div className="dev-portfolio-item__description">{item.description}</div>
                                : null;

                            return <div className="dev-portfolio-item__row" key={index}>
                                <div className="dev-portfolio-item__title"><span>{item.name}</span></div>
                                <div className="dev-portfolio-item__value"><span>{item.value}</span></div>
                                {descrition}
                            </div>
                        })
                    }
                </div>

                <div className="dev-portfolio-item__buttons">
                    <a href={this.props.link} className="btn btn--primary-color" role="button">Подробнее</a>
                    <a href={this.props.link} className="btn btn--primary-color" role="button">Взять за основу</a>
                </div>
            </div>
        );
    }

}

export default PortfolioItem;