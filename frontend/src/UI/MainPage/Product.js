import React from 'react'

const Product = ({product}) => {

    return(
        <li key={`product${product.id}`}>
            <div>
                <h3>{product.name}</h3>
                <button>Delete</button>
                <p>{product.calories} kcal</p>
                <p>{product.proteins} proteins</p>
                <p>{product.carbs} carbs</p>
                <p>{product.fats} fats</p>
            </div>
        </li>

    )
}

export default Product