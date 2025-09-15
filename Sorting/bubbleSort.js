function bubbleSort(arr) {
    const size = arr.length;

    for (let i = 0; i < size -1; ++i) {
        let swapped = false
        for (let j = 0; j < size - 1 - i; ++j) {
            if(arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                swapped = true;
            }
        }
        if(!swapped) break;
    }
    return arr;
}

let arr = [1,3,5,4,2,6];
console.log(bubbleSort(arr));