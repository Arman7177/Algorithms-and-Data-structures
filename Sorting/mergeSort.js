function merge(arr,low,mid,high) {

    let a1 = arr.slice(low, mid + 1);
    let a2 = arr.slice(mid + 1 ,high + 1);

    let i = 0;
    let j = 0;
    let k = low;

    while (i < a1.length && j < a2.length) {
        if (a1[i] < a2[j]) {
            arr[k++] = a1[i++]
        } else {
            arr[k++] = a2[j++]
        }
    }
    while (i < a1.length) {
        arr[k++] = a1[i++];
    }
    while (j < a2.length) {
        arr[k++] = a2[j++];
    }
}

function mergeSort(arr,low,high) {
    if (low >= high) return;
    let mid = Math.floor((low + high) / 2);
    mergeSort(arr,low,mid);
    mergeSort(arr,mid + 1,high);

    merge(arr,low,mid,high);
}




