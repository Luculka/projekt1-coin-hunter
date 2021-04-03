// použité proměnné
let panacek, panacekX, panacekY, panacekSirka, panacekVyska;
let mince, minceX, minceY, minceSirka, minceVyska;
let score, scoreElement;
let newScore = 0;


//pri nacteni stranky
function nacteniStranky() {
	panacek = document.querySelector("#panacek");
	mince = document.querySelector("#mince")

	//sirka a vyska panacka
	panacekSirka = panacek.width;
	panacekVyska = panacek.height;

	//panacek na stred stranky
	panacekX = Math.round(window.innerWidth / 2 - panacekSirka / 2);
	panacekY = Math.round(window.innerHeight / 2 - panacekVyska / 2);

	//umisteni panacka na startovni pozici
	umistiPanacka();

	//sirka a vyska mince
	minceSirka = mince.width;
	minceVyska = mince.height;

	//nahodne umisteni mince
	novaMince();
}

//umisti panacka na jeho souradnice
function umistiPanacka() {
	panacek.style.left = panacekX + "px";
	panacek.style.top = panacekY + "px";
}

//generovani nove pozice mince
function novaMince() {
	minceX = Math.floor(Math.random() * (window.innerWidth - minceSirka));
	minceY = Math.floor(Math.random() * (window.innerHeight - minceVyska));

	mince.style.left = minceX + "px";
	mince.style.top =  minceY + "px";
}


//pri stisku klavesy, zjistím pomoci API, vlastnost key
function priStiskuKlavesy(udalost){
	prehrajHudbu();

	if (udalost.key ==="ArrowLeft") {
		panacekX -= 10;
		if (panacekX < 0) {
			panacekX = 0;
		}
		panacek.src = "obrazky/panacek-vlevo.png";
	}

	if (udalost.key ==="ArrowRight") {
		panacekX += 10;
		if (panacekX + panacekSirka > window.innerWidth) {
			panacekX = window.innerWidth - panacekSirka;
		}
		panacek.src = "obrazky/panacek-vpravo.png";
	}

	if (udalost.key ==="ArrowUp") {
		panacekY -= 10;
		if (panacekY < 0) {
			panacekY = 0;
		}
		panacek.src = "obrazky/panacek-nahoru.png";
	}

	if (udalost.key ==="ArrowDown") {
		panacekY += 10;
		if (panacekY + panacekVyska > window.innerHeight) {
			panacekY = window.innerHeight - panacekVyska;
		}
		panacek.src = "obrazky/panacek.png";
	}

	umistiPanacka();
	otestujKolizi();
};

//funkce otestovani kolize panacka s minci (prunik 2 obdelniku)
function otestujKolizi() {
	if (!( panacekX + panacekSirka < minceX || minceX + minceSirka < panacekX || panacekY + panacekVyska < minceY || minceY + minceVyska < panacekY)) {
		// panacek a mince se prekryvaji
		prehrajMince();
		pricteniScore();
		novaMince();

	}
}


//newScore = 0, definovane pred funkci, jinak se to bude stale počitat od nuly!
function pricteniScore() {
	scoreElement = document.querySelector("#score");
	newScore++;
	scoreElement.textContent = newScore;

	if (newScore >= 5) {
		prehrajFanfaru();
		scoreElement.textContent = ("Gratuluji, vyhrál jsi!");
	}
}

function prehrajHudbu() {
	let hudbaElement = document.getElementById("hudba");
	hudbaElement.play();
}

function prehrajFanfaru() {
	let fanfaraElement = document.getElementById("zvukfanfara");
	fanfaraElement.play();
}

function prehrajMince() {
	let minceElement = document.getElementById("zvukmince");
	minceElement.play();
}
