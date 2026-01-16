// main.js

// --------------------------------------------------
// STEP 1: Select DOM elements ONCE
// --------------------------------------------------
// Grab references to the main UI elements.
// These IDs should already exist in index.html.

// TODO: Select the main todo list container
// TODO: Select the output area for text and messages
// TODO: Select the Run Demo button
// TODO: Select the Clear button
const list = document.querySelector('#todo-list');
const output = document.querySelector('#output');
const btnRun = document.querySelector('#btn-run');
const btnClear = document.querySelector('#btn-clear');
const listTitle = document.querySelector('.h5')

// --------------------------------------------------
// STEP 2: Variables and template strings
// --------------------------------------------------
// Create a constant and a variable, then display
// them using a template string.

// TODO: Create a constant named course
const course = "SDEV2150";
// TODO: Create a variable named topic
const topic = "Javascript Review";
// TODO: Use a template string to display both values
output.innerHTML = ` <p> Course: ${course} | Topic: ${topic}</p>`;
// --------------------------------------------------
// STEP 3: Functions and return values
// --------------------------------------------------
// Write a function that adds two numbers and
// another function that formats a label/value pair.

// TODO: Create a function add(a, b)
function add(a,b){
    return a + b;
};

// TODO: Create an arrow function formatResult(label, value)
const formatResult = (label,value)=>{
    return `${label}: ${value}`;
};
// TODO: Call the functions and display the result
output.innerHTML += `<p> ${formatResult('2 + 3', add(2,3))} </p>`;


// --------------------------------------------------
// STEP 4: Arrays, objects, and iteration
// --------------------------------------------------
// Create an array of task objects and count
// how many are marked as done.




// TODO: Create an array named tasks
// Each task should have: title (string), done (boolean)
const tasks = [
  { title: 'Install dependencies', done: true },
  { title: 'Run dev server', done: true },
  { title: 'Complete the demo', done: false },
];
// TODO: Use a loop to count completed tasks
let completedCount = 0;
for (const task of tasks){
    if (task.done){ completedCount+=1}
};
// TODO: Display: "Completed: X of Y"
output.textContent = ` Completed: ${completedCount} of ${tasks.length}`
// --------------------------------------------------
// STEP 5: Problem solving – build HTML from data
// --------------------------------------------------
// Build a function that converts the tasks array
// into an HTML list using a loop.

// TODO: Create a function renderTaskList(items)
// - Start with '<ul>'
// - Loop over items
// - Add <li> elements with a class of 'done' or 'todo'
// - Close the list and return the string

 function renderTaskList(items){
    let html = '<ul>';
    listTitle.textContent = "Todo List";
    for (const item of items){
        const checked = item.done ? 'checked' : '';
        html += `<li class="${status}">${item.title} <input type="checkbox" ${checked}>  </li>`;
    };
    html += '</ul>'
    let completedCount = 0;
    for (const task of tasks){
        if (task.done){ completedCount+=1};
    };
    listTitle.textContent += ` Completed: ${completedCount} of ${tasks.length}`;
    return html;
};
// TODO: Render the task list inside the list container
list.innerHTML = renderTaskList(tasks);
// --------------------------------------------------
// STEP 6: DOM manipulation with createElement
// --------------------------------------------------
// Create and append elements instead of using innerHTML.

// TODO: Create a function addMessage(message)
// - Create a <p> element
// - Set its textContent
// - Append it to the output element

function addMessage(messsage){
    const p = document.createElement('p')
    p.textContent = messsage
    output.append(p)
};


// TODO: Test the addMessage function
addMessage('This message was appended with createElement');
// --------------------------------------------------
// STEP 7: Events – connect UI to behavior
// --------------------------------------------------
// Wire the buttons to functions that update the UI.

// TODO: Create a function runDemo()
// - Clear output
// - Add a few messages
// - Render the task list
function runDemo(){
    
    output.innerHTML = '';
    addMessage('Running demo...');
    addMessage(formatResult('5 + 8', add(5, 8)));
    list.innerHTML = renderTaskList(tasks);
};



// TODO: Create a function clearUI()
// - Clear both output and todo list containers

function clearUI(){
    
    output.innerHTML = '';
    list.innerHTML = '';
};

// TODO: Add click listeners for btnRun and btnClear
btnRun.addEventListener('click', runDemo);

btnClear.addEventListener('click', clearUI);
// --------------------------------------------------
// STEP 8: Mini extension – Adding tasks
// --------------------------------------------------
const taskTxt = document.querySelector('#txt-task')
const btnAdd = document.querySelector('#btn-add')

btnAdd.addEventListener('click', ()=>{
    const title = taskTxt.value.trim();

    if (!title) return;

    tasks.push({ title, done: false});
    list.innerHTML = renderTaskList(tasks);
    taskTxt.value = "";

});



// --------------------------------------------------
// STEP 9: Student Exercise
// --------------------------------------------------
// Complete these AFTER the demo:

// 1. Create a function toggleDone(title) DONE
//    - Find a task by title
//    - Flip its done value (true/false)
function toggleDone(title){
    for (const task of tasks){
        
        if (task.title === title){
            task.done = !task.done;
        
        };
    };
    list.innerHTML = renderTaskList(tasks)
};

toggleDone('Install dependencies');
// 2. Update renderTaskList() to show '(done)' or '(todo)' DONE

// 3. Add event delegation to the <ul>
//    - When a list item is clicked:
//      * Toggle the task
//      * Re-render the list

// list.addEventListener('click', (e)=>{
    
//     if (e.target.tagName === 'LI'){
        
//         const update = e.target.textContent.split(":")[0].trim();
//         toggleDone(update)
//         list.innerHTML = renderTaskList(tasks)
//     }


// });




// 4. Stretch goals:
//    - Display a chekcbox next to each task to represent done/todo 
//      (checking/unchecking it toggles the state)
//    - Update the UI so that pressing enter in the text input adds 
//      the task (notice we aren't using a form
//    - Display a summary line above the list
//      e.g. "Completed: 2 of 3"

list.addEventListener('click', (e)=>{

    if (e.target.tagName === "INPUT"){
        const titl = e.target.parentElement;
        
        const update = titl.textContent.split(":")[0].trim();
        
        toggleDone(update)
        list.innerHTML = renderTaskList(tasks)
        
    };


});

taskTxt.addEventListener("keydown", (e)=>{
    if (e.key === "Enter"){
        const title = taskTxt.value.trim();

    if (!title) return;

    tasks.push({ title, done: false});
    list.innerHTML = renderTaskList(tasks);
    taskTxt.value = "";

    };
});




