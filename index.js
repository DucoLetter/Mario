function isOdd(num) {
  return num % 2;
}
let pressed = "";
let odd = [];
let pauzeer = function () {
  document.getElementById("star").style = "animation-play-state: paused;";
  document.getElementById("bullet1").style = "animation-play-state: paused;";
  document.getElementById("bullet2").style = "animation-play-state: paused;";
  document.getElementById("toadhouse").style = "animation-play-state: paused;";
  document.getElementById("background").pause();
};
let start = function () {
  document.getElementById("star").style = "animation-play-state: running;";
  document.getElementById("bullet1").style = "animation-play-state: running;";
  document.getElementById("bullet2").style = "animation-play-state: running;";
  document.getElementById("toadhouse").style = "animation-play-state: running;";
};

let box = [0];
document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 38:
      if (
        document.getElementById("toadhouse").style.animationPlayState ==
        "running"
      ) {
        document.getElementById("cart").className = "mario_up";
      }
      break;
    case 40:
      if (
        document.getElementById("toadhouse").style.animationPlayState ==
        "running"
      ) {
        document.getElementById("cart").className = "mario_down";
      }
      break;
    case 13:
      pressed++;
      odd.push(isOdd(pressed));
      if (odd[pressed - 1] == 0 && box < 3) {
        pauzeer();
      } else if (odd[pressed - 1] == 1 && box < 3) {
        start();
        document.getElementById("background").volume = 0.4;
        document.getElementById("background").play();
      } else if (box == 4) {
        location.reload();
      }
      break;
    case 67:
      console.log(odd, pressed);
      break;
  }
};
// hierboven is alle key input
let hoi = [];
function getNumber() {
  do {
    random = Math.floor(Math.random() * (3 - 0)) + 0;
  } while (random === getNumber.last);
  getNumber.last = random;
  return random;
}
for (i = 0; i < 100; i++) {
  hoi.push(getNumber());
}
console.log(hoi);
// hierboven is de random nummber-array 0,1,2 zonder dubbele nummers
let count = [0];
let hits = [0];

let checkHit = setInterval(function () {
  let truck = document.getElementById("cart");
  let ster = document.getElementById("star");
  let bullet1 = document.getElementById("bullet1");
  let bullet2 = document.getElementById("bullet2");
  let sterhit =
    ster.getBoundingClientRect().left > 10 &&
    ster.getBoundingClientRect().left < 90 &&
    ster.getBoundingClientRect().top > truck.getBoundingClientRect().top &&
    ster.getBoundingClientRect().top < truck.getBoundingClientRect().bottom;
  let bulletUpHit =
    bullet1.getBoundingClientRect().left > 10 &&
    bullet1.getBoundingClientRect().left < 90 &&
    bullet1.getBoundingClientRect().top > truck.getBoundingClientRect().top &&
    bullet1.getBoundingClientRect().top < truck.getBoundingClientRect().bottom;
  let bulletDownHit =
    bullet2.getBoundingClientRect().left > 10 &&
    bullet2.getBoundingClientRect().left < 90 &&
    bullet2.getBoundingClientRect().top > truck.getBoundingClientRect().top &&
    bullet2.getBoundingClientRect().top < truck.getBoundingClientRect().bottom;

  if (sterhit) {
    count++;
    hits++;
    document.getElementById("starHit").volume = 0.2;
    document.getElementById("starHit").play();
    document.getElementById("score").innerHTML =
      "Earn " + (3 - hits) + " stars to unlock next box";
    if (hoi[count] == 0) {
      ster.className = "star_down";
    } else if (hoi[count] == 1) {
      ster.className = "star_up";
    } else if (hoi[count] == 2) {
      ster.className = "star2_up";
    }
  }
  if (bulletUpHit) {
    bullet1.className = "";
    pauzeer();
    document.getElementById("reload").innerHTML =
      "You were HIT! Press R to Retry";
    document.getElementById("bulletHit").play();
  }
  if (bulletDownHit) {
    bullet2.className = "";
    pauzeer();
    document.getElementById("reload").innerHTML =
      "You were HIT! Press R to Retry";
    document.getElementById("bulletHit").play();
  }
  if (hits == 3) {
    hits = 0;
    document.getElementById("score").innerHTML =
      "Earn " + (3 - hits) + " stars to unlock next box";
    box++;
  }
  if (box == 1) {
    document.getElementById("question1").style =
      "animation-play-state: running;cursor: pointer;";
    document.getElementById("question1").addEventListener("click", () => {
      document.getElementById("bill1").style = "animation-play-state: running;";
      document.getElementById("question1").className = "question1";
    });
  }
  if (box == 2) {
    document.getElementById("question2").style =
      "animation-play-state: running; cursor: pointer;";
    document.getElementById("score").innerHTML =
      "Earn " + (3 - hits) + " stars to unlock FINAL box";
    document.getElementById("question2").addEventListener("click", () => {
      document.getElementById("bill2").style = "animation-play-state: running;";
      document.getElementById("question2").className = "question1";
    });
  }
  if (box == 3) {
    document.getElementById("question3").style =
      "animation-play-state: running; cursor: pointer;";
    document.getElementById("question3").addEventListener("click", () => {
      document.getElementById("bill3").style = "animation-play-state: running;";
      document.getElementById("question3").className = "question1";
    });
    pauzeer();
    document.getElementById("reload").innerHTML = "VICTORY";
    document.getElementById("reload").className = "victory";
    document.getElementById("audio").play();
    document.getElementById("score").innerHTML = "You did it!";
    box++;
  }
}, 10);

document.getElementById("IImg").addEventListener("mouseover", () => {
  document.getElementById("rules").style = "opacity: 1;";
});
document.getElementById("IImg").addEventListener("mouseout", () => {
  document.getElementById("rules").style = "opacity: 0;";
});
