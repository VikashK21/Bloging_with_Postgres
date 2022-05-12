const knex = require('../config/db.config');
const Blog_ = knex('blogging');

module.exports = class Blog {

    async blogs() {
        const result = await await Blog_;
        return result;
    }

    async likesDislikesValue(data, userId) {
        if (data.hasOwnProperty('likes') || data.hasOwnProperty('dislikes')) {
            if (data.hasOwnProperty('likes') && data.likes) {
                data.likes = 1;
                data.dislikes = 0;
                data['reactors_id'] = [userId];
            }
            if (data.hasOwnProperty('dislikes') && data.dislikes) {
                data.likes = 0;
                data.dislikes = 1;
                data['reactors_id'] = [userId];
            }
            else {
                data.likes = 0;
                data.dislikes = 0;
                data['reactors_id'] = []
            }
        }
        else {
            data['likes'] = 0;
            data['dislikes'] = 0;
            data['reactors_id'] = []
        }
        return data;
    }
    async newPost(userId, data) {
        try {
            data = await this.likesDislikesValue(data, userId);
            const result = await Blog_.insert({ ...data, user_id: userId });
            return 'Your new post is successfully posted.';
        } catch (err) {
            return err.message;

        }
    }

    async likeDislikePost(id, data, userId) {
        try {
            const result = await Blog_.where({ id });
            if (result.length > 0) {
                const ld = await this.likesDislikesValue(data, userId);
                await Blog_.where({ id }).update({
                    ...data,
                    likes: result.likes + ld.likes,
                    dislikes: result.dislikes + ld.dislikes,
                    reactors_id: [
                        ...result.reactors_id,
                        ...ld.reactors_id
                    ]
                })
                return 'Your reaction is recorded successfully.'
            }
            return 'Please check the ID once, this does not exists!!'
        } catch (err) {
            return err.message;

        }
    }
}