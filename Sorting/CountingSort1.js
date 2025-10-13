function countingSort (arr) {
    let size = arr.length;

    let maxElem = arr[0];
    let minElem = arr[0];
    
    for (let i = 1; i < size; ++i) {
        if(arr[i] > maxElem) {
            maxElem = arr[i];
        }
        if(arr[i] < minElem) {
            minElem = arr[i];
        } 
    }

    let range = (maxElem - minElem) + 1;
    let countingArray = new Array(range).fill(0);

    for (let item of arr) {
        countingArray[item - minElem]++
    }
    
    for (let i = 1; i < countingArray.length; ++i) {
        countingArray[i] += countingArray[i - 1];
    }
    
    let newArray = new Array(size).fill(0);

    for (let i = size - 1; i >= 0; --i) {
        
        const elem = arr[i];
        let idx = countingArray[elem - minElem] - 1;
        newArray[idx] = elem;
        countingArray[elem - minElem]--
    }
    

}
