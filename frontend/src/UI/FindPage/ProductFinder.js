import React from 'react'

const ProductFinder = ({finderInput, setFinderInput, findProducts}) => {
    
    const FinderInput = () => {
        return (
            <input type="text" value={finderInput} onChange={(e) => setFinderInput(e.target.value)}/>
        )
    }

    const FinderButton = () => {
        return(
            <button onClick={() => {
                findProducts(finderInput)
            }}>Find</button>
        )
    }

    return(
        <section>
            <FinderInput />
            <FinderButton />
        </section>
    )
}
export default ProductFinder