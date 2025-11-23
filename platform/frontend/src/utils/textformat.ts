export function capitalizeFirstLetter(str:string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function underscoreToSpace(str:string) {
    if (str === undefined || str === null || str.length === 0) {
        return str
    } else {
        return str.replaceAll('_',' ')
    }
}