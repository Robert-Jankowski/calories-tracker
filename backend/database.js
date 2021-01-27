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
        return id
    }
    this.login = (username, password) => {
        const user = this.users.find(n => n.user_data.username === username && n.user_data.password === password)
        if (typeof user !== 'undefined') {
            return user.user_data.id
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
    }
    this.addProduct = (id, product) => {
        const user = this.users.find(n => n.user_data.id === id)
        user.products.push({...product})
    }
    this.addDay = (id, dayId) => {
        const user = this.users.find(n => n.user_data.id === id)
        user.days.push({id: dayId, meals: []})
    }
}
exports.Database = Database