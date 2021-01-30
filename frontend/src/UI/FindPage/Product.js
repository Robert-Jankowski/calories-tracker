import React from "react"
import {connect} from "react-redux";
import {default as productsOperations} from "../../state/ducks/products/operations";
import {default as mealsOperations} from "../../state/ducks/meals/operations";
import actions from "../../state/ducks/products/actions"

const Product = ({product, productIds, userId, addProduct, replaceMeal, meal, resetFetched}) => {
    const AddButton = () => {
        return(
            <button onClick={() => {
                if (!(product.id in productIds))
                    addProduct(userId, product)
                replaceMeal(userId, {...meal, products: [...meal.products.map(p => p.id), product.id]})
                resetFetched()

            }}>Add</button>
        )
    }
    const ProductInfo = () => {
        return(
            <p>{product.name}</p>
        )
    }

    return(
        <li key={product.id}>
            <div>
                <ProductInfo />
                <AddButton />
            </div>
        </li>
    )
}
const mapStateToProps = (state) => {
    return {
        productIds: state.entities.products.allIds,
        userId: state.userState.userId
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (userId, product) => dispatch(productsOperations.addProduct(userId, product)),
        replaceMeal: (userId, meal) => dispatch(mealsOperations.replaceMeal(userId, meal)),
        resetFetched: () => dispatch(actions.resetFetched())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Product)