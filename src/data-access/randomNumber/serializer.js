const _serializeSingle = (randomNumber) => ({
    id: randomNumber._id,
    number: randomNumber.number,
    size: randomNumber.size,
});

const serializer = (data) => {
    if (!data) return null;
    if (Array.isArray(data)) return data.map(_serializeSingle);
    return _serializeSingle(data);
};

export default serializer;
