import bcrypt from 'bcryptjs'

const saltRound = 10

function getSalt() {
    return bcrypt.genSaltSync(saltRound);
}
function getHash(raw:string,salt:number|string) {
    return bcrypt.hashSync(raw,salt)
}
function hashMatch(compare:string,comparedWith:string) {
    return bcrypt.compareSync(compare,comparedWith)
}

export {
    getSalt,
    getHash,
    hashMatch,
}