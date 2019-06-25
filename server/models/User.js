const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validate = require('mongoose-validator');

// const ProductGallery = require('./product-gallery');

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String, lowercase: true, trim: true, index: true, unique: true, sparse: true,
        validate: [validate({
            validator: 'isEmail',
            message: 'Not a valid email'
        })]
    },
    role: String

}, { timestamps: true });

UserSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        delete ret.password;
        return ret;
    }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;