import React from 'react';
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';

import '../../../../scss/Content/PortfolioFilter.scss'

class PortfolioFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allowCross: false,
        };

        this.onSliderChange = this.onSliderChange.bind(this);
    }

    onSliderChange = (value) => {
        this.props.setFilter(value);
    };

    priceText(index) {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
        }).format(this.props.filter.value[index]);
    }

    render() {

        const {filter} = this.props;

        const priceText = {};
        priceText[0] = (this.state.focusEvent === 0) ? filter.value[0] : this.priceText(0);
        priceText[1] = (this.state.focusEvent === 1) ? filter.value[1] : this.priceText(1);

        return (
            <div className="dev-portfolio-filter">
                <div className="dev-portfolio-filter__price">
                    <input type="text" name="min-price" value={priceText[0]} readOnly={true}/>
                    <Range allowCross={false} value={filter.value} min={filter.min} max={filter.max}
                           onChange={this.onSliderChange}/>
                    <input type="text" name="max-price" value={priceText[1]} readOnly={true}/>
                </div>
            </div>
        );
    }
}

export default PortfolioFilter;