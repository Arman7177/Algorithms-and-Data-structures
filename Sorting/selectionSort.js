function selectionSort (arr) {
    let size = arr.length;

    for(let i = 0; i < size -1; ++i) {
        let minIndex = i;
        for(let j = i+1; j < size; ++j) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if(minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    return arr;
}

let arr = [3,1,2,5,6,4,7,9,8];
console.log(selectionSort(arr))