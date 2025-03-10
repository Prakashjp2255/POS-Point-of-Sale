const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchemaLogin = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'agent'],
        default: 'agent'
    }
}, {
    timestamps: true
});

// 🔹 Hash password before saving to the database
UserSchemaLogin.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// 🔹 Compare entered password with hashed password in DB
UserSchemaLogin.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model('Userlogin', UserSchemaLogin);

module.exports = UserModel;
