const knex = require('../config/db.config');

class UserCtrl {
    constructor() {
        this.Users = knex('users');
    }
    async allusers() {
        try {
            const result2 = await knex('users');
            return result2;
        } catch (err) {
            return err.message;    
        }
    }
    
    async newUser(data) {
        try {
            const result2 = await this.Users.where({email: data.email, password: data.password});
            console.log(result2);
            if (result2.length<1) {
                await this.Users.insert(data);
                return 'You are successfully Signed Up.'
            }
            else {
                console.log(result2.length, 'signup');
                return 'This user already exists!!';
            }
        } catch (err) {
            return err.message;
            
        }
    }

    async login(data) {
        try {
            const result2 = await this.Users.where(data);
            console.log(result2);
            return result2;
        } catch (err) {
            return err.message;            
        }
    }

    async deleteAcc(id) {
        try {
            const result2 = await this.Users.where({id}).del()
            return result2;
        } catch (err) {
            return err.message;
            
        }
    }

    async forgetPass(id, pass) {
        try {
            const result2 = await this.Users.where({id}).update({password: pass});
            return 'Your password is successfully changed.';
        } catch (err) {
            return err.message;
            
        }
    }
}


module.exports = UserCtrl;