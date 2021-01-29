import RandomNumber from '../../db/schemas/randomNumber';
import serialize from './serializer'; // serializer custom to db

const listRandomNumber = async () => {
    const data = await RandomNumber.find({});
    return serialize(data);
};

const generateRandomNumber = async (props) => {
    try {
        // RN to be generated
        const numberToBeGenerate = parseInt(props);
        // The random number should be 13 digits in length.
        const lengthOfRN = 13;
        // Total unique possible RN to be generated
        const possibleCombination = Math.pow(2, lengthOfRN);
        const isValidNumber = Number.isInteger(numberToBeGenerate);

        //Check if given number is not valid or less than 0
        if (!isValidNumber || numberToBeGenerate < 1) {
            return { error: 'Please provide valid number greater than 0' };
        }

        // list of all the RN present in the collection at a time and get size
        const listOfGeneratedRN = await RandomNumber.find({}).select(
            'size -_id'
        );

        // check if the collection is empty or not
        if (listOfGeneratedRN.length) {
            // get the sum of all the created RN in collection
            const generatedRN = listOfGeneratedRN
                .map((item) => item.size)
                .reduce((prev, next) => parseInt(prev) + parseInt(next));

            //more unique RN can be generated
            const availableRN = possibleCombination - generatedRN;

            // check if new unique RN can be generated
            if (availableRN < numberToBeGenerate) {
                return { error: 'Please try again later!' };
            }
        }

        // get new list of RN
        const newRNList = await generateNewRN(numberToBeGenerate, lengthOfRN);

        // add date to the collection
        const data = await RandomNumber.create({
            size: newRNList.length,
            number: newRNList,
        });

        // Return back in serialize way
        return serialize(data);
    } catch (error) {
        console.log(error.message);
    }
};

const generateNewRN = async (numberToBeGenerate, lengthOfRN) => {
    let list = [];
    //Generate new random numbers
    while (numberToBeGenerate) {
        //create new RN with length equals to lengthOfRN
        const newRN = Math.random().toString(10).substr(2, lengthOfRN);
        // is RN present in the list array
        const isGenerated = list.includes(newRN);

        // check if newRN is not present in the list array
        if (!isGenerated) {
            // get all the size of exist RN in Collection
            const getSimilarInCollection = await RandomNumber.find({
                number: newRN,
            });

            // check if created newRN is unique in collection
            if (getSimilarInCollection.length === 0) {
                // add unique created newRN
                list.push(newRN);
                //next
                numberToBeGenerate--;
            }
        }
    }
    return list;
};

export { listRandomNumber, generateRandomNumber };
