// változó deklarálás
let scores, roundScore, activePlayer, previousDices, finalScore;

function newGame() {
  // a játékosok pontszámai, mindkét játákos null ponttal indul
  // értékadás : value assignment
  scores = [0, 0];

  // forduló alatt megszerzett pontok
  roundScore = 0;

  // az első játékos kezd
  activePlayer = 0;

  //előző dobások lementése
  previousDices = [0, 0];

  // dom manipuláció (dom: document object model = HTML kód)

  // kiválsztjuk a score-0 id-vel rendelkező html elemet
  // és a tartalmát beállítjuk 0-ra
  document.querySelector("#score-0").textContent = 0;

  document.querySelector("#score-1").textContent = 0;
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;

  // a játék indításakor a kocka még nem látszik:
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".btn-hold").style.display = "block";
  document.querySelector(".btn-roll").style.display = "block";

  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  finalScore = document.getElementsByClassName("final-score")[0].value;
  if (finalScore <= 0) {
    console.log("Invalid value for Final Score. Default value is 100.");
    finalScore = 100;
  }
  console.log("Final Score value is: " + finalScore);
}

newGame();

// a kokca dobás, gombra kattintás
document.querySelector(".btn-roll").addEventListener("click", function () {
  // 1. generálunk egy véletlen számot, 1-6 között
  const dice = Math.floor(Math.random() * 6) + 1;

  // 2. jelenítsük meg az eredményt a UI-on:
  document.querySelector(".dice").style.display = "block";
  // template string
  document.querySelector(".dice").setAttribute("src", `dice-${dice}.png`);

  // először megvizsgálja hogy ha hatot dobtunk és hat volt az előző dobás értéke, akkor kinullázza a score-t és a másik játékosra ugrik
  if (previousDices[activePlayer] === 6 && dice === 6) {
    scores[activePlayer] = 0;
    //UI-on is frissítjük a score értéket
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    previousDices[activePlayer] = 0;
    nextPlayer();
    console.log("You threw 6 twice => Lost your points");
    //console.log(previousDices)
    return;
  }
  // ha nem 1 a dobott érték akkor felírjuk a pontszámot, és ugyanaz a játékos dobhat újra
  // elágazás:
  if (dice !== 1) {
    roundScore = roundScore + dice;
    previousDices[activePlayer] = dice;
    console.log(previousDices);
    // a UI-on megjelenítjük az eredményt:
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    // ha a dobott érték 1, akkor a pontok elvesznek és a következő játékos jön
    nextPlayer();
  }
});

// DRY = do not repeat yourself

function nextPlayer() {
  roundScore = 0;
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  // UI-on frissítsük az értékeket:
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

document.querySelector(".btn-hold").addEventListener("click", function () {
  // 1. a játékos megszerzi a kör alatt szerzett pontjait
  scores[activePlayer] = scores[activePlayer] + roundScore;
  // scores[activePlayer] += roundScore;

  // 2. UI-t frissítsük
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];

  // 3. nézzük meg hogy van e nyertes
  if (scores[activePlayer] >= finalScore) {
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.add("winner");
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.remove("active");

    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".btn-hold").style.display = "none";
    document.querySelector(".btn-roll").style.display = "none";
  } else {
    // másik játékos jön:
    nextPlayer();
  }
});

document.querySelector(".btn-new").addEventListener("click", newGame);
