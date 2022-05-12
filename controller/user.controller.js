const res = require('express/lib/response');
const knex = require('../config/db.config');
const Users = knex('users');

module.exports = class UserCtrl {
    async users() {
        try {
            return await Users;
        } catch (err) {
            return err.message;    
        }
    }
    
    async newUser(data) {
        try {
            const result = await Users.where({email: data.email, password: data.password});
            if (result.length===0) {
                await Users.insert(data);
                return 'You are successfully Signed Up.'
            }
            else {
                return 'This user already exists!!';
            }
        } catch (err) {
            return err.message;
            
        }
    }

    async login(data) {
        try {
            const result = await Users.where(data);
            return result
        } catch (err) {
            return err.message;            
        }
    }

    async deleteAcc(id) {
        try {
            const result = await Users.where({id}).del()
            return result;
        } catch (err) {
            return err.message;
            
        }
    }

    async forgetPass(id, pass) {
        try {
            const result = await Users.where({id}).update({password: pass});
            return 'Your password is successfully changed.';
        } catch (err) {
            return err.message;
            
        }
    }
}
