// This version tries to optimize by only checking for "in" when looking for undefined and
// skipping the definitely fruitless NaN search. Other parts are merely cosmetic conciseness.
// Whether it is actually faster remains to be seen.
// Taken from: https://developer.cdn.mozilla.net/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf)
    Array.prototype.indexOf = (function (Object, max, min) {
        "use strict"
        return function indexOf(member, fromIndex) {
            if (this === null || this === undefined)
                throw TypeError("Array.prototype.indexOf called on null or undefined")

            var that = Object(this), Len = that.length >>> 0, i = min(fromIndex | 0, Len)
            if (i < 0) i = max(0, Len + i)
            else if (i >= Len) return -1

            if (member === void 0) {        // undefined
                for (; i !== Len; ++i) if (that[i] === void 0 && i in that) return i
            } else if (member !== member) { // NaN
                return -1 // Since NaN !== NaN, it will never be found. Fast-path it.
            } else                          // all else
                for (; i !== Len; ++i) if (that[i] === member) return i

            return -1 // if the value was not found, then return -1
        }
    })(Object, Math.max, Math.min)