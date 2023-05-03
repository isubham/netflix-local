
const {
    createHash,
} = await import('node:crypto');

class Crypto {

    static sha256(data) {
        return createHash('sha256').update(data).digest('hex');
    }; 
}

export { Crypto }

