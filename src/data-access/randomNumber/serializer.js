const _serializeSingle = (randomNumber) => ({
    id: randomNumber._id,
    number: randomNumber.number,
    size: randomNumber.size,
});

const _serializeResult = (data) => ({
    result: data,
});

const serializer = (data) => {
    if (!data) return null;
    else if (Array.isArray(data)) data = data.map(_serializeSingle);
    else data = _serializeSingle(data);
    return _serializeResult(data);
};

export default serializer;
