//actual band data
let bands = [
  { name: "siouxsie and the banshees", genre: "punk/goth", year: 1976, description: "my mom likes this band :3" },
  { name: "sidewalks and skeletons", genre: "witch house", year: 2011, description: "hi im the webhost and im picking this as my month fav" },
  { name: "massive attack", genre: "trip hop", year: 1988, description: "youuu r my angelll" },
  { name: "femtanyl", genre: "dark electronic", year: 2020, description: "everyone I show this to says its just noise and yeah but its rly good noise" },
  { name: "kneecap", genre: "irish rap", year: 2017, description: "D,D,T,T,I,D,F" },
  { name: "vertigoaway", genre: "alt noise", year: 2021, description: "idk i just added her because i like vaginoplasty triology (3 years) so listen to that one" },
  { name: "sewerslvt", genre: "breakcore", year: 2017, description: "mr kill myself is like peak midnight cool weed vibes" },
  { name: "goreshit", genre: "breakcore", year: 2005, description: "im adding this and if anyone calls me a weeb im not using this site anymore" },
  { name: "jane remover", genre: "digicore", year: 2019, description: "dar x3" },
  { name: "mel 4ever", genre: "hyperpop", year: 2021, description: "darcie again" },
  { name: "chase icon", genre: "alt pop", year: 2020, description: "hii its darcie im just gonna add some cool queer girly artists luv yall <3" },
  { name: "ladytron", genre: "electropop", year: 1999, description: "really cool retro band! my favs are seventeen and flicking your switch" },
  { name: "death grips", genre: "experimental hip hop", year: 2010, description: "she death on my grips till i see footage" }
];

//fav bands
const topPick = { 
  name: "Webhost recommends: Sidewalks and Skeletons", 
  genre: "alt experimental", 
  year: 2024, 
  description: "Witchhost perfection, listen to Eternal Rest here", 
  topPick: true 
};

let audioPlayer;
if (!audioPlayer) {
  audioPlayer = new Audio('fav.mp3');
  audioPlayer.loop = true;
  audioPlayer.volume = 0.7;
  audioPlayer.play();
}

//small helper
const byId = id => document.getElementById(id);

//display bands
function displayBands(list = bands) {
  const container = byId("bandDisplay");
  if (!container) return;
  container.innerHTML = "";

  // display top pick first
  const cardTop = document.createElement("div");
  cardTop.className = "band-card top-pick";
  cardTop.innerHTML = `<h3>${escapeHtml(topPick.name)}</h3>
                       <p>${escapeHtml(topPick.genre)}</p>
                       <p>formed: ${escapeHtml(String(topPick.year))}</p>
                       <p>${escapeHtml(topPick.description)}</p>
                       <button onclick="audioPlayer.play()">Play</button>
                       <button onclick="audioPlayer.pause()">Stop</button>`;
  container.appendChild(cardTop);

  list.forEach(b => {
    const card = document.createElement("div");
    card.className = "band-card";
    card.innerHTML = `<h3>${escapeHtml(b.name)}</h3>
                      <p>${escapeHtml(b.genre)}</p>
                      <p>formed: ${escapeHtml(String(b.year))}</p>
                      <p>${escapeHtml(b.description)}</p>`;
    container.appendChild(card);
  });
}

//add delete search functionality
function addBand() {
  const nameEl = byId("bandName");
  const genreEl = byId("genre");
  const yearEl = byId("year");
  const descEl = byId("description");
  if (!nameEl || !genreEl || !yearEl || !descEl) return;

  const name = nameEl.value.trim();
  const genre = genreEl.value.trim();
  const year = yearEl.value.trim();
  const description = descEl.value.trim();

  if (!name || !genre || !year) return;

  bands.push({ name, genre, year, description });
  displayBands();
  nameEl.value = genreEl.value = yearEl.value = descEl.value = "";
}

