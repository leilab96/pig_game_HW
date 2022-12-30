// console.log('hello word');

// változó deklarálás
// let pontszam = 4;
// nem módosítható változó deklarálás
// const pi = 3.14;
// a potszám változó értékét növeltük egy-el
// pontszam = pontszam +1;

// console.log(pontszam);

// tömb, array:
// let scores = [2,3,4,5];

// az egész tömböt kiirja:
// console.log(scores);
// csak a nulladik elemet irja ki:
// console.log(scores[0]);

// változó deklarálás
let scores, roundScore, activePlayer;


function newGame() {

  // a játékosok pontszámai, mindkét játákos null ponttal indul
  // értékadás : value assignment
  scores = [0, 0];

  // forduló alatt megszerzett pontok
  roundScore = 0;

  // az első játékos kezd
  activePlayer = 0;

  // dom manipuláció (dom: document object model = HTML kód)

  // kiválsztjuk a score-0 id-vel rendelkező html elemet
  // és a tartalmát beállítjuk 0-ra
  document.querySelector('#score-0').textContent = 0;

  // camelCase: mindenÚjSzótNagyBetűvelÍrunk // JavaScript
  // PascalCase: AzElsőBetűIsNagybetű // JavaScript
  // snake_case: minden_szó_között_alsóvonás_van // Python
  // kebab-case: a-szavak-között-kötőjel-van  // CSS


  document.querySelector('#score-1').textContent = 0;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;

  // a játék indításakor a kocka még nem látszik:
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.btn-hold').style.display = 'block';
  document.querySelector('.btn-roll').style.display = 'block';

  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');


  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

newGame();

// a kokca dobás, gombra kattintás
document.querySelector('.btn-roll').addEventListener('click', function() {
  // 1. generálunk egy véletlen számot, 1-6 között
  const dice = Math.floor(Math.random() * 6 ) + 1;
  
  // 2. jelenítsük meg az eredményt a UI-on:
  document.querySelector('.dice').style.display = 'block';
  // template string
  document.querySelector('.dice').setAttribute('src', `dice-${dice}.png`);

  // szekvencia: a program az utasításokat sorról sorra hatja végre

  // string concatenation
  // document.querySelector('.dice').setAttribute('src', 'dice-'+dice+'.png');

  // ha nem 1 a dobott érték akkor felírjuk a pontszámot, és ugyanaz a játékos dobhat újra
  // elágazás:
  if (dice !== 1) {
    roundScore = roundScore + dice;
    // a UI-on megjelenítjük az eredményt:
    document.querySelector('#current-'+activePlayer).textContent = roundScore;
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
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

}

document.querySelector('.btn-hold').addEventListener('click', function() {
  // 1. a játékos megszerzi a kör alatt szerzett pontjait
  scores[activePlayer] = scores[activePlayer] + roundScore;
  // scores[activePlayer] += roundScore;
  
  // 2. UI-t frissítsük
  document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

  // 3. nézzük meg hogy van e nyertes
  if (scores[activePlayer] >= 20) {
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');

    document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'none';

  } else {
    // másik játékos jön:
    nextPlayer();
  }

});



document.querySelector('.btn-new').addEventListener('click', newGame);
