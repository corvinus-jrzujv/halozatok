var kérdések;
var kérdésSorszám = 0;

window.onload = () => {
    letöltés();
    kérdésBetöltés(kérdésSorszám)
};

function letöltés() {
    fetch("/questions/all")
        .then(response => response.json())
        .then(data => { kérdésSorszám = data.length });
      
}
function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(válaszfeldolgozás)
        .then(kérdésMegjelenítés);
}   

function válaszfeldolgozás(válasz) {
    if (!válasz.ok) {
        console.error(`Hibás válasz: ${response.status}`)
    }
    else {
        return válasz.json()
    }
}


function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d
    kérdésMegjelenítés(id);
}
id = 1;
function kérdésMegjelenítés(kérdés) {
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;


    if (kérdés.image != "") {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    }
    else {
        document.getElementById("kép1").src = "";
    }

    answer1.classList.remove("jó", "rossz");
    answer2.classList.remove("jó", "rossz");
    answer3.classList.remove("jó", "rossz");
}

function Előre() {
    id++;
    if (id<=kérdésSorszám-1) {
        kérdésBetöltés(id);
    }
    else {
        id = 1;
        kérdésBetöltés(id);
    }
};

function Vissza() {
    id--;
    if (id>=1) {
        kérdésBetöltés(id);
    }
    else {
        id = kérdésSorszám - 1;
        kérdésBetöltés(id);
    }
}