function deleteBand() {
  const searchEl = byId("searchInput");
  if (!searchEl) return;
  const target = searchEl.value.trim().toLowerCase();
  if (!target) return;
  bands = bands.filter(b => b.name.toLowerCase() !== target);
  displayBands();
}

function searchBand() {
  const searchEl = byId("searchInput");
  if (!searchEl) return;
  const term = searchEl.value.trim().toLowerCase();
  if (!term) return displayBands();
  const results = bands.filter(b =>
    b.name.toLowerCase().includes(term) || b.genre.toLowerCase().includes(term)
  );
  displayBands(results);
}

//random fun fact selection (include like 50ish)
function randomCowFact() {
  const facts = [
    "their horns can reach impressive spans and curve gracefully.",
    "they have two layers of fur — a long outer coat and a soft undercoat.",
    "highland cows can survive in severe winter conditions with ease.",
    "they are calm animals and often used in conservation grazing.",
    "their milk has a higher butterfat content than average cow milk.",
    "I have a plushie of one on my desk and it motivates me to make websites however in return I must engrave a tribute to it in said websites.",
    "highland cows say trans rights!.",
    "They can travel at around 25 miles per hour.",
    "Highland cows love humans and enjoy their attention, so love them back!.",
    "They are herbivores, eating grass, flowers, plants and leaves.",
    "In Minecraft Earth, the highland cow (woolly cow ingame) is a wooly variant of the basic cow.",
    "they are really cute :3.",
    "they are cows (technically).",
    "one once spoke to me in a dead tongue, and while i did not understand what it said, its tone gave me comfort in the idea of death."
  ];

  const out = byId("randomFactDisplay");
  if (!out) return;

  const pick = facts[Math.floor(Math.random() * facts.length)];
  out.textContent = pick;
}
//welcome page this stuff does the random rec and also does the unique clock thing, both at the bottom
function displayTimeGreeting() {
  const el = byId("timeGreeting");
  if (!el) return;
  const now = new Date();
  const hour = now.getHours();
  let message = "";

  if (hour === 4) message = "watch out, it's the witching hour, is everything locked tight?";
  else if (hour === 0) message = "It's midnight, some are resting, some wake up.";
  else if (hour >= 5 && hour < 8) message = "It's dawn, occults go to rest.";
  else if (hour >= 12 && hour < 14) message = "it's high noon.";
  else if (hour >= 18 && hour < 21) message = "It's evening time go home college students go rest or party or smth.";
  else message = "The rounded hour is " + hour + ":00.";

  el.textContent = message;

  // random band recommendation
  const randBandEl = byId("randomBandRec");
  if (!randBandEl) return;
  const rand = bands[Math.floor(Math.random() * bands.length)];
  randBandEl.innerHTML = `<h3>Random Recommendation</h3>
                          <p><strong>${rand.name}</strong> — ${rand.genre} (${rand.year})</p>`;
}

//about page
function displayCreatorInfo() {
  const nameEl = byId("creatorName");
  const infoEl = byId("creatorInfo");
  if (!nameEl || !infoEl) return;

  const creator = { name: "Matthew Downey", course: "Creative Computing", semester: 3 };
  nameEl.textContent = creator.name;
  infoEl.textContent = `Course: ${creator.course}, Semester ${creator.semester}`;
}

//escape html
function escapeHtml(unsafe) {
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

//event listeners 
document.addEventListener("DOMContentLoaded", () => {
  displayBands();
  displayTimeGreeting();
  displayCreatorInfo();

  const btnAdd = byId("btnAdd");
  const btnDelete = byId("btnDelete");
  const btnSearch = byId("btnSearch");
  const btnCow = byId("btnRandomCow");

  if (btnAdd) btnAdd.addEventListener("click", addBand);
  if (btnDelete) btnDelete.addEventListener("click", deleteBand);
  if (btnSearch) btnSearch.addEventListener("click", searchBand);
  if (btnCow) btnCow.addEventListener("click", randomCowFact);
});
