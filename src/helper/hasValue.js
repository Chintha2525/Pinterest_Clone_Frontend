export const hasValue = (obj, valuetofind) => {
    var a = obj
    for (const i in a) {
        if (a.hasOwnProperty(i)) {
            const nestedObject = a[i];
            if (nestedObject.hasOwnProperty("_id") && nestedObject._id === valuetofind) {
                return true
                break
            }
        }
    }
    return false
}