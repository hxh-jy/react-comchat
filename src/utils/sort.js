// json数组的排序（正序）
export  function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

// json数组的逆序
export default function reverseByKey(array, key,flag) {
    if (flag) {
        let toplist = array.filter(item => item[flag] === 0)
        let noToplist = array.filter(item => item[flag] === 1)
        let newToplist = toplist && toplist.length > 0 ? toplist.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }) : [];
        let newNotoplist = noToplist && noToplist.length > 0 ? noToplist.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }) : [];
        return [...newToplist,...newNotoplist]
    } else {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        })
    }
}
