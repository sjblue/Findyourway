const test_main = document.querySelector("#test_main");
const test_qna = document.querySelector("#test_qna");
const result = document.querySelector("#test_result");
const endPoint = 5;
const select = [0, 0, 0];


function calResult(){
    var result = select.indexOf(Math.max(...select));
    return result;
}
function setResult(){
    let point = calResult();
    const resultName = document.querySelector(".resultname");
    resultName.innerHTML = infoList[point].name;

    var resultImg =document.createElement("img");
    const imgDiv = document.querySelector(".resultImg");
    var imgURL = "images/main/test/result" + point + ".png";
    resultImg.src = imgURL;
    resultImg.alt = point;
    imgDiv.appendChild(resultImg);

   const resultDesc = document.querySelector('.resultDesc');
   resultDesc.innerHTML = infoList[point].desc;
}

function goResult(){
    test_qna.style.WebkitAnimation = "fadeOut 0.5s";
    test_qna.style.animation = "fadeOut 0.5s";
    setTimeout(() => {
        test_result.style.WebkitAnimation = "fadeIn 1s";
        test_result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            test_qna.style.display = "none";
            test_result.style.display = "block";
        }, 450)});
        setResult();
}

function addAnswer(answerText, qIdx, idx){
    var a = document.querySelector(".abox");
    var answer = document.createElement("button")
    answer.classList.add("answerList");
    answer.classList.add("fadeIn");

    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click", function(){
        var children = document.querySelectorAll(".answerList");
        for(let i = 0; i <children.length; i++){
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
            var target = qnaList[qIdx].a[idx].type;
            for(let i = 0; i < target.length; i++){
                select[target[i]] += 1;
            }

            for(let i = 0; i <children.length; i++){
                children[i].style.display = "none";
            }
        goNext(++qIdx);
        },450)
    }, false);
}

function goNext(qIdx){
    if(qIdx === endPoint){
        goResult();
        return;
    }

    var q = document.querySelector(".qbox");
    q.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    var status = document.querySelector(".statusBar");
    status.style.width = (100/endPoint) * (qIdx+1) + "%";
}
function begin(){
    test_main.style.WebkitAnimation = "fadeOut 1s";
    test_main.style.animation = "fadeOut 1s";
    setTimeout(() => {
        test_qna.style.WebkitAnimation = "fadeIn 1s";
        test_qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            test_main.style.display = "none";
            test_qna.style.display = "block";
        }, 450);
        let qIdx = 0;
        goNext(qIdx);
    }, 450);
}