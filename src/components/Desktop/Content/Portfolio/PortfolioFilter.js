import React from 'react';
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';

import '../../../../scss/Content/PortfolioFilter.scss'

class PortfolioFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allowCross: false,
            focusEvent: false,
        };

        this.handlerChange = this.handlerChange.bind(this);
        this.onSliderChange = this.onSliderChange.bind(this);
    }

    handlerChange(e, index) {
        const value = e.target.value.replace(/\s/g, '');
        const oldValue = this.props.filter.value[index];
        console.log({value, oldValue});

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
                    <input type="text" name="min-price" value={priceText[0]}
                           onChange={e => this.handlerChange(e, 0)}
                           onFocus={() => this.setState({focusEvent: 0})}
                           onBlur={()=> this.setState({focusEvent:false})}
                    />
                    <Range allowCross={false} value={filter.value} min={filter.min} max={filter.max}
                           onChange={this.onSliderChange}/>
                    <input type="text" name="max-price" value={priceText[1]}
                           onChange={e => this.handlerChange(e, 1)}
                           onFocus={() => this.setState({focusEvent: 1})}
                           onBlur={()=> this.setState({focusEvent:false})}
                    />
                </div>
            </div>
        );
    }
}

export default PortfolioFilter;