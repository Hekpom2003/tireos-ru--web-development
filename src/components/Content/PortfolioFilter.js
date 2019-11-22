import React from 'react';
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';

import './../../scss/Content/PortfolioFilter.scss'

class PortfolioFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.props.filter,
            allowCross: false,
        };

        this.timeoutHandler = false;

        this.sendToParent = this.sendToParent.bind(this);
        this.minPriceChange = this.minPriceChange.bind(this);
        this.maxPriceChange = this.maxPriceChange.bind(this);
    }

    sendToParent() {
        clearTimeout(this.timeoutHandler);

        this.timeoutHandler = setTimeout(() => {
            this.props.setFilter(this.state.value);
        }, 700);
    }

    onSliderChange = (value) => {
        this.setState({value,});
        this.sendToParent()
    }

    minPriceChange(e) {
        let newValue = +e.target.value;
        const {value} = this.state;

        if (newValue > value[1]) newValue = value[1];

        if (isNaN(newValue)) newValue = value[0];

        value[0] = newValue;

        this.setState({value})

    }

    maxPriceChange(e) {
        let newValue = +e.target.value;
        const {value} = this.state;

        if (newValue < value[0]) newValue = value[0];

        if (isNaN(newValue)) newValue = value[1];

        value[1] = newValue;

        this.setState({value})
    }

    render() {

        const minPricePrint = new Intl.NumberFormat('ru-RU', { minimumFractionDigits:0 }).format(this.state.value[0]);
        const maxPricePrint = new Intl.NumberFormat('ru-RU', { minimumFractionDigits:0 }).format(this.state.value[1]);

        return (
            <div className="dev-portfolio-filter">
                <div className="dev-portfolio-filter__price">
                    <input type="text" name="min-price" value={minPricePrint}
                           onChange={e => this.minPriceChange(e)}/>
                    <Range allowCross={false} value={this.state.value} min={this.state.min} max={this.state.max} onChange={this.onSliderChange}/>
                    <input type="text" name="max-price" value={maxPricePrint}
                           onChange={e => this.maxPriceChange(e)}/>
                </div>
            </div>
        );
    }
}

export default PortfolioFilter;