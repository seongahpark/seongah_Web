
//전역 변수 : 코드 전체에서 쓸 수 있는 변수
var todo_input=document.getElementById("todo_input");
var btn_add=document.getElementById("btn_add");
var todo_list=document.getElementById("todo_list");
var todo_text;
let todo_items=[]; //local storage -> key value
const TODO_LS="todo_items"; //local storage -> key
var UserName;

function input(){ // UserName을 받음
    var input = document.getElementById("in").value; 
    UserName = input; // UserName 변수 안에다가 입력받은 값을 받고
    saveUser(UserName); // localstorage에 save함
    }
    
function output(){
    document.getElementById("out").innerText = UserName; // 텍스트에 출력
    }

function handleClick(event)
{
    //지역 변수 : 함수 내에서만 쓸 수 있는 변수
    const text=todo_input.value;
    addListItem(text); //input에 입력한 값이 리스트에 추가
    todo_input.value="";

}

function addListItem(text)
{
    const li=document.createElement("li");
    const todo_index=todo_items.length+1;
    li.id=todo_index;
    li.innerText=text;
    todo_list.appendChild(li);

    //todo_items 배열안에 저장될 object 
    //{text : "해야할 일", id ="1"}
    const todo_object={
        item : text,
        id : todo_index
    };

    todo_items.push(todo_object);
    saveToDoItems(todo_items);//todo_items를 로컬스토리지에 저장
}

function saveUser()
{
    localStorage.setItem('name', UserName); //UserName 저장
}

function saveToDoItems()
{
    localStorage.setItem(TODO_LS, JSON.stringify(todo_items));
}

function loadUser()
{
    UserName=localStorage.getItem('name'); //localStorage에서 UserName 받아오기
    if(UserName != null)
    {
        output(UserName); //비어있지 않다면 UserName을 출력
    }
}

function loadToDoItems()
{
    const loadedToDoItems=localStorage.getItem(TODO_LS);
    if(loadedToDoItems != null)
    {
        //object를 파싱
        const itemToDos=JSON.parse(loadedToDoItems);
        //itemToDos => todo_object랑 똑같은 상태
        //실제로 필요한 속성은 item
        itemToDos.forEach(function(object){addListItem(object.item);});
    }
}
function init() //js가 다운되고 실행되자마자 가장먼저 실행될 함수
{
    loadUser();
    loadToDoItems();
    btn_add.addEventListener("click",handleClick);
}

init();