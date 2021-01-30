import React, {useState} from 'react'
import ProductFinder from "../FindPage/ProductFinder";
import Footer from "../FindPage/Footer";
import Results from "../FindPage/Results";
import {connect} from "react-redux";
import operations from "../../state/ducks/products/operations";
import selectors from "../../state/ducks/products/selectors";

const FindPage = ({products, findProducts, meal}) => {

    const [finderInput, setFinderInput] = useState("")

    return (
        <main>
            <ProductFinder finderInput={finderInput} setFinderInput={setFinderInput} findProducts={findProducts}/>
            <Results finderInput={finderInput} products={products} meal={meal}/>
            <Footer/>
        </main>
    )
}
const mapStateToProps = (state) => {
    return {
        products: selectors.products(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        findProducts: (query) => dispatch(operations.findProducts(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindPage)