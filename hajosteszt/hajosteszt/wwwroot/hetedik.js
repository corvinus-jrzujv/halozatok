var kérdések;
var kérdésSorszám = 0;
var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;   
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;      
var timeoutHandler;

timeoutHandler = setTimeout(előre, 3000);

window.onload = () => {
    window.onload = function (e) {
        console.log("Oldal betöltve...");
        document.getElementById("előre_gomb").onclick = előre;
        document.getElementById("vissza_gomb").onclick = vissza;
        kérdésBetöltés(questionId)
    }
};

function letöltés() {
    fetch("/questions/all")
        .then(response => response.json())
        .then(data => { kérdésSorszám = data.length });
      
}
function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
            }
        );
}

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    //Első kérdések letöltése
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}
 

//function válaszfeldolgozás(válasz) {
//    if (!válasz.ok) {
//        console.error(`Hibás válasz: ${response.status}`)
//    }
//    else {
//        return válasz.json()
//    }
//}

function választás(n) {
    if (n != jóVálasz) {
        document.getElementById(`válasz${n}`).classList.add("rossz");
        document.getElementById(`válasz${jóVálasz}`).classList.add("jó");
    }
    else {
        document.getElementById(`válasz${jóVálasz}`).classList.add("jó");
    }
}

function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d
    kérdésMegjelenítés(id);
}
id = 1;

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;           
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    jóVálasz = kérdés.correctAnswer;
    if (kérdés.image) {
        document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
        document.getElementById("kép").classList.remove("rejtett")
    }
    else {
        document.getElementById("kép").classList.add("rejtett")
    }
    //Jó és rossz kérdések jelölésének levétele
    document.getElementById("válasz1").classList.remove("jó", "rossz");
    document.getElementById("válasz2").classList.remove("jó", "rossz");
    document.getElementById("válasz3").classList.remove("jó", "rossz");

//    .then(
//        q => {
//            hotList[destination].question = q;
//            hotList[destination].goodAnswers = 0;
//            console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
//            if (displayedQuestion == undefined && destination == 0) { //!!!!!!!!!!!!!
//                displayedQuestion = 0;
//                kérdésMegjelenítés();
//            }
//        }
//}

function előre() {
    clearTimeout(timeoutHandler)
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()
}

function vissza() {
    questionId--;
    kérdésBetöltés(questionId)}
}