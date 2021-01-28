const selectMealsByDay = (state, day) => state.entities.days.byId[day].meals.map(meal => {
    const mealById = state.entities.meals.byId[meal]
    return {
        meal_type: mealById.meal_type,
        id: mealById.id,
        products: mealById.products.map(product => {
            const productById = state.entities.products.byId[product]
            return {
                id: productById.id,
                name: productById.name,
                calories: productById.calories,
                proteins: productById.proteins,
                carbs: productById.carbs,
                fats: productById.fats
            }
        })
    }
})

const selectors = {
    selectMealsByDay
}
export default selectors