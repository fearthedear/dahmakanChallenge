// You are given an array of integers of length n for a rider. The integer at index i symbolizes the time allocated to her or his i'th task in minutes. The optimal time for a break is between two tasks i and i+1, when the sum of all tasks from 0 to i equals the sum i+1 to n.

// Write a method that returns index i where the condition above is met. If there is no such index the rider is not awarded a break and we return null. 

// Please use JavaScript to implement this task. Consider the runtime complexity of your solution!

// Example:
// Input [1, 4, 1, 3, 1] -> Output 1
// Input [1, 4, 1, 3] -> Output null


var solution = function (arr) {
  for (i=0; i < arr.length; i++) {
    if ( arr.slice(0,i).reduce((a, b) => a + b, 0) == arr.slice(i,arr.length).reduce((a, b) => a + b, 0) ) {
      return i-1
    }
  }
  return null
}

console.log(solution([1, 4, 2, 8]))