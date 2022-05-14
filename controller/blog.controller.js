const knex = require('../config/db.config');

module.exports = class Blog {
    constructor() {
        this.Blog_s = knex('blogging');

    }

    async blogs() {
        const result = await this.Blog_s;
        console.log(result);
        return result;
    }

    async likesDislikesValue(data, userId) {
        if (data.hasOwnProperty('likes') || data.hasOwnProperty('dislikes')) {
            if (data.hasOwnProperty('likes') && data.likes) {
                data.likes = 1;
                data.dislikes = 0;
                data['reactors_id'] = JSON.stringify([userId]);
            }
            else if (data.hasOwnProperty('dislikes') && data.dislikes) {
                data.likes = 0;
                data.dislikes = 1;
                data['reactors_id'] = JSON.stringify([userId]);
            }
            else {
                data.likes = 0;
                data.dislikes = 0;
                data['reactors_id'] = JSON.stringify([])
            }
        }
        else {
            data['likes'] = 0;
            data['dislikes'] = 0;
            data['reactors_id'] = JSON.stringify([])
        }
        return data;
    }
    async newPost(userId, data) {
        try {
            data = await this.likesDislikesValue(data, userId);
            const result = await this.Blog_s.insert({ ...data, user_id: userId });
            return 'Your new post is successfully posted.';
        } catch (err) {
            return err.message;

        }
    }

    async likeDislikePost(id, data, userId) {
        try {
            const result = await this.Blog_s.where({ id });
            console.log(result);
            if (result.length > 0) {
                // console.log(typeof result[0].reactors_id, 'are you here.');
                console.log('hey herer...', data);
                const ld = await this.likesDislikesValue(data, userId);
                const lis = result[0].reactors_id
                console.log(lis, 'lis');
                console.log(ld, 'ld');
                if (lis.length < 1 || !lis.includes(userId)) {
                    lis.push(userId)
                    console.log(lis, 'lis');
                    await this.Blog_s.where({ id }).update({
                        ...data,
                        likes: result[0].likes + ld.likes,
                        dislikes: result[0].dislikes + ld.dislikes,
                        reactors_id: JSON.stringify(lis)
                    })
                    return 'Your reaction is recorded successfully.'
                }
                return 'You have already reacted on this post!!'
            }
            return 'Please check the ID once, this does not exists!!'
        } catch (err) {
            return err.message;

        }
    }
}