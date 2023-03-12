const pages = [
    ["page1_front.png", "page1_back.png"],
    ["page2_front.png", "page2_back.png"],
    ["page3_front.png", "page3_back.png"],
];

const path = "./pages/";
const book = document.getElementById("book");

function createHtml() {
    let count = 1;
    let resume = "";
    pages.forEach((page) => {
        let index = 0;
        resume += `<div id="page${count}" class="page">
                        <div class="front">
                            <div class="frontContent">
                                <img src="${path + page[index]}" alt="">
                            </div>
                        </div>
                        <div class="back">
                            <div class="backContent">
                                <img src="${path + page[index + 1]}" alt="">
                            </div>
                        </div>
                    </div>`;
        count++;
    });
    book.innerHTML = resume;
}

createHtml();

const previousButton = document.querySelector("#previousButton");
const nextButton = document.querySelector("#nextButton");

const page1 = document.querySelector("#page1");
const page2 = document.querySelector("#page2");
const page3 = document.querySelector("#page3");

previousButton.addEventListener("click", goPreviousPage);
nextButton.addEventListener("click", goNextPage);

let currentLocation = 1;
let numOfpages = pages.length;
let maxLocation = numOfpages + 1;

function openBook() {
    book.style.transform = "translateX(50%)";
    previousButton.style.transform = "translateX(-180px)";
    nextButton.style.transform = "translateX(180px)";
}

function closeBook(isAtBeginning) {
    if (isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }

    previousButton.style.transform = "translateX(0px)";
    nextButton.style.transform = "translateX(0px)";
}

function goNextPage() {
    if (currentLocation < maxLocation) {
        switch (currentLocation) {
            case 1:
                openBook();
                page1.classList.add("flipped");
                page1.style.zIndex = 1;
                break;
            case 2:
                page2.classList.add("flipped");
                page2.style.zIndex = 2;
                break;
            case 3:
                page3.classList.add("flipped");
                page3.style.zIndex = 3;
                closeBook(false);
                break;
            default:
                throw new Error("Damaged page");
        }
        currentLocation++;
    }
}

function goPreviousPage() {
    if (currentLocation > 1) {
        switch (currentLocation) {
            case 2:
                closeBook(true);
                page1.classList.remove("flipped");
                page1.style.zIndex = 3;
                break;
            case 3:
                page2.classList.remove("flipped");
                page2.style.zIndex = 2;
                break;
            case 4:
                openBook();
                page3.classList.remove("flipped");
                page3.style.zIndex = 1;
                break;
            default:
                throw new Error("unkown state");
        }
        currentLocation--;
    }
}
