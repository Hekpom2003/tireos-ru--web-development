import React  from 'react';
import Swiper from "react-id-swiper";
import PortfolioItem from "./PortfolioItem";

export const PortfolioSlider = (props) => {

    const params = {
        slidesPerView: 3,
        spaceBetween: 30,
        rebuildOnUpdate: true,
        speed: 300,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
    };

    return (
        <Swiper {...params} >
            {props.items.map(item => <div key={item.id}>
                <PortfolioItem  {...item} showModal={value => this.showModal(value)}/>
            </div>)}
        </Swiper>
    )
};
