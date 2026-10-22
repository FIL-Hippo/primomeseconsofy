// SOFY — interactions, scroll reveals, progress bar and animated reasons
const reasons = [
  "È bellissima", "È mora", "Ogni volta che la guardo mi perdo", "È alta",
  "Sa cos'è una Mercedes", "È intelligente", "È amorevole", "È shy 🙈",
  "Mi ha insegnato a pensare positivo", "Mi ha insegnato a dire la verità",
  "Mi ha insegnato ad amare veramente", "Capisce qualcosa a livello politico",
  "Quando sono solo con lei mi sento felice", "Mi corregge i verbi 😭🙏",
  "Mi fa sentire me stesso", "Mi fa rilassare", "Mi fa sfogare",
  "Quando sono giù e la sento mi rallegra", "Quando ho bisogno posso contare su di lei",
  "È tenera", "Mi tiene in riga 🫡‼️", "Mi ha aiutato a credere di più ✌️✝️",
  "È sincera", "È diretta", "È coraggiosa", "Con lei mi sento libero",
  "È veramente tanto bella", "Mi fa studiare 📚", "Mi dà motivazione nel fare le cose",
  "Mi dà sicurezza", "Il suo profumo mi fa impazzire",
  "Quando la abbraccio mi sento sicuro 🫂", "Mi fa sentire pensato durante la giornata",
  "Non le piace la discoteca", "Conosce onion 🧅", "Ha uno sguardo affascinante",
  "È dolce 💞", "È accogliente", "È gentile", "Si interessa a te",
  "Si veste bene", "Sa ruttare", "Riconosce un diesel da un benzina",
  "Bacia (molto) bene", "È una vampiretta ‼️💀🧛‍♀️", "Si interessa a tutto",
  "Mi fa impostare degli obiettivi", "Mi fa vivere una vita troppo bella",
  "Mi fa vivere amore vero", "Mi fa sentire libero di esprimermi 🗣️",
  "Penso a lei tutto il giorno 🏙️", "Il suo elastico non mi fa sentire solo",
  "Se sono arrabbiato mi fa calmare", "Sa tenere un discorso di senso compiuto",
  "Ha l'attenzione alta 📈", "Mi ha insegnato a usare meno il telefono",
  "Abbraccia come un koala 🐨", "Le piace Adventure Time 🗡️📺",
  "Le piace Gumball", "Quando la guardo mi perdo",
  "È l'esempio perfetto di donna-angelo 😇", "Quando penso a lei mi sento bene",
  "Mi manca sempre 😫", "È ironica 😂😒", "Ha un carattere forte e decisivo",
  "È simpaticissima", "Ha sempre qualcosa da dirmi", "Gli argomenti con lei non finiscono mai 👎",
  "Ha un corpo veramente bello 🤩😍", "Nasconde dei sentimenti 🫣💖",
  "Mi fa sognare sempre", "Mi migliora la giornata con un messaggio",
  "Mi fa battere il cuore anche facendo nulla", "I momenti semplici con lei sono speciali",
  "Mi fa sentire fortunato a conoscerla", "Mi piace sentire la sua voce",
  "Mi fa tenerezza quando fa la timida 🙈☺️", "È Sofia, e già solo questo basta ❤️❤️‍🩹",
  "Si accorge quando cambio umore", "Se nascondo qualcosa la sgama 🔎🧐",
  "Si preoccupa per me", "Posso stare zitto e non sentirmi a disagio",
  "Non ho paura di fare lo stupido con lei 🤡", "Si mette il gel sulle sopracciglia",
  "Mi capisce quando non so spiegarmi 😶‍🌫️", "Mi ascolta senza farmi sentire giudicato",
  "Si ricorda delle piccole cose che racconto", "Riesce a farmi sorridere anche a distanza",
  "Mi fa sentire importante 🛡️", "Mi accetta anche nei miei giorni peggiori",
  "Mi fa essere una persona migliore 🤩", "Vorrei stare sempre con lei",
  "Mi basta vederla per cambiare umore", "È così bella che mi fa perdere ❤️‍🔥",
  "Mi sembra un privilegio starci insieme", "Ogni giorno mi manca sempre di più"
];

function fillReasonLane(elementId, items) {
  const track = document.getElementById(elementId);
  if (!track) return;
  // Duplicate the content so the marquee loops seamlessly.
  const repeated = [...items, ...items];
  repeated.forEach((reason) => {
    const pill = document.createElement("span");
    pill.className = "reason-pill";
    pill.textContent = reason;
    track.appendChild(pill);
  });
}

function setupReasons() {
  const chunk = Math.ceil(reasons.length / 3);
  fillReasonLane("reasonTrack1", reasons.slice(0, chunk));
  fillReasonLane("reasonTrack2", reasons.slice(chunk, chunk * 2));
  fillReasonLane("reasonTrack3", reasons.slice(chunk * 2));
}

function setupImageSlots() {
  document.querySelectorAll("[data-photo]").forEach((element) => {
    const path = element.getAttribute("data-photo");
    const img = new Image();
    img.onload = () => {
      element.style.backgroundImage = `url("${path}")`;
      element.classList.add("has-photo");
    };
    img.onerror = () => {
      // Keep the styled placeholder visible until the user adds the image.
    };
    img.src = path;
  });
}

function setupRevealAnimations() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  items.forEach((item) => observer.observe(item));
}

function setupProgressBar() {
  const bar = document.getElementById("progressBar");
  if (!bar) return;
  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  };
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

setupReasons();
setupImageSlots();
setupRevealAnimations();
setupProgressBar();
