const products = (state) => {
    return state.entities.products.allIds
        .map(productId => ({
            id: productId,
            name: state.entities.products.byId[productId].name,
            calories: state.entities.products.byId[productId].calories,
            proteins: state.entities.products.byId[productId].proteins,
            carbs: state.entities.products.byId[productId].carbs,
            fats: state.entities.products.byId[productId].fats}))
}
const productsByQuery = (products, query) => {
    return (query.length > 0) ? products?.filter(product => product.name.startsWith(query)) : []
}

const productsSelectors = {
    products, productsByQuery
}
export default productsSelectors