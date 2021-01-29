import React from 'react'

const Product = ({product}) => {

    const ProductName = () => {
        return(
            <h3>{product.name}</h3>
        )
    }
    const DeleteButton = () => {
        return(
            <button>Delete</button>
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

export default Product