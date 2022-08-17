export default function isequal(obj1,obj2) {
    var flag = true
    function compare(obj1,obj2) {
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            flag = false
        } else {
            for (let i in obj1) {
                if (obj2.hasOwnProperty(i)) {
                    if (obj1[i] !== obj2[i]) {
                        compare(obj1[i],obj2[i])
                    }
                } else {
                    flag = false
                }
            }
        }
        if (flag === false) {
            return false
        } else {
            return true
        }
    }
    return compare(obj1,obj2)
}