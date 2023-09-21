class Person
{
    name;
    group;
    prefs = {};

    constructor(name, group){
        this.name = name;
        this.group = group;
    }
}

function addPerson(){
    const inputName = document.getElementById('input-name');
    var name = inputName.value;
    if (name == "")
        return;

    for (let i = 0; i < people.length; i++) {
        if (people[i].name == name){
            return;
        }
        
    }
    
    inputName.value = "";

    const personBox = document.createElement("div");
    personBox.textContent = name;
    personBox.onclick = function() {showPreferences(name)};
    document.getElementById("people").appendChild(personBox);

    const personBoxDrag = document.createElement("div");
    personBoxDrag.textContent = name;
    personBoxDrag.draggable = true;
    personBoxDrag.addEventListener('dragstart', function(event){
        draggedElement = event.target;
        draggedPerson = getPersonByName(draggedElement.textContent);
    })
    document.getElementById("unsorted").appendChild(personBoxDrag);

    var newPerson = new Person(name, unsorted);
    people.push(newPerson);
    unsorted.push(newPerson);
}

function showPreferences(name){
    const preferencesDiv = document.getElementById('preferences');
    preferencesDiv.innerHTML = '';

    for (let i = 0; i < people.length; i++) {
        if (people[i].name == name)
            continue;
        
        const personBox = document.createElement("div");
        personBox.textContent = people[i].name;

        var authorPerson = getPersonByName(name);
        if (people[i].name in authorPerson.prefs && authorPerson.prefs[people[i].name]){
            personBox.style.color = "Chartreuse";
        }

        personBox.onclick = function() {changePreferences(name, people[i].name)}
        preferencesDiv.appendChild(personBox);
    }
}

function changePreferences(author, preferedPerson){
    var authorPerson = getPersonByName(author);

    if (preferedPerson in authorPerson.prefs){
        authorPerson.prefs[preferedPerson] = !authorPerson.prefs[preferedPerson];
    }
    else{
        authorPerson.prefs[preferedPerson] = true;
    }

    showPreferences(author);
}

function getPersonByName(name){
    for (let i = 0; i < people.length; i++) {
        if (people[i].name == name)
            return people[i];
    }
}

function removePersonFromArrayByName(array, name){
    for (let i = 0; i < array.length; i++)
        if (array[i].name == name)
            array.splice(i, 1);
}

function onDrop(event){
    event.target.append(draggedElement);
    removePersonFromArrayByName(draggedPerson.group, draggedPerson.name);
    if (event.target.dataset.id == null){
        draggedPerson.group = unsorted;
    }
    else{
        draggedPerson.group = groups[event.target.dataset.id];
    }
    draggedPerson.group.push(draggedPerson);

    for (let i = 0; i < numGroups; i++) {
        console.log(groups[i]);
    }
    console.log(unsorted);
}

var people = [];

var unsorted = [];
var groups = [];

var draggedElement;
var draggedPerson;

const numGroups = 4;

for (let i = 0; i < numGroups; i++) {
    let newGroup = [];
    groups.push(newGroup);

    const groupDiv = document.createElement("div");
    groupDiv.classList.add("group");
    groupDiv.dataset.id = i.toString();
    groupDiv.addEventListener('dragover', function(event){
        event.preventDefault();
    })
    groupDiv.addEventListener('drop', function(event) {
        onDrop(event);
    })
    document.getElementById("groups").appendChild(groupDiv);
}
