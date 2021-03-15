

let arr = [1, 2, 3, 4, 5];

function filterArray(arr = [], task) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (task) {
            res.push(arr[i]);
        }
    }
    return arr;
}

console.log(filterArray(arr,))