// scripts.js
const names = ["张家俊", "叶慧丽", "徐小英", "何景涛", "吴基杰"]; // 添加“吴基杰”
const spinButton = document.getElementById("spinButton");
const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3")
];
const recordList = document.getElementById("recordList");

const clickSound = new Audio('sounds/click.mp3');
const spinSound = new Audio('sounds/spin.mp3');
const stopSound = new Audio('sounds/stop.mp3');
const winSound = new Audio('sounds/win.mp3');
const backgroundMusic = new Audio('sounds/background.mp3');
backgroundMusic.loop = true;
backgroundMusic.play();

function getRandomName() {
    return names[Math.floor(Math.random() * names.length)];
}

function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function spin() {
    clickSound.play();
    spinSound.play();
    document.querySelector('.slot-machine').classList.add('rainbow');

    const resultName = getRandomName();
    const nameChars = resultName.split('');
    const firstColumn = names.map(name => name[0]);
    const secondColumn = names.map(name => name[1]);
    const thirdColumn = names.map(name => name[2]);

    let intervals = [];

    // Initialize reels with '?'
    reels.forEach(reel => {
        reel.textContent = '?';
    });

    setTimeout(() => {
        // Start rolling
        intervals[0] = setInterval(() => {
            reels[0].textContent = firstColumn[Math.floor(Math.random() * firstColumn.length)];
        }, 100);
        intervals[1] = setInterval(() => {
            reels[1].textContent = secondColumn[Math.floor(Math.random() * secondColumn.length)];
        }, 100);
        intervals[2] = setInterval(() => {
            reels[2].textContent = thirdColumn[Math.floor(Math.random() * thirdColumn.length)];
        }, 100);
    }, 1000); // Start rolling after 1 second for suspense

    setTimeout(() => {
        // Stop rolling and show the result
        intervals.forEach(clearInterval);
        reels[0].textContent = nameChars[0] || '?';
        reels[1].textContent = nameChars[1] || '?';
        reels[2].textContent = nameChars[2] || '?';
        spinSound.pause();
        stopSound.play();
        addRecord(resultName);
        winSound.play();
        showConfetti();
        document.querySelector('.slot-machine').classList.remove('rainbow');
    }, 5000); // Stop after 5 seconds
}

function addRecord(name) {
    const newRecord = document.createElement("li");
    const dateTime = getCurrentDateTime();
    newRecord.textContent = `${name} - ${dateTime}`;
    recordList.appendChild(newRecord);
    if (recordList.children.length > 30) {
        recordList.removeChild(recordList.firstChild);
    }
}

function showConfetti() {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

spinButton.addEventListener("click", spin);
