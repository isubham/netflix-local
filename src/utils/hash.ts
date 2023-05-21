
import { createHash } from 'node:crypto';

class Crypto {

    static sha256(data: any) {
        return createHash('sha256').update(data).digest('hex');
    }; 
}

export { Crypto }

