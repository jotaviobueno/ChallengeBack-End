import mongoose from 'mongoose';

const changePassword = mongoose.model('changePassword', {

    email: String,
    change_token: String,
    token_created_in: Date,
    token_expires_in: Date,
    token_discarded: String,
});

export default changePassword;