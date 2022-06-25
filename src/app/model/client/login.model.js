import mongoose from 'mongoose';

const login = mongoose.model('login', {

    email: String,
    session_token: String,
    jwt: String,
    expires_in: Date,
    login_date: Date,
    disconnected: Boolean,
    last_update: Date,
});

export default login;