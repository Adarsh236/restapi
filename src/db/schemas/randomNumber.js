import mongoose from '../connection';

const Schema = mongoose.Schema;
const RandomNumbersSchema = new Schema({
    // size of RN present
    size: {
        type: Number,
        required: [true, 'Required'],
    },
    //type will be string because in numbers 0 will be removed in front
    // example in case of number 0011 or 0123 -> 11 or 123
    // example in case of string 0011 or 0123 -> 0011 or 0s123
    number: {
        type: [String],
        required: [true, 'Required'],
    },
    //deleted the date after 1 day
    createdAt: {
        type: Date,
        expires: '1d',
        default: Date.now,
    },
});

const RandomNumber = mongoose.model('RandomNumber', RandomNumbersSchema);

export default RandomNumber;
