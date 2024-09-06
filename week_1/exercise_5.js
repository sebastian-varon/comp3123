function array_max_sum(arr, k) {
    let result = 0;
    for (let i = 0; i < arr.length - k + 1; i++) {
        let sum = 0;
        for (let j = 0; j < k; j++) {
        sum += arr[i + j];
        }
        if (sum > result) {
        result = sum;
        }
    }
    return result;
    }

console.log(array_max_sum([1, 2, 3, 14, 5], 2)); // 19
console.log(array_max_sum([2, 3, 5, 1, 6], 3)); // 12
console.log(array_max_sum([9, 3, 5, 1, 7], 2)); // 12