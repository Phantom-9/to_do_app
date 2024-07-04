// const cont=document.getElementByClass('container')

const containerDiv = document.querySelector('.container');

containerDiv.style.background = 'white';
 const inputbox =document.getElementById('input-box');
const listContainer= document.getElementById('list-container');

let count=0;

function addTask(){
 if(inputbox.value===""){
   alert("you need to enter some text")
 }else{
   const list=document.createElement('li');
   const h3=document.createElement('h3')
   h3.innerHTML= inputbox.value;
   list.appendChild(h3);
   list.id = count;
   listContainer.appendChild(list);
   
   const checkbox=document.createElement('input');
   checkbox.type='checkbox';
   checkbox.id="my-checkbox";
   list.insertBefore(checkbox,h3)
//    adding delete button
   const deleteButton = document.createElement('button');
   deleteButton.classList='delete'
    deleteButton.innerHTML = "Delete";
   
    const currValue = count;
    deleteButton.onclick = function() {
      const currTodoList = JSON.parse(localStorage.getItem("toDoList")) || [];
      const newList = currTodoList.filter((e)=>!Object.keys(e).find(key=> +key === currValue));
      localStorage.setItem("toDoList", JSON.stringify(newList));
      listContainer.removeChild(list);
      count--;
      updateCounter()
    };

    list.appendChild(deleteButton);

    listContainer.appendChild(list);
   // list.appendChild(checkbox)
   saveData({[count]:inputbox.value});
   count++;
 }
 inputbox.value='';
 updateCounter()
}

function updateCounter() {
    const counter = document.querySelector('.counter');
    counter.innerHTML = `Task's left: ${count}`;
}


function saveData(data){
    const currTodoList = JSON.parse(localStorage.getItem("toDoList")) || [];
    const newList = currTodoList;
    newList.push(data);
    localStorage.setItem("toDoList", JSON.stringify(newList));
}

window.document.addEventListener("DOMContentLoaded",()=>{
  const prevTodoList = JSON.parse(localStorage.getItem("toDoList")) || [];

  for(let i=0;i<prevTodoList.length;i++){
    const newCount = prevTodoList[i];
    const newKey = Object.keys(newCount || {})[0];
    const newValue = newCount[newKey]
    const list=document.createElement('li');
    const h3=document.createElement('h3')
    h3.innerHTML= newValue;
    list.appendChild(h3);
    list.id = +newKey;
    listContainer.appendChild(list);
    
    const checkbox=document.createElement('input');
    checkbox.type='checkbox';
    checkbox.id="my-checkbox";
    list.insertBefore(checkbox,h3)
 //    adding delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList='delete'
     deleteButton.innerHTML = "Delete";
    
     const currValue = +newKey;
     deleteButton.onclick = function() {
       const currTodoList = JSON.parse(localStorage.getItem("toDoList")) || [];
       const newList = currTodoList.filter((e)=>!Object.keys(e).find(key=> +key === currValue));
       localStorage.setItem("toDoList", JSON.stringify(newList));
       listContainer.removeChild(list);
       count--;
       updateCounter()
     };
 
     list.appendChild(deleteButton);
 
     listContainer.appendChild(list);
    count++;
  }
})