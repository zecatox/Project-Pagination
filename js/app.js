var page = document.querySelector('.page');
var currentPage = 1;
var pageHeader = document.querySelector('.page-header');
pageHeader.innerHTML += 
    `<div class="student-search">
          <input placeholder="Search for students...">
          <button>Search</button>
    </div>`;

var pagination = document.createElement('div');
pagination.className = 'pagination';
pagination.appendChild(document.createElement('ul'));
page.appendChild(pagination);
pagination = pagination.querySelector('ul');

var input = document.querySelector('input');
var button = document.querySelector('button');
var studentList = document.querySelector('.student-list');
var studentItems = document.querySelectorAll('.student-item')
var people = [];


// Prépration array contenant la liste d'étudiants
studentItems.forEach(x =>{
    let name = x.querySelector('h3').textContent;
    let mail = x.querySelector('.email').textContent;
    people.push([x, name+'|'+mail]);
});

function updatePagination(nb, current){
    // remove previous list
    let list = pagination.querySelectorAll('li');
    for(let i=0; i<list.length; i++) pagination.removeChild(list[i]);
    
    // create new list
    if (nb>0)
        for(let i=1; i<=nb; i++){
            let a = document.createElement('a');
            a.href = '#';
            a.textContent = i;
            a.addEventListener('click', e => { 
                currentPage = i;
                update();
            });
            if (i==current) a.className = 'active'; 

            let li = document.createElement('li');
            li.appendChild(a);
            pagination.appendChild(li);
        }
}

function updateList(students){
    let pages = Math.ceil(students.length/10);
    currentPage = (pages==0 ? 0 : (currentPage==0 ? 1 : Math.min(currentPage, pages)) )
    
    // clear list of students
    studentItems.forEach( x => x.style.display = "none");
    
    if (pages>0){
        // show part of filtered list
        for(let i=(currentPage-1)*10; i<currentPage*10 && i<students.length; i++){
            students[i].style.display = 'block';
        }
    }
    updatePagination(pages,currentPage);
}

function update(){
    updateList( people.filter( x => { return x[1].includes(input.value) }).map(x=>x[0]))
}

button.addEventListener('click', update );
input.addEventListener('input', update )
update();