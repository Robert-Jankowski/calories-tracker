import { createSelector } from 'reselect'

const daysById = (state) => state.entities.days.byId
const mealsById = (state) => state.entities.meals.byId
const productsById = (state) => state.entities.products.byId
const allDays = (state) => state.entities.days.allIds?.map(id => daysById(state)[id])


const days = createSelector(allDays, mealsById, productsById, (daysArray, mealsById, productsById) => {

    return daysArray?.map(day => ({...day, meals: day.meals.map(mealId => {
        const meal = mealsById[mealId] || {}
            return {...meal, products: meal?.products?.map(productId => productsById[productId])}
    })}))
})
const mealsByDay = (state) => days(state).find(d => d.id === state.displayedDate)

const dailyStatistics = (state) => days(state)?.map(day => {
    const initialState = {calories: 0, carbs: 0, fats: 0, proteins: 0}

    const nutrition = day?.meals?.reduce((meal_acc,meal_next) => {
        const meal = meal_next?.products?.reduce((prod_acc, prod_next) => ({
            calories: prod_acc.calories + prod_next.calories,
            carbs: prod_acc.carbs + prod_next.carbs,
            proteins: prod_acc.proteins + prod_next.proteins,
            fats: prod_acc.fats + prod_next.fats,
        }), initialState)
        return meal ? ({
            calories: meal_acc.calories + meal.calories,
            carbs: meal_acc.carbs + meal.carbs,
            proteins: meal_acc.proteins + meal.proteins,
            fats: meal_acc.fats + meal.fats,
        }) : initialState
    },initialState)
    return({
        id: day.id,
        ...nutrition
    })
})

const sumsByMeal = (state) =>
    mealsByDay(state)?.meals.map(meal => {
        const initialState = {calories: 0, carbs: 0, fats: 0, proteins: 0}
        const nutrition = meal?.products?.reduce((prod_acc, prod_next) => ({
            calories: prod_acc.calories + prod_next.calories,
            carbs: prod_acc.carbs + prod_next.carbs,
            proteins: prod_acc.proteins + prod_next.proteins,
            fats: prod_acc.fats + prod_next.fats,
        }),initialState)
        return {
            id: meal.id,
            ...nutrition}
    })

const sumByDay = (state) => dailyStatistics(state).find(day => day.id === state.displayedDate)


const selectors = {
    mealsByDay, dailyStatistics, sumByDay, sumsByMeal
}
export default selectors