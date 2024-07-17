"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffleArray = exports.subtractArray = exports.arrayUnique = exports.onlyWithin = exports.isStringEmpty = exports.isArrayEmpty = void 0;
function isArrayEmpty(reference) {
    try {
        return !(Array.isArray(reference) && reference.length > 0);
    }
    catch (error) {
        return false;
    }
}
exports.isArrayEmpty = isArrayEmpty;
function isStringEmpty(string) {
    try {
        return !(typeof string == "string" && string.length > 0);
    }
    catch (error) {
        return false;
    }
}
exports.isStringEmpty = isStringEmpty;
function onlyWithin(value, compareWith) {
    return compareWith.indexOf(value) !== -1;
}
exports.onlyWithin = onlyWithin;
function arrayUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
}
exports.arrayUnique = arrayUnique;
function subtractArray(a, b) {
    return a.filter(n => !b.includes(n));
}
exports.subtractArray = subtractArray;
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}
exports.shuffleArray = shuffleArray;
//# sourceMappingURL=utilities.helper.js.map