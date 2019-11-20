class Sort {

    static byDateAsc(a, b) {
        if (a.activeFrom === b.activeFrom) return 0;
        return a.activeFrom > b.activeFrom ? 1 : -1;
    }

    static byDateDesc(a, b) {
        if (a.activeFrom === b.activeFrom) return 0;
        return a.activeFrom > b.activeFrom ? -1 : 1;
    }

    static byPriceAsc(a, b) {
        if (a.priceValue === b.priceValue) return 0;
        return a.priceValue > b.priceValue ? 1 : -1;
    }

    static byPriceDesc(a, b) {
        if (a.priceValue === b.priceValue) return 0;
        return a.priceValue > b.priceValue ? -1 : 1;
    }
}

export default Sort;