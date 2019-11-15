import React from 'react';

import 'swiper/css/swiper.css';
import Swiper from "react-id-swiper";
import {connect} from "react-redux";
import PortfolioItem from "./PortfolioItem";

import './../../scss/Content/ContentPortfolio.scss'
import PortfolioSort from "./PortfolioSort";
import PortfolioFilter from "./PortfolioFilter";

class ContentPortfolio extends React.Component {
    constructor(props) {
        super(props);

        const {price} = this.props.portfolio;
        price.minPrice = +price.minPrice;
        price.maxPrice = +price.maxPrice;

        this.state = {
            filter: {
                value: [price.minPrice, price.maxPrice],
                defaultValue: [price.minPrice, price.maxPrice],
                min: price.minPrice,
                max: price.maxPrice,
            },
            sort: {by: 'activeDate', order: 'desc'},
        };

        this.setFilter = this.setFilter.bind(this);
        this.updateSort = this.updateSort.bind(this);
    }

    // Обновляем стейт фильтра
    setFilter(value) {
        const {filter} = this.state;
        this.setState({...filter, value});
    }

    // Обновляем стэйт блока сортировки
    updateSort(sort) {
        this.setState({sort});
    }

    sortByDateAsc(a, b) {
        if (a.activeFrom === b.activeFrom) return 0;
        return a.activeFrom > b.activeFrom ? 1 : -1;
    }

    sortByDateDesc(a, b) {
        if (a.activeFrom === b.activeFrom) return 0;
        return a.activeFrom > b.activeFrom ? -1 : 1;
    }

    sortByPriceAsc(a, b) {
        if (a.priceValue === b.priceValue) return 0;
        return a.priceValue > b.priceValue ? 1 : -1;
    }

    sortByPriceDesc(a, b) {
        if (a.priceValue === b.priceValue) return 0;
        return a.priceValue > b.priceValue ? -1 : 1;
    }

    render() {

        const params = {
            slidesPerView: 3,
            spaceBetween: 30,
            rebuildOnUpdate: true,
        };

        // Фильтруем элементы
        let items = this.props.portfolio.items.filter(item => {
            const {value} = this.state.filter;
            const priceValue = +item.priceValue;
            return priceValue <= value[1] && priceValue >= value[0]
        });

        // Сортируем элементы
        const {sort} = this.state;

        switch (sort.by) {
            case 'priceValue':
                items = items.sort(((sort.order === 'desc')) ? this.sortByPriceDesc : this.sortByPriceAsc);
                break;
            case 'activeDate':
                items = items.sort(((sort.order === 'desc')) ? this.sortByDateDesc : this.sortByDateAsc);
                break;
        }


        return (
            <div className="dev-content-portfolio">
                <div className="dev-content-portfolio__block">
                    <PortfolioFilter filter={this.state.filter} setFilter={value => this.setFilter(value)}/>
                    <PortfolioSort {...this.state.sort} updateSort={value => this.updateSort(value)}/>
                </div>


                <Swiper {...params} >
                    {items.map(item => <div key={item.id}><PortfolioItem  {...item}/></div>)}
                </Swiper>
            </div>
        );
    }
}

const mapStateProp = state => ({
    portfolio: state.content.portfolio,
});

const mapDispachProps = dispatch => {
    return {}
};

export default connect(mapStateProp, mapDispachProps)(ContentPortfolio);