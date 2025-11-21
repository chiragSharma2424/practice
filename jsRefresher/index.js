// const student = {
//     name: "chirag",
//     age: 20,
//     study: function() {
//         console.log("hello");
//     }
// }

// console.log(student);
// console.log(student.name);
// student.study();


// creating class of student
// class student {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     study() {
//         console.log(`name is: ${this.name} and age is ${this.age}`);
//     }
// }
// const s1 = new student("chirag", 20);
// console.log(s1);
// s1.study();


var arr = [2,4,5,6];
function withoutMap(arr = []) {
    var newArr = [];
    for(var i = 0; i < arr.length; i++) {
       newArr.push(arr[i] * 2);
    }
    return newArr;
}
console.log("without map function: ", withoutMap(arr));

var arr2 = [1,2,3,4,5];
let ans = arr2.map((ele) => {
    return ele * 2;
})
console.log("with map function: ", ans);