class Person
{
    name;
    preferedPeople = {};

    constructor(name){
        this.name = name;
    }
}

//////

function addPerson(){
    var inputName = document.getElementById('input-name');
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

    var newPerson = new Person(name);
    people.push(newPerson);
}

function showPreferences(name){
    var preferencesDiv = document.getElementById('preferences');
    preferencesDiv.innerHTML = '';

    for (let i = 0; i < people.length; i++) {
        if (people[i].name == name)
            continue;
        
        const personBox = document.createElement("div");
        personBox.textContent = people[i].name;

        var authorPerson = getPersonByName(name);
        if (people[i].name in authorPerson.preferedPeople && authorPerson.preferedPeople[people[i].name]){
            personBox.style.color = "Chartreuse";
        }

        personBox.onclick = function() {changePreferences(name, people[i].name)}
        preferencesDiv.appendChild(personBox);
    }
}

function changePreferences(author, preferedPerson){
    var authorPerson = getPersonByName(author);

    if (preferedPerson in authorPerson.preferedPeople){
        authorPerson.preferedPeople[preferedPerson] = !authorPerson.preferedPeople[preferedPerson];
    }
    else{
        authorPerson.preferedPeople[preferedPerson] = true;
    }

    showPreferences(author);
}

function getPersonByName(name){
    for (let i = 0; i < people.length; i++) {
        if (people[i].name == name)
            return people[i];
    }
}

var people = [];