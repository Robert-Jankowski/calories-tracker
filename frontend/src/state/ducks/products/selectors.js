const products = (state) => {
    return state.entities.products.allIds
        .map(productId => ({id: productId, name: state.entities.products.byId[productId].name}))
}
const productsByQuery = (products, query) => {
    return (query.length > 0) ? products?.filter(product => product.name.startsWith(query)) : []
}

const productsSelectors = {
    products, productsByQuery
}
export default productsSelectors