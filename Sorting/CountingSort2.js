function countingSort(arr) {
    let size = arr.length;
    let minElem = arr[0];
    let maxElem = arr[0];

    for (let i = 1; i < size; ++i) {
        if (arr[i] > maxElem) {
            maxElem = arr[i];
        }
        if (arr[i] < minElem) {
            minElem = arr[i];
        }
    }

    let range = maxElem - minElem + 1;
    let countingArray = new Array(range).fill(0);

    for (let item of arr) {
        countingArray[item - minElem]++
    }
    const newArray = new Array(size).fill(0);

    let k = 0;
    for (let i = 0; i < size; ++i) {
        while (countingArray[i]--) {
            newArray[k++] = i + minElem;
        }
    }
    return newArray;
}

