import React from 'react'
import ProductFinder from "../FindPage/ProductFinder";
import Footer from "../FindPage/Footer";
import Results from "../FindPage/Results";

const FindPage = () => {
    return (
        <main>
            <ProductFinder/>
            <Results/>
            <Footer/>
        </main>
    )
}
export default FindPage