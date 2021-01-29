import React from 'react'
import selectors from "../../state/ducks/products/selectors";
import Product from "../FindPage/Product";

const Results = ({finderInput, products}) => {

    const productsByQuery = selectors.productsByQuery(products, finderInput)

    const ListOfProducts = () => {
        return(
            <ul>
                {productsByQuery?.map(product => {
                    return(
                        <Product product={product}/>
                    )
                })}
            </ul>
        )
    }

    return(
        <section>
            <ListOfProducts />
        </section>
    )
}
export default Results