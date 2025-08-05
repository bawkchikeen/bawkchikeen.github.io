//target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const allpages = document.querySelectorAll(".page");
var currentpage = document.querySelector("#page1");
const nav = document.querySelector("nav");
const hamBtn = document.querySelector("#hamIcon");
const menuItemsList = document.querySelector("nav ul");
const fishAll = document.querySelector("#fishesAll");
const dooguk = new Audio("audio/dooguk.mp3");

function toggleMenus() { /*open and close menu*/
    //if menuItemsList dont have the class "menuShow", add it, else remove it
    nav.classList.toggle("menuShow");
    //if menu is showing (has the class “menuShow”)
    if (nav.classList.contains("menuShow")) {
        menuItemsList.style.left = 0;
    }
    else { //if menu NOT showing
        menuItemsList.style.left = -100 + "%";
    }
}

hamBtn.addEventListener("click", toggleMenus);

function hideall() { //function to hide all pages
    if (nav.classList.contains("menuShow")) {
        toggleMenus();
    }
    for (let currentpage of allpages) { //go through all subtopic pages
        currentpage.style.display = "none"; //hide it
        currentpage.classList.remove("slideIn");
    }
}

const navTitle = document.querySelector("nav div");

function show(pgno) { //function to show selected page no
    dooguk.currentTime = 0;
    dooguk.play();
    hideall();
    if (currentpage.id != "page" + pgno) {
        resetFish();
        resetMush();
    }
    //select the page based on the parameter passed in
    currentpage = document.querySelector("#page" + pgno);
    currentpage.classList.toggle("slideIn");
    currentpage.style.display = "flex"; //show the page
    let onebtn = document.querySelector("#page" + pgno + "btn");
    navTitle.innerHTML = onebtn.innerHTML;
}

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
    show(1);
});
page2btn.addEventListener("click", function () {
    show(2);
});
page3btn.addEventListener("click", function () {
    show(3);
    fishGame.style.height = fishGame.offsetWidth / 200 * 150 + "px";
    fishAll.style.height = fishAll.offsetWidth / 200 * 150 + "px";
});

show(1);

// header parallax effect
const bearGrylls = document.querySelector("#bearGrylls");
const headerText = document.querySelector("#headerText");
const headerBg = document.querySelector("#headerBg");

document.addEventListener("scroll", function () {
    headerText.style.top = 100 + 1.15 * window.scrollY + "px";
    bearGrylls.style.top = 1.5 * window.scrollY + "px";
    headerBg.style.top = -0.2 * window.scrollY + "px";
})

//mushroom game
const mushroomGame = document.querySelector(".mushroomGame");
const mushOption_1 = document.querySelector("#mushOption_1");
const mushOption_2 = document.querySelector("#mushOption_2");
const mushScore = document.querySelector("#mushScore");
const mushGameArea = document.querySelector("#mushGameArea")
const mushGameButton = document.querySelector(".mushroomGame button");
const mushGameCover = document.querySelector("#mushGameCover");
const mushPopup = document.querySelector("#mushGameCover+div");
const mushPopupTitle = document.querySelector("#mushGameCover+div h2");
const mushPopupText = document.querySelector("#mushGameCover+div p");
const mushPopupImage = document.querySelector("#mushGameCover+div img");
const correctAudio = new Audio("audio/ding.mp3");
const wrongAudio = new Audio("audio/doowop.mp3");
var totalQuestions = 5;
var question = 0;
var correct = 0;
var score = 0;
console.debug(mushGameButton.tagName);

mushGameButton.addEventListener("click", mushGame);
function mushGame() {
    mushPopup.style.display = "none";
    mushGameCover.style.display = "none";
    switch (question) {
        case 0:
            mushOption_1.style.backgroundImage = "url('images/chanterelles.jpg')";
            mushOption_2.style.backgroundImage = "url('images/jack-o-lantern.jpg')";
            correct = 1;
            break;
        case 1:
            mushOption_1.style.backgroundImage = "url('images/puffball.jpg')";
            mushOption_2.style.backgroundImage = "url('images/amanitaEgg.webp')";
            correct = 1;
            break;
        case 2:
            mushOption_1.style.backgroundImage = "url('images/alcoholinkcap.webp')";
            mushOption_2.style.backgroundImage = "url('images/shaggymane.jpg')";
            correct = 2;
            break;
        case 3:
            mushOption_1.style.backgroundImage = "url('images/shaggymaneSprouting.jpg')";
            mushOption_2.style.backgroundImage = "url('images/AmanitaVirosaSprouting.jpg')";
            correct = 1;
            break;
        case 4:
            mushOption_1.style.backgroundImage = "url('images/gyromitra.webp')";
            mushOption_2.style.backgroundImage = "url('images/yellowmorel.jpg')";
            correct = 2;
            break;
        case 5:
            mushPopup.style.display = "flex";
            mushGameCover.style.opacity = 0 + "%";
            mushGameCover.style.display = "block";
            mushPopupImage.style.display = "none";
            mushPopupTitle.innerHTML = "Thanks for Playing!";
            mushPopupTitle.style.color = "black";
            mushPopupText.innerHTML = "I hope this game was informative and helpful in your future efforts in foraging mushrooms!<br>Final Score:<br>" + score + "/" + totalQuestions;
            mushGameButton.style.display = "none";
        default:
            console.debug("mushgame broke");
    }
}

mushGameArea.addEventListener("click", function (option) {
    if (option.target.id.split('_').pop() == correct) {
        correctAudio.currentTime = 0;
        correctAudio.play();
        mushScore.innerHTML = mushScore.innerHTML.replace('\u2B1C', '&#129001;');
        mushPopupTitle.innerHTML = "That's Right!";
        mushPopupTitle.style.color = "green";
        score++;
    }
    else {
        wrongAudio.currentTime = 0;
        wrongAudio.play();
        mushScore.innerHTML = mushScore.innerHTML.replace('\u2B1C', '&#128997;');
        mushPopupTitle.innerHTML = "That's Wrong!";
        mushPopupTitle.style.color = "red";
    }
    switch (question) {
        case 0:
            mushPopupText.innerHTML = "Chanterelles' (left) are often touted as a beginner mushroom for foragers! And while that is the case, some of its features can still be rather subtle. So be careful! as the Jack O' Lanterns (right) mushrooms are commonly mistaken for them and, while not lethal, can cause severe cramps, vomiting, and diarrhea!.";
            mushPopupImage.style.display = "block";
            mushPopupImage.src = "images/chanterellesVsjackOLanterns.jpg";
            mushGameButton.innerHTML = "Continue";
            break;
        case 1:
            mushPopupText.innerHTML = "The Giant Puffball (left) is considered edible while it's fresh, but once it starts to spore it's too late to forage! The way to check it is to disect it in half, which is also the only way to rule out its deadly toxic look-alike the Amanita 'Egg' (right). The Amanita family of fungi are extremely deadly containing famous names like the Death Cap, so be extremely careful!";
            mushPopupImage.src = "images/amanitaEggSplit.webp";
            break;
        case 2:
            mushPopupText.innerHTML = "Shaggy Mane (right) is a fine edible mushroom for the more experienced forager as if it matures, it begins to become slimy and not very appealing. This mushroom is also unfortunately very similar to a handful of toxic look-alikes. This one in particular is the 'Alcohol Inkly cap'(left), called that due to its toxic component, 'coprine', that is extremely reactive to alcohol which can cause headaches, extreme nausea, and a bunch of other unpleasantness.";
            mushPopupImage.src = "images/inkycap.webp";
            break;
        case 3:
            mushPopupText.innerHTML = "Did you catch it? These two mushrooms have been here before! We welcome back the Shaggy Mane (left) and the Amanita Virosa (right) or its common name, the Destroying Angel. This time they are both appearing in their 'sprouting' forms, and despite being the same mushrooms they can look so different! Being closely related to Death Caps, the Destroying Angel is one of the most toxic mushrooms known to man. So don't simply eat any ol white-gilled mushroom!";
            mushPopupImage.src = "images/destroyingAngelLifeCycle.webp";
            break;
        case 4:
            mushPopupText.innerHTML = "The Yellow Morel(right), or 'True Morel', one of my personal favourite mushrooms! These guys are fun and beginner friendly due to their distinct appearance, plus their poisonous look-alike, Gyromitra(left), is relatively easy to avoid. Still, it is very important to avoid them as they contain a highly toxic and carcinogenic chemical called Gyromitrin. This toxin can affect the central nervous system which can lead to anything from nausea and convulsions to coma and death.";
            mushPopupImage.src = "images/morelvsgyro.jpg";
            break;
        default:
            console.debug("mushgame trivia broke");
    }
    question++;
    mushPopup.style.display = "flex";
    mushGameCover.style.opacity = 0 + "%";
    mushGameCover.style.display = "block";
})


screen.orientation.addEventListener("change", function () {
    if (screen.orientation.type.startsWith("portrait")) {
        mushGameArea.style.flexDirection = "column";
        mushGameArea.style.padding = 0 + "px " + 8 + "px";
    }
    else if (screen.orientation.type.startsWith("landscape")) {
        mushGameArea.style.flexDirection = "row";
        mushGameArea.style.padding = 8 + "px " + 0 + "px";
    }
})

function resetMush() {
    question = 0;
    correct = 0;
    score = 0;

    mushPopup.style.display = "block";
    mushPopupTitle.style.color = "black";
    mushPopupTitle.innerHTML = "Guess which shroom is edible!";
    mushPopupText.innerHTML = "Pick between 2 mushrooms and find out which you should consume and which would presume you dead!";
    mushGameButton.innerHTML = "Start Game!";
    mushGameButton.style.display = "inline-block";
    mushGameCover.style.display = "block";
    mushGameCover.style.opacity = "30%";
    mushScore.innerHTML = "&#11036;&#11036;&#11036;&#11036;&#11036;"

}

//fish game
const fishGame = document.querySelector(".fishingGame");
const fishGameArea = document.querySelector("#fishGameArea");
const fishCanvas = document.querySelector("#fishGameArea canvas");
const fishCanvasContext = fishCanvas.getContext("2d");
fishCanvasContext.imageSmoothingEnabled = false;
const fishGameTop = document.querySelector("#fishGameTop");
const fishScoreText = document.querySelector("#fishGameScore");
const splashSound = new Audio("audio/splash.mp3");

fishCanvas.height = 150;
fishCanvas.width = 200;
var hook = new Image();
hook.src = "images/hook2.webp";

var spriteScale = 1;
window.addEventListener("resize", function () {
    if (currentpage.id == "page3") {
        fishGame.style.height = fishGame.offsetWidth / 200 * 150 + "px";
        fishAll.style.height = fishAll.offsetWidth / 200 * 150 + "px";
    }
})
var haveFish = 0;
var x = 0;
var y = 0;
var caughtFish;
fishAll.addEventListener("mousemove", function (event) {
    fishCanvasContext.clearRect(0, 0, fishCanvas.width, fishCanvas.height);

    if (event.target.id.split('_')[0] != 'fishID') {
        x = event.offsetX / fishCanvas.offsetWidth * 200;
        y = event.offsetY / fishCanvas.offsetHeight * 150;
    }
    fishCanvasContext.beginPath();
    fishCanvasContext.moveTo(90.5, 48.5);
    fishCanvasContext.lineTo(Math.round(x * 2) / 2, Math.round(y * 2) / 2);
    fishCanvasContext.stroke();
    fishCanvasContext.drawImage(hook, x - 2.5, y)
    console.debug("touch " + event.target.id);
    if (event.target.id.split('_')[0] == 'fishID' && haveFish == 0) {
        event.target.remove();
        haveFish = 1;
        caughtFish = document.createElement('div');
        caughtFish.id = 'caughtFish';
        caughtFish.classList.add('fishSprite');
        caughtFish.style.transform = "rotate(-90deg) translate(-50%, -110%)";
        caughtFish.style.pointerEvents = "none";
        fishAll.appendChild(caughtFish);
    }
    else if (event.target.id.split('_')[0] != 'fishID' && haveFish == 1) {
        caughtFish.style.left = event.offsetX + 'px';
        caughtFish.style.top = event.offsetY + 'px';
    }
})
var fishScore = 0;
fishAll.addEventListener("mousedown", function (event) {
    console.debug(event.offsetY);
    if (haveFish == 1 && event.offsetY <= fishesAll.offsetHeight / 2.25) {
        splashSound.currentTime = 0;
        splashSound.play();
        haveFish = 0;
        fishScore++;
        if (fishScore == 1) {
            fishScoreText.innerHTML = "Fish Caught: ";
        }
        fishScoreText.innerHTML += "🐟";
        caughtFish.remove();
    }
})
var fishid = 0;
var spawnRate = 1250;
const fishSpawnSlider = document.querySelector("#fishSpawnRange input");
fishSpawnSlider.addEventListener("input", function () {
    console.debug(fishSpawnSlider.value)
    spawnRate = fishSpawnSlider.value;
    clearInterval(fishSpawner);
    fishSpawner = setInterval(function () {
        if (currentpage.id == "page3")
            spawnFish()
    }, spawnRate);
})

function spawnFish() {
    var fishCount = fishAll.children.length;
    var newFish = document.createElement('div');
    newFish.id = 'fishID_' + (fishCount++);
    newFish.classList.add('fishSprite');
    if (Math.random() < 0.5) {
        newFish.style.left = 0 + '%';
        newFish.style.top = Math.random() * (95 - 60) + 60 + '%';
        newFish.style.animation = 'fishAnimation 0.5s steps(9, jump-none) infinite, swimRight 6s';
    }
    else {
        newFish.style.right = 0 + '%';
        newFish.style.top = Math.random() * (95 - 60) + 60 + '%';
        newFish.style.animation = 'fishAnimation 0.5s steps(9, jump-none) infinite, swimLeft 6s';
        newFish.style.transform = "scaleX(-1)";
    }
    newFish.addEventListener('animationend', function () {
        newFish.remove();
    })
    fishAll.appendChild(newFish);
}
function cullFish() {
    fishAll.replaceChildren();
}
var fishSpawner = setInterval(function () {
    if (currentpage.id == "page3")
        spawnFish()
}, spawnRate);

function resetFish() {
    cullFish();
    haveFish = 0;
    fishScore = 0;
    fishScoreText.innerHTML = "Fish Caught: 0"
}
