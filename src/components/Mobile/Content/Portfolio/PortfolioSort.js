import React from 'react';

import '../../../../scss/Content/PortfolioSort.scss';

class PortfolioSort extends React.Component {
    constructor(props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(item) {

        const newState = {};

        if (this.props.by === item.code) {
            newState.order = (this.props.order === 'desc') ? 'asc' : 'desc';
        } else {
            newState.order = 'asc';
        }
        newState.by = item.code;

        this.props.updateSort(newState);
    }

    render() {

        const sortList = [
            {code: 'activeDate', title: "По дате"},
            {code: 'priceValue', title: "По цене"},
        ];

        return (
            <div className="dev-portfolio-sort">
                <div className="dev-portfolio-sort__title">Сортировать по:</div>
                <ul className="dev-portfolio-sort__variants">
                    {
                        sortList.map(item => {

                            let isActive = '';
                            let arrow = '↓';

                            if (item.code === this.props.by) {
                                isActive = 'is-active';
                                arrow = (this.props.order === 'asc') ? "↑" : '↓';
                            }

                            return <li key={item.code} className={isActive} onClick={() => {
                                this.clickHandler(item)
                            }}>{item.title} {arrow}</li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default PortfolioSort;