export const getTotalItems = (items) => items.reduce((total, item) => total + item.quantity, 0);
export const objMatches = (obj, source) => Object.keys(source).every((key) => obj.hasOwnProperty(key) && obj[key] === source[key]);
