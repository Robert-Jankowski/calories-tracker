import { createSelector } from 'reselect'

const daysById = (state) => state.entities.days.byId
const mealsById = (state) => state.entities.meals.byId
const productsById = (state) => state.entities.products.byId
const allDays = (state) => state.entities.days.allIds?.map(id => daysById(state)[id])


const days = createSelector(allDays, mealsById, productsById, (daysArray, mealsById, productsById) => {
    console.log({daysArray, mealsById, productsById})
    return daysArray?.map(day => ({...day, meals: day.meals.map(mealId => {
        const meal = mealsById[mealId] || {}
            return {...meal, products: meal?.products?.map(productId => productsById[productId])}
    })}))
})
const mealsByDay = (state) => days(state).find(d => d.id === state.displayedDate)


const selectors = {
    mealsByDay
}
export default selectors