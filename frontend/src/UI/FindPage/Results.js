import React from 'react'
import selectors from "../../state/ducks/products/selectors";
import Product from "../FindPage/Product";
import {connect} from "react-redux"

const Results = ({finderInput, products, meal, fetched}) => {

    const list = (fetched.isFetched) ? fetched.list : selectors.productsByQuery(products, finderInput)

    const ListOfProducts = () => {
        return(
            <ul>
                {list?.map(product => {
                    return(
                        <Product product={product} meal={meal}/>
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
const mapStateToProps = (state) => {
    return {
        fetched: state.fetchedProducts
    }
}

export default connect(mapStateToProps)(Results)