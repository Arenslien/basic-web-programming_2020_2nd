//Main Menu Div에 포함될 피자들에 대한 자바스크립트 파일

// 피자 객체 배열
var pizza = new Array(6);

var cnt = 0; // 피자 객체 id 카운트 용
var allPrice = 0;
var selectedPizza = null;

// 피자 이미지 경로 배열
var pizzaFile = [
    "./picture/pizza1.jpg",
    "./picture/pizza2.jpg",
    "./picture/pizza3.jpg",
    "./picture/pizza4.jpg",
    "./picture/pizza5.jpg",
    "./picture/pizza6.jpg"];

// 피자 메뉴 이름 배열
var pizzaName = ["스타 셰프 시그니처", "글로벌 레전드4BEST", "리얼불고기", "우리고구마", "슈퍼디럭스", "슈퍼스프림"];

// 피자 메뉴 가격 배열
var pizzaPrice = [36900, 35900, 27900, 29900, 25900, 25900];

// 피자 메뉴 주재료 배열
var pizzaIngredient = ["스테이크, 트러플", "불고기, 새우", "불고기", "고구마", "페퍼로니", "파인애플, 페퍼로니"];

// 피자 메뉴 설명 배열
var pizzaExplain = [
    "#드라이에이징 스테이크와 트러플 크림 소스의 조화!",
    "#한국, 미국, 호주, 프랑스! 레전드의 만남",
    "#프리미엄 불고기 토핑이 듬뿍",
    "#고구마 큐브&무스가 듬뿍!",
    "#누구나 사랑하는 베이직 피자",
    "#콘과 파인애플의 달콤한 조화",
];

// onmouseover 함수
function over(e) {
    var imgId = e.currentTarget.id[3];
    var infoBox = document.getElementById("info"+imgId);
    infoBox.style.visibility = "visible";
}

// onmouseout 함수
function out(e) {
    var imgId = e.currentTarget.id[3];
    var infoBox = document.getElementById("info"+imgId);
    infoBox.style.visibility = "hidden";
}

//ondblclick 함수
function dblclick(e) {
    var mainOrderDiv = document.getElementById("mainOrder");
    var imgId = parseInt(e.currentTarget.id[3]);
    var obj = e.currentTarget;

    //기존에 선택된 것 지우기
    if(mainOrderDiv.childElementCount != 0) {
        var child = mainOrderDiv.firstElementChild;
        let index = parseInt(child.id[4]);

        //선택 표시 지우기
        var img = document.getElementById("img"+(index));
        img.style.borderRadius = "0px";
        img.style.borderStyle = "none";

        //mainOrder Div에 있는 피자 정보 지우기
        mainOrderDiv.removeChild(child);
        //가격 정정
        allPrice -= pizza[index].price;
    }

    //새로 선택된 것 표시
    obj.style.borderRadius = "2px";
    obj.style.borderStyle = "solid";
    obj.style.borderColor = "red";
    pizza[imgId].selected = true;

    var mainOrder = document.createElement("li");
    mainOrder.id = "main" + imgId;
    mainOrder.innerHTML = pizza[imgId].name;

    mainOrderDiv.appendChild(mainOrder);

    allPrice += pizza[imgId].price;
    alert("메뉴를 선택했습니다.");

    changedPrice();
}

// 사이드 메뉴 종류 배열
var sideMenu = ["크리스피 핫 순살 치킨(8조각)", "트러플 리조또", "하프 & 하프 스파게티", "치즈 볼로네즈 스파게티", "스파이시 씨푸드 로제 파스타", "토마토 파스타"];

// 사이드 메뉴 가격
var sidePrice = [8900, 7900, 7900, 5900, 6900, 6900];

function myChange() {
    var selectTag = document.getElementById("select");
    var index = selectTag.selectedIndex - 1;
    var sideOrderDiv = document.getElementById("sideOrder");
    
    //기존에 있던 메뉴 제거
    if(sideOrderDiv.childElementCount != 0) {
        var removeTarget = sideOrderDiv.firstElementChild;
        //금액 삭제
        allPrice -= sidePrice[parseInt(removeTarget.id[4])];
        sideOrderDiv.removeChild(removeTarget);
    }

    //메뉴판에 추가
    var newLi = document.createElement("li");
    newLi.id = "side" + index;
    newLi.innerHTML = sideMenu[index];
    sideOrderDiv.appendChild(newLi);

    //금액 추가
    allPrice += sidePrice[index];
    changedPrice();
}

//토핑 가격
var toppingPrice = [2000, 2000, 2000, 2000, 1000, 1000, 1000, 1000, 1000, 1000, 1000];

//토핑 메뉴
var toppingMenu = ["베이컨", "햄", "불고기", "통새우", "양파", "피망", "버섯", "옥수수", "올리브", "파인애플", "체다치즈"];


//onclick 함수
function click() {
    var radios = document.getElementsByName("topping");
    var optionOrderDiv = document.getElementById("optionOrder");
    var index;
    for(var i=0; i<radios.length; i++) {
        if(radios[i].checked == true) {
            index = parseInt(radios[i].value);
        }
    }

    //기존에 선택한 토핑이 있을 경우
    if(optionOrderDiv.childElementCount != 0) {
        var removeTarget = optionOrderDiv.firstElementChild;
        //금액 삭제
        allPrice -= toppingPrice[parseInt(removeTarget.id[6])];
        optionOrderDiv.removeChild(removeTarget);
    }

    //토핑 추가 or 변경
    var newLi = document.createElement("li");
    newLi.id = "option" + index;
    newLi.innerHTML = toppingMenu[index];
    optionOrderDiv.appendChild(newLi);

    //금액 추가
    allPrice += toppingPrice[index];
    changedPrice();
}

function changedPrice() {
    var priceSpan = document.getElementById("allPrice");
    priceSpan.innerHTML = allPrice;
}

function Pizza(src, name, price, mainIngredient, explain) {
    this.src = src;
    this.name = name;
    this.price = price;
    this.mainIngredient = mainIngredient;
    this.explain = explain;
    this.selected = false;
}

Pizza.prototype.getInfoDiv = function () {
    var infoBox = document.createElement("div");
    var text = "";
    infoBox.className = "infoBox";
    infoBox.id = "info" + cnt;
    text += this.name + "<br>" +
            this.price + "원<br>" +
            "주재료: " + this.mainIngredient + "<br>" +
            this.explain;
    infoBox.innerHTML = text;
    return infoBox;
};

Pizza.prototype.getImgDiv = function () {
    var img = document.createElement("img");
    img.className = "pizza";
    img.id = "img" + cnt;
    img.src = this.src;
    img.onmouseover = over;
    img.onmouseout = out;
    img.ondblclick = dblclick;
    return img;
};

Pizza.prototype.getPizzaBox = function () {
    var pizzaBox = document.createElement("div");
    pizzaBox.className = "pizzaBox";
    pizzaBox.appendChild(this.getImgDiv());
    pizzaBox.appendChild(this.getInfoDiv());
    cnt++;
    return pizzaBox;
};

// 모든 피자 객체 생성
for(var i=0; i<pizza.length; i++) {
    pizza[i] = new Pizza(pizzaFile[i], pizzaName[i], pizzaPrice[i], pizzaIngredient[i], pizzaExplain[i]);
}

function init() {
    var mainMenuDiv = document.getElementById("mainMenu");
    for(var i=0; i<pizza.length; i++) {
        mainMenuDiv.appendChild(pizza[i].getPizzaBox());
    }
}

function initOnclick() {
    //radio onclick
    var radios = document.getElementsByName("topping");
    for(var i=0; i<radios.length; i++) {
        radios[i].onclick = click;
    }
}

function order() {
    var name = prompt("고객님의 성함을 입력해주세요.");
    var pizza = document.getElementById("mainOrder").firstElementChild.innerHTML;
    var side = document.getElementById("sideOrder").firstElementChild.innerHTML;
    var option = document.getElementById("optionOrder").firstElementChild.innerHTML;

    alert(`${name}님의 ${pizza}, ${side}, ${option}주문이 완료되었습니다.`);
    return true;
}