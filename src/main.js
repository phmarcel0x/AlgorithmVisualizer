// main.js
import { selectionSort } from './SortingAlgorithms/selectionSort.js';

const originalArray = [59, 82, 86, 71, 33, 77, 74, 62, 10, 54, 74, 28, 85, 42, 59, 82, 86, 71, 33, 77, 74, 62, 10, 54, 74, 28, 85, 42, 59, 82, 86, 71, 33, 77, 74, 62, 10, 54, 74, 28, 85, 42, 59, 82, 86, 71, 33, 77, 74, 62, 10, 54, 74, 28, 85, 42, 59, 82, 86, 71, 33, 77, 74, 62, 10, 54, 74, 28, 85, 42];

function createBars(arr, containerId) 
{
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous bars

    const barWidth = container.clientWidth / arr.length - 5; // Calculate width dynamically

    arr.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value * 2}px`; // Height based on value
        bar.textContent = value; // Set the text content to the value of the element
        bar.style.color = 'white'; // Text color
        container.appendChild(bar);
    });
}

async function visualizeSwap(arr, idx1, idx2, containerId) 
{
    // Early exit if there's nothing to swap
    if (idx1 === idx2) return;

    const container = document.getElementById(containerId);
    const bars = container.children;
    
    // Swap the elements in the array
    let temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;

    // Visually highlight the bars being swapped
    bars[idx1].style.backgroundColor = 'orange';
    bars[idx2].style.backgroundColor = 'orange';

    // Wait for some time to visualize swap
    await new Promise(resolve => setTimeout(resolve, 150)); // Shorten this delay if the sort takes too long

    // Swap the DOM elements by swapping their styles and textContent
    let tempHeight = bars[idx1].style.height;
    bars[idx1].style.height = bars[idx2].style.height;
    bars[idx2].style.height = tempHeight;

    let tempText = bars[idx1].textContent;
    bars[idx1].textContent = bars[idx2].textContent;
    bars[idx2].textContent = tempText;

    // Reset the color back to blue after swap
    bars[idx1].style.backgroundColor = 'blue';
    bars[idx2].style.backgroundColor = 'blue';
}

async function visualizeComparison(containerId, idx1, idx2) 
{
    const container = document.getElementById(containerId);
    const bars = container.children; // Consistent with visualizeSwap

    console.log(`Comparing indices: ${idx1}, ${idx2}`);
    console.log(`Total bars: ${bars.length}`); // Debugging log

    const bar1 = bars[idx1];
    const bar2 = bars[idx2];

    console.log(`Bar1: ${bar1}, Bar2: ${bar2}`); // Debugging log

    if (bar1 && bar2) 
    {
        // Highlight bars being compared
        bar1.style.backgroundColor = 'orange';
        bar2.style.backgroundColor = 'orange';

        // Wait for some time to visualize comparison
        await new Promise(resolve => setTimeout(resolve, 150)); // Adjust time as needed

        // Reset the colors after comparison
        bar1.style.backgroundColor = 'blue';
        bar2.style.backgroundColor = 'blue';
    } else {
        // If either bar doesn't exist, log an error or handle it appropriately
        console.error(`Bar at index ${idx1} or ${idx2} is undefined.`);
    }
}

function displayArray(arr, containerId)
{
    const container = document.getElementById(containerId);
    container.innerHTML = arr.join(', ');
}

// Run the sorting algorithm and update the web with visualization
async function runSortingAlgorithm() 
{
    console.log('Sorting algorithm triggered'); // Added for debugging

    const sortButton = document.getElementById('startSortingButton');
    sortButton.disabled = true;

    const arrForSorting = originalArray.slice(); // Copy original array (for immutability)
    createBars(arrForSorting, 'visualizationContainer');

    await selectionSort(arrForSorting, visualizeSwap, visualizeComparison, 'visualizationContainer');

    displayArray(arrForSorting, 'sortedArray');
    sortButton.disabled = false;
}


document.addEventListener('DOMContentLoaded', () => {
    displayArray(originalArray, 'originalArray');

    // Set up the button to start sorting when clicked
    const sortButton = document.getElementById('startSortingButton');
    sortButton.addEventListener('click', runSortingAlgorithm);

});
