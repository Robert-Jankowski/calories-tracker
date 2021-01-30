import React from 'react'
import operations from "../../state/ducks/meals/operations";
import {connect} from "react-redux";

const Product = ({product, replaceMeal, userId, meal}) => {

    const ProductName = () => {
        return(
            <h3>{product.name}</h3>
        )
    }
    const DeleteButton = () => {
        return(
            <button onClick={() => {
                replaceMeal(userId, {...meal,
                    products: [...meal.products.filter(p => p.id !== product.id)].map(p => p.id)})
            }}>Delete</button>
        )
    }
    const ProductNutrition = () => {
        return(
            <React.Fragment>
                <p>{product.calories} kcal</p>
                <p>{product.proteins} proteins</p>
                <p>{product.carbs} carbs</p>
                <p>{product.fats} fats</p>
            </React.Fragment>
        )
    }

    return(
        <li key={`product${product.id}`}>
            <div>
                <ProductName />
                <DeleteButton />
                <ProductNutrition />
            </div>
        </li>

    )
}
const mapStateToProps = (state) => {
    return {
        userId: state.userState.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        replaceMeal: (userId, meal) => dispatch(operations.replaceMeal(userId, meal))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)