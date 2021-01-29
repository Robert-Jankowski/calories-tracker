import React from "react"

const Product = ({product}) => {

    const AddButton = () => {
        return(
            <button onClick={() => {

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
export default Product