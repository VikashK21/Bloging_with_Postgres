const knex = require('../config/db.config');
const Users = knex('users');

module.exports = class UserCtrl {
    async users() {
        return await Users;
    }
    
    async newUser(data) {
        try {
            const result = await Users.where({email: data.email, password: data.password});
            if (result.length<0) {
                const result2 = await Users.insert(data);
                return result2;
            }
            else {
                return 'This users already exisy!!';
            }
        } catch (err) {
            return err.message;
            
        }
    }

    async login(data) {
        try {
            const result = await Users;
            return result
        } catch (err) {
            return err.message;            
        }
    }
}
