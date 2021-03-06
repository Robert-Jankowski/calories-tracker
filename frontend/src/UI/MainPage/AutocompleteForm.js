// REACT, REDUX
import React, {useState, useEffect} from "react";
import {connect} from "react-redux";

// SELECTORS, ACTIONS, OPERATIONS
import selectors from "../../state/ducks/products/selectors";
import {default as productsOperations} from "../../state/ducks/products/operations";
import {default as mealsOperations} from "../../state/ducks/meals/operations";
import {default as daysOperations} from "../../state/ducks/days/operations";
import actions from "../../state/ducks/products/actions";

// Material-UI
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import TableCell from "@material-ui/core/TableCell";


const AutocompleteForm = ({products, fetched, addProduct, replaceMeal, resetFetched, productIds, userId, meal, findProducts}) => {

    const [finderInput, setFinderInput] = useState("")
    const [list, setList] = useState(products)

    useEffect(() => {
        setList([...selectors.productsByQuery(products, finderInput), ...fetched.list])
        setList(products)
    }, [finderInput])

    useEffect(() => {
        if(fetched.isFetched) {
            setList(fetched.list)
        }
    },[fetched])

    const AddButton = ({product}) => {
        return(
            <div
                onClick={() => {
                    if(!([...meal.products.map(p => p.id)].includes(product.id))) {
                        if (!(product.id in productIds))
                            addProduct(userId, product)
                        replaceMeal(userId, {...meal, products: [...meal.products.map(p => p.id), product.id]})
                        resetFetched()
                    }
            }}
            >{product.name}
            </div>
        )
    }

    return (
        <>
            <TableCell>
        <Autocomplete
            onInputChange={(e, input) => setFinderInput(input)}
            disableClearable
            freeSolo
            size="small"
            options={list}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            renderOption={(option) => (
                <AddButton product={option}/>
            )}
            renderInput={(params) =>
                <TextField
                    {...params}
                    label="find product"
                    variant="outlined"
                />
            }
        />
            </TableCell>
            <TableCell>
            <Button variant="outlined"
            onClick={() => {
                findProducts(finderInput)
            }}
            >FIND</Button>
            </TableCell>
            </>

    )
}
const mapStateToProps = (state) => {
    return {
        products: selectors.products(state),
        fetched: state.fetchedProducts,
        productIds: state.entities.products.allIds,
        userId: state.userState.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        findProducts: (query) => dispatch(productsOperations.findProducts(query)),
        deleteMeal: (userId, mealId) => dispatch(mealsOperations.deleteMeal(userId, mealId)),
        updateDay: (userId, day) => dispatch(daysOperations.updateDay(userId, day)),
        addProduct: (userId, product) => dispatch(productsOperations.addProduct(userId, product)),
        replaceMeal: (userId, meal) => dispatch(mealsOperations.replaceMeal(userId, meal)),
        resetFetched: () => dispatch(actions.resetFetched())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AutocompleteForm)