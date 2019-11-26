import React from 'react';
import {connect} from "react-redux";

import 'swiper/css/swiper.css';
import Swiper from "react-id-swiper";


import PortfolioItem from "./Portfolio/PortfolioItem";
import PortfolioSort from "./Portfolio/PortfolioSort";
import Sort from "../../../static-functions/Sort";

import {CONTENT__UPDATE_FILTER} from "../../../constants/content";
import Modal from "../../Modal";

import './ContentPortfolio.scss'
import PortfolioFilter from "./Portfolio/PortfolioFilter";

class ContentPortfolio extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sort: {by: 'activeDate', order: 'desc'},
            showModal: false,
        };

        this.swiperParams = {
            slidesPerView: 1,
            rebuildOnUpdate: true,
            spaceBetween: 30,
        };

        this.showModal = this.showModal.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.updateSort = this.updateSort.bind(this);
    }

    showModal(showModal) {
        this.setState({showModal});
    }

    // Обновляем стейт фильтра
    setFilter(value) {
        const {filter} = this.props;
        filter.value = value;

        this.props.updateFilter(filter);
    }

    // Обновляем стэйт блока сортировки
    updateSort(sort) {
        this.setState({sort});
    }

    render() {

        if (this.props.totalItems === 0) {
            return null;
        } else {

            const modal = this.state.showModal
                ? <Modal {...this.state.showModal} showModal={value => this.showModal(value)}/>
                : null;

            // Сортируем элементы
            const {sort} = this.state;

            let items;

            switch (sort.by) {
                case 'priceValue':
                    items = this.props.items.sort(((sort.order === 'desc')) ? Sort.byPriceDesc : Sort.byPriceAsc);
                    break;
                case 'activeDate':
                    items = this.props.items.sort(((sort.order === 'desc')) ? Sort.byDateDesc : Sort.byDateAsc);
                    break;
                default:

            }

            return (
                <div className="wdm-portfolio">
                    <div className="wdm-portfolio__title">Наши работы</div>
                    <div className="wdm-portfolio__block">
                        <PortfolioFilter filter={this.props.filter} setFilter={value => this.setFilter(value)}/>
                        <PortfolioSort {...this.state.sort} updateSort={value => this.updateSort(value)}/>
                    </div>


                    <Swiper {...this.swiperParams} >
                        {items.map(item => <div key={item.id}>
                            <PortfolioItem  {...item} showModal={value => this.showModal(value)}/>
                        </div>)}
                    </Swiper>

                    {modal}
                </div>
            );
        }
    }
}

const mapStateProp = state => ({
    totalItems: state.content.portfolio.totalItems,
    items: state.content.portfolio.items.filter(item => {
        const {value} = state.content.portfolio.filter;
        return item.priceValue <= value[1] && item.priceValue >= value[0]
    }),
    filter: state.content.portfolio.filter,

});

const mapDispachProps = dispatch => {
    return {
        updateFilter: filter => dispatch({type: CONTENT__UPDATE_FILTER, payload: filter}),
    }
};

export default connect(mapStateProp, mapDispachProps)(ContentPortfolio);