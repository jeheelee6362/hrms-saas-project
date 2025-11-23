import { v5 as uuidv5 } from 'uuid';
import { NAMESPACE } from '../config';

const getUUIDv5 = {
    static: (id:string) => {return uuidv5(id, NAMESPACE!)},
    dynamic: (id:string, ns:string) => {return uuidv5(id,ns)}
}

export default getUUIDv5