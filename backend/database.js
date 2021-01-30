// const user = {
//     user_data: {
//         id: "1",
//         login: "robii",
//         password: "secret"
//     },
//     days: [{
//         id: "2020-01-27",
//         meals: ["56","76","78"]
//     }],
//     meals: [{
//         id: "90",
//         products: ["71","476","43"],
//         meal_type: "lunch"
//     }],
//     products: [{
//         id: "199",
//         name: "egg",
//         calories: 80,
//         proteins: 10,
//         carbs: 2,
//         fats: 7
//     }]
// }

function Database() {
    this.users = []

    this.register = (username, password, id) => {
        const newUser = {
            user_data: {username, password, id},
            days: [],
            meals: [],
            products: []
        }
        this.users.push(newUser)
        return {userId: newUser.user_data.id, username: newUser.user_data.username}
    }
    this.login = (username, password) => {
        const user = this.users.find(n => n.user_data.username === username && n.user_data.password === password)
        if (typeof user !== 'undefined') {
            return {userId: user.user_data.id, username: user.user_data.username}
        }
        else
            return null
    }
    this.findById = (id) => {
        const user = this.users.find(n => n.user_data.id === id)
        if (typeof user !== 'undefined') {
            return user
        }
        else
            return null
    }
    this.replaceDay = (id, day) => {
        const user = this.users.find(n => n.user_data.id === id)
        const dayId = user.days.findIndex(n => n.id === day.id)
        user.days[dayId] = {...day}
        return {...day}
    }
    this.addProduct = (id, product) => {
        const user = this.users.find(n => n.user_data.id === id)
        user.products.push({...product})
        return {...product}
    }
    this.addDay = (id, dayId) => {
        const user = this.users.find(n => n.user_data.id === id)
        if (user.days.some(n => n.id === dayId))
            return user.days.find(n => n.id === dayId)
        else {
            const newDay = {id: dayId, meals: []}
            user.days.push(newDay)
            return newDay
        }
    }
    this.deleteMeal = (userId, mealId) => {
        const user = this.users.find(n => n.user_data.id === userId)
        user.meals = user.meals.filter(n => n.id !== mealId)
    }
    this.addMeal = (userId, meal_type ,id) => {
        const user = this.users.find(n => n.user_data.id === userId)
        const newMeal = {id, mealtype: meal_type, products: []}
        user.meals.push(newMeal)
        return newMeal
    }
    this.replaceMeal = (userId, meal) => {
        const user = this.users.find(n => n.user_data.id === userId)
        const mealId = user.meals.findIndex(n => n.id === meal.id)
        user.meals[mealId] = {...meal}
        return {...meal}
    }

}
exports.Database = Database