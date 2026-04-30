export const SORT_OPTIONS = {
    NAME_ASC: 'name_asc',
    NAME_DESC: 'name_desc',
    PRICE_ASC: 'price_asc',
    PRICE_DESC: 'price_desc',
}
export const getSortOptions = (sort) => {
    switch (sort) {
        case SORT_OPTIONS.NAME_ASC:
            return { productName: 1 }
        case SORT_OPTIONS.NAME_DESC:
            return { productName: -1 }
        case SORT_OPTIONS.PRICE_ASC:
            return { productPrice: 1 }
        case SORT_OPTIONS.PRICE_DESC:
            return { productPrice: -1 }
        default:
            return { _id: -1 }
    }
}
export const getSortDetails = (sort) => {
    switch (sort) {
        case SORT_OPTIONS.NAME_ASC: return { field: 'productName', direction: 1 }
        case SORT_OPTIONS.NAME_DESC: return { field: 'productName', direction: -1 }
        case SORT_OPTIONS.PRICE_ASC: return { field: 'productPrice', direction: 1 }
        case SORT_OPTIONS.PRICE_DESC: return { field: 'productPrice', direction: -1 }
        default: return { field: '_id', direction: -1 }
    }
}