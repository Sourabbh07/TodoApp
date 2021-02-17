var inputBox = document.querySelector(".inputField input");
var addBtn = document.querySelector(".inputField button");
var todoList = document.querySelector(".todolist");
var deleteAllTasks=document.querySelector(".footer button");



inputBox.onkeyup  = () =>{
    
    let userEnteredValue=inputBox.value;
    if(userEnteredValue.trim() != 0){
        addBtn.classList.add("active");
    }
    else{
        addBtn.classList.remove("active");
    }
}
showTasks();

addBtn.addEventListener("click",function(){
    

    let userEnteredValue = inputBox.value; //getting input field value
    let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorageData == null){ //if localstorage has no data
      listArray = []; //create a blank array
    }else{
      listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
    }
    listArray.push(userEnteredValue); //pushing or adding new value in array
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
    
    
})


function showTasks(){
    
    let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorageData == null){ //if localstorage has no data
      listArray = []; //create a blank array
    }else{
      listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
    }
    const pendingN=document.querySelector(".pendingNum");
    pendingN.textContent=listArray.length;
    
    let newLiTag=''
    listArray.forEach((element,index) => {
        newLiTag+=`<li>${element}<span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`
    });
    todoList.innerHTML=newLiTag;
    inputBox.value="";

}

function deleteTask(index){
    let getLocalStorageData=localStorage.getItem("New Todo");
    listArray=JSON.parse(getLocalStorageData);
    listArray.splice(index,1);
    localStorage.setItem("New Todo",JSON.stringify(listArray));
    showTasks();
}
deleteAllTasks.addEventListener("click",function(){
    listArray=[];
    localStorage.setItem("New Todo",JSON.stringify(listArray));
    showTasks();
})