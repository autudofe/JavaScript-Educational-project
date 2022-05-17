/*Bubble sort -------------------*/
const arr = [4, 7, 1, 2, 123, 53, 23, 86, 546, 7, 5, 634, 123];
const bubbleSort = (array) => {
    const arr = [...array];
    for (let i = 1; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr;
}
const startBubbleSort = new Date().getTime();
console.log(bubbleSort(arr));
const endBubbleSort = new Date().getTime();
console.log(`SecondWay bubbleSort: ${endBubbleSort - startBubbleSort}ms`);
console.log('------------------');


/*Sort by choice ----------------*/
const selectionSort = (array) => {
    const arr = [...array];
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j += 1) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}
const startSelectionSort = new Date().getTime();
console.log(selectionSort(arr));
const endSelectionSort = new Date().getTime();
console.log(`SecondWay selectionSort: ${endSelectionSort - startSelectionSort}ms`);
console.log('------------------');


/*Insertion sort------------------*/
const insertionSort = (array) => {
    const arr = [...array];
    for (let i = 1; i < arr.length; i++) {
        let currentIndex = i;
        while (
            arr[currentIndex - 1] !== undefined
            && (arr[currentIndex] < arr[currentIndex - 1])
            ) {
            [arr[currentIndex - 1], arr[currentIndex],] = [arr[currentIndex], arr[currentIndex - 1],];
            currentIndex--;
        }
    }

    return arr;
}
const startInsertionSort = new Date().getTime();
console.log(insertionSort(arr));
const endInsertionSort = new Date().getTime();
console.log(`SecondWay insertionSort: ${endInsertionSort - startInsertionSort}ms`);
console.log('------------------');


/*Quicksort*/
const quickSort = (array) => {
    const arr = [...array];
    if (arr.length <= 1) {
        return arr;
    }
    const pivot = arr[arr.length - 1];
    const leftArray = [];
    const rightArray = [];
    for (const el of array.slice(0, array.length - 1)) {
        el < pivot ? leftArray.push(el) : rightArray.push(el)
    }
    return [...quickSort(leftArray), pivot, ...quickSort(rightArray)]
}
const startQuickSort = new Date().getTime();
console.log(quickSort(arr));
const endQuickSort = new Date().getTime();
console.log(`SecondWay quickSort: ${endQuickSort - startQuickSort}ms`);
console.log('------------------');


/*Merge sort*/
const mergeSort = (array) => {
    const arr = [...array];

    if (arr.length <= 1) {
        return arr;
    }

    const middleIndex = Math.floor(arr.length / 2);
    const leftArray = arr.slice(0, middleIndex);
    const rightArray = arr.slice(middleIndex, arr.length);

    const leftSortedArray = mergeSort(leftArray);
    const rightSortedArray = mergeSort(rightArray);

    return mergeSortedArrays(leftSortedArray, rightSortedArray);
}

mergeSortedArrays = (leftArray, rightArray) => {
    const sortedArray = [];

    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
        let minElement = null;
        if (leftArray[leftIndex] < rightArray[rightIndex]) {
            minElement = leftArray[leftIndex];
            leftIndex += 1;
        } else {
            minElement = rightArray[rightIndex];
            rightIndex += 1;
        }
        sortedArray.push(minElement);
    }

    return sortedArray
        .concat(leftArray.slice(leftIndex))
        .concat(rightArray.slice(rightIndex));
}

const startMergeSort = new Date().getTime();
console.log(mergeSort(arr));
const endMergeSort = new Date().getTime();
console.log(`SecondWay mergeSort: ${endMergeSort - startMergeSort}ms`);
console.log('------------------');


console.log(arr);
console.log('Origin Array');
console.log('------------------');