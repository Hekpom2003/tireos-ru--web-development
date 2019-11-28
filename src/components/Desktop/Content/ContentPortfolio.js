import React from 'react';

import 'swiper/css/swiper.css';
import {connect} from "react-redux";

import '../../../scss/Content/ContentPortfolio.scss'
import PortfolioSort from "./Portfolio/PortfolioSort";
import PortfolioFilter from "./Portfolio/PortfolioFilter";

import Sort from "../../../static-functions/Sort";
import {CONTENT__UPDATE_FILTER} from "../../../constants/content";
import Modal from "../../Modal";
import {PortfolioSlider} from "./Portfolio/PortfolioSlider";

class ContentPortfolio extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sort: {by: 'activeDate', order: 'desc'},
            showModal: false,
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
                <div className="dev-content-portfolio">
                    <div className="dev-content-portfolio__block">
                        <PortfolioFilter filter={this.props.filter} setFilter={value => this.setFilter(value)}/>
                        <PortfolioSort {...this.state.sort} updateSort={value => this.updateSort(value)}/>
                    </div>

                    <PortfolioSlider items={items}/>

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
