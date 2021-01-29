import {
    listRandomNumber,
    generateRandomNumber,
} from '../data-access/randomNumber';

// RN controller
export default () => {
    const getAllRandomNumber = (req, res, next) => {
        listRandomNumber()
            .then((data) => {
                res.send(data);
            })
            .catch(next);
    };

    const generateRandomNumberById = (req, res, next) => {
        generateRandomNumber(req.params.id)
            .then((data) => {
                res.send(data);
            })
            .catch(next);
    };

    return {
        getAllRandomNumber,
        generateRandomNumberById,
    };
};
