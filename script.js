
/* ==========================================
   GOOD MORNING, SLEEPYHEAD ♡
   All interactive features in one file
========================================== */

// Find screens
const screens = {
  night: document.getElementById("nightScreen"),
  morning: document.getElementById("morningScreen"),
  subject: document.getElementById("subjectScreen"),
  diary: document.getElementById("diaryScreen"),
  kit: document.getElementById("kitScreen"),
  plant: document.getElementById("plantScreen")
};

// Find buttons and elements
const wakeButton = document.getElementById("wakeButton");
const toSubjectButton = document.getElementById("toSubjectButton");
const toDiaryButton = document.getElementById("toDiaryButton");
const toKitButton = document.getElementById("toKitButton");
const toPlantButton = document.getElementById("toPlantButton");
const restartButton = document.getElementById("restartButton");

const starField = document.getElementById("starField");
const petalsContainer = document.getElementById("petals");

const typedGreeting = document.getElementById("typedGreeting");

const subjectResult = document.getElementById("subjectResult");
const subjectPhoto = document.getElementById("subjectPhoto");
const resultEmoji = document.getElementById("resultEmoji");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");

const plant = document.getElementById("plant");
const seed = document.getElementById("seed");
const plantButton = document.getElementById("plantButton");
const plantCounter = document.getElementById("plantCounter");
const plantWish = document.getElementById("plantWish");
const wishNumber = document.getElementById("wishNumber");
const wishText = document.getElementById("wishText");
const flowerEnding = document.getElementById("flowerEnding");

// Text for the morning typing animation
const morningMessage =
  "I wish you a good day and good studies so that you are in a good mood ♡";

// Remember the selected subject
let selectedSubject = "";
let plantStep = 0;
let typingTimer = null;

// Morning wishes for the plant.
// The subject wish adapts to the subject selected earlier.
const plantWishes = [
  {
    title: "A little wish · 1/5",
    text: "I hope you slept really well, my love. You deserve peaceful nights, sweet dreams, and mornings when you wake up feeling happy. ♡"
  },
  {
    title: "A little wish · 2/5",
    text: "I hope you enjoy your breakfast. Eat something delicious, take your time, and give yourself a little energy for the day. ☀️"
  },
  {
    title: "A little wish · 3/5",
    text: "",
    subjectWish: true
  },
  {
    title: "A little wish · 4/5",
    text: "I hope your whole day is as amazing as you are. May everything go smoothly, may you smile a lot, and may the little things make you happy. 🌷"
  },
  {
    title: "A little wish · 5/5",
    text: "And I hope you know how much I love you and miss you already. Even when we're busy, you're still one of my favorite thoughts. 💗"
  }
];

// The personalized subject wish
function getSubjectWish() {
  const wishes = {
    physics:
      "I hope your physics class goes super well today. May every formula make sense, every problem become easier, and every answer come to you. ⚛️",

    chemistry:
      "I hope your chemistry class is interesting and goes perfectly. May every formula make sense and every experiment turn out beautifully. 🧪",

    math:
      "I hope your math class goes amazingly well. May the formulas be easy, the calculations be correct, and every problem have a solution. 📐"
  };

  return wishes[selectedSubject] ||
    "I hope your physics, chemistry, or math class goes super well today. You can do this, my love. ♡";
}

/* ==========================================
   1. CREATE TWINKLING STARS
========================================== */

for (let i = 0; i < 75; i++) {
  const star = document.createElement("span");

  star.className = "star";
  star.textContent = Math.random() > 0.72 ? "✦" : "·";

  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.fontSize = (7 + Math.random() * 14) + "px";
  star.style.animationDelay = (Math.random() * 4) + "s";
  star.style.animationDuration = (1.5 + Math.random() * 3) + "s";

  starField.appendChild(star);
}

/* ==========================================
   2. FLOATING PETALS
========================================== */

let petalTimer = null;

function createPetal() {
  const petal = document.createElement("span");

  petal.className = "falling-petal";

  const decorations = ["✿", "♡", "✧", "❀", "·"];
  petal.textContent =
    decorations[Math.floor(Math.random() * decorations.length)];

  petal.style.left = Math.random() * 100 + "%";
  petal.style.fontSize = (10 + Math.random() * 15) + "px";
  petal.style.animationDuration = (7 + Math.random() * 7) + "s";
  petal.style.color = ["#fff0f6", "#f6cce2", "#fff1c9"][
    Math.floor(Math.random() * 3)
  ];

  petalsContainer.appendChild(petal);

  setTimeout(() => petal.remove(), 15000);
}

function startPetals() {
  if (petalTimer) return;

  createPetal();
  petalTimer = setInterval(createPetal, 900);
}

function stopPetals() {
  if (petalTimer) {
    clearInterval(petalTimer);
    petalTimer = null;
  }
}

/* ==========================================
   3. SWITCH BETWEEN SCREENS
========================================== */

function showScreen(screen) {
  Object.values(screens).forEach((item) => {
    item.classList.remove("active");
  });

  screen.classList.remove("active");

  // Restart the entrance animation
  void screen.offsetWidth;

  screen.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* ==========================================
   4. TYPE THE MORNING MESSAGE
========================================== */

function typeText(element, text, speed = 48) {
  clearTimeout(typingTimer);

  element.textContent = "";
  element.classList.add("typing");

  let index = 0;

  function writeNextCharacter() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;

      // Slightly pause at punctuation
      const character = text.charAt(index - 1);
      const pause = [".", ",", "!", "?"].includes(character) ? 180 : 0;

      typingTimer = setTimeout(
        writeNextCharacter,
        speed + pause
      );
    } else {
      element.classList.remove("typing");
      toSubjectButton.classList.remove("hidden");
    }
  }

  writeNextCharacter();
}

/* ==========================================
   5. NIGHT TURNS INTO MORNING
========================================== */

wakeButton.addEventListener("click", () => {
  document.body.classList.add("daytime");

  showScreen(screens.morning);

  startPetals();

  toSubjectButton.classList.add("hidden");

  typeText(typedGreeting, morningMessage, 48);
});

/* ==========================================
   6. OPEN THE SUBJECT GAME
========================================== */

toSubjectButton.addEventListener("click", () => {
  showScreen(screens.subject);
});

function displaySubjectResult(subject) {
  selectedSubject = subject;

  subjectResult.classList.remove("hidden");
  subjectPhoto.classList.add("hidden");

  // Clear the previous photo before showing a new result
  subjectPhoto.removeAttribute("src");
  subjectPhoto.onerror = null;

  if (subject === "math") {
    resultEmoji.textContent = "😵😵";
    resultTitle.textContent = "MATH?! NOOO 😭";

    resultMessage.textContent =
      "i guessed wrong again 😭😭😭";
  }

  if (subject === "chemistry") {
    resultEmoji.textContent = "🧪💗";
    resultTitle.textContent = "BABYYYY I KNEW IT!!";

    resultMessage.textContent =
      "i knew it, i guessed it right the first time, good luck with chemistry ♡";

    subjectPhoto.src = "chem.jpg";
    subjectPhoto.alt = "Chemistry";

    subjectPhoto.onload = () => {
      subjectPhoto.classList.remove("hidden");
    };

    subjectPhoto.onerror = () => {
      subjectPhoto.classList.add("hidden");
      console.warn(
        "chem.jpg could not be loaded. Check the image filename."
      );
    };
  }

  if (subject === "physics") {
    resultEmoji.textContent = "⚛️😵";
    resultTitle.textContent = "PHYSICS, REALLY?!";

    resultMessage.textContent =
      "good luck with such a complex subject 😵😵 i guessed wrong again 😭😭😭";

    subjectPhoto.src = "physic.jpg";
    subjectPhoto.alt = "Physics";

    subjectPhoto.onload = () => {
      subjectPhoto.classList.remove("hidden");
    };

    subjectPhoto.onerror = () => {
      subjectPhoto.classList.add("hidden");
      console.warn(
        "physic.jpg could not be loaded. Check the image filename."
      );
    };
  }

  toDiaryButton.classList.remove("hidden");

  setTimeout(() => {
    subjectResult.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 150);
}

document.querySelectorAll(".subject-card").forEach((button) => {
  button.addEventListener("click", () => {
    displaySubjectResult(button.dataset.subject);
  });
});

/* ==========================================
   7. OUR LITTLE SLEEP DIARY
========================================== */

toDiaryButton.addEventListener("click", () => {
  showScreen(screens.diary);
});

/* ==========================================
   8. MORNING SURVIVAL KIT
========================================== */

const gifts = {
  sunshine:
    "Good morning, handsome! I hope you slept really well. You deserve the best rest, you work so hard. Please be gentle with yourself today. ☀️",

  brain:
    "Good luck with your " +
    "physics / chemistry / math".replace(
      "physics / chemistry / math",
      selectedSubject || "physics, chemistry, or math"
    ) +
    " today. I know those formulas have no chance against you. You are the best, the smartest. I wish you good concentration and enough time to complete your plans. 🧠💗",

  message:
    "You're my favorite thought. Thinking of you. Always. You make my heart calm and crazy at the same time. I believe in you. Thank you for those wonderful nights, darling. 💌",

  reminder:
    "Good morning! Just wanted to remind you that you're amazing and I'm so lucky to have you. Drink some water, eat something nice, take a little break when you need one, and remember that I'm cheering for you. 💤"
};

document.querySelectorAll(".gift-card").forEach((card) => {
  card.addEventListener("click", () => {
    const giftName = card.dataset.gift;
    const content = card.querySelector(".gift-content");
    const isOpen = card.classList.contains("open");

    // Close other cards for a tidy interactive layout
    document.querySelectorAll(".gift-card").forEach((otherCard) => {
      otherCard.classList.remove("open");
    });

    if (!isOpen) {
      content.textContent = gifts[giftName];
      card.classList.add("open");
    }
  });
});

toKitButton.addEventListener("click", () => {
  showScreen(screens.kit);
});

/* ==========================================
   9. A LITTLE PLANT FOR YOUR NEW DAY
========================================== */

toPlantButton.addEventListener("click", () => {
  showScreen(screens.plant);
});

// Each click reveals one new wish and grows the flower
plantButton.addEventListener("click", () => {
  if (plantStep >= plantWishes.length) return;

  plantStep++;

  // Reveal the next stage of growth
  plant.classList.remove(
    "stage-0",
    "stage-1",
    "stage-2",
    "stage-3",
    "stage-4"
  );

  const stage = Math.min(plantStep, 4);
  plant.classList.add("stage-" + stage);

  seed.style.opacity = "0";
  seed.style.transform = "translateY(8px) scale(0.5)";

  const wish = plantWishes[plantStep - 1];

  wishNumber.textContent = wish.title;

  wishText.textContent = wish.subjectWish
    ? getSubjectWish()
    : wish.text;

  plantWish.classList.remove("hidden");

  const counters = [
    "A tiny seed is waking up... 🌱",
    "Look! A little sprout! ♡",
    "Growing a little stronger every day 🌿",
    "Almost ready to bloom... 🌸",
    "Our little flower is blooming! 💗"
  ];

  plantCounter.textContent = counters[plantStep - 1];

  // Update the button for the next step
  if (plantStep < plantWishes.length) {
    plantButton.textContent = [
      "GIVE IT A LITTLE SUNSHINE ☀️",
      "HELP IT GROW 🌿",
      "ONE MORE LITTLE WISH ♡",
      "LET IT BLOOM 🌸"
    ][plantStep - 1];
  } else {
    plantButton.classList.add("hidden");

    flowerEnding.classList.remove("hidden");
    restartButton.classList.remove("hidden");

    plantCounter.textContent =
      "Five little wishes, one very special person. ♡";

    // A few extra sparkles when the flower blooms
    for (let i = 0; i < 15; i++) {
      setTimeout(createPetal, i * 150);
    }
  }

  setTimeout(() => {
    plantWish.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }, 200);
});

/* ==========================================
   10. RESTART THE LITTLE MORNING
========================================== */

function resetPlant() {
  plantStep = 0;

  plant.classList.remove(
    "stage-1",
    "stage-2",
    "stage-3",
    "stage-4"
  );

  plant.classList.add("stage-0");

  seed.style.opacity = "1";
  seed.style.transform = "translateY(0) scale(1)";

  plantCounter.textContent = "Your little seed is waiting ♡";

  plantButton.textContent = "PLANT A LITTLE HAPPINESS 🌱";
  plantButton.classList.remove("hidden");

  plantWish.classList.add("hidden");
  flowerEnding.classList.add("hidden");
  restartButton.classList.add("hidden");
}

restartButton.addEventListener("click", () => {
  clearTimeout(typingTimer);

  document.body.classList.remove("daytime");

  stopPetals();
  petalsContainer.innerHTML = "";

  selectedSubject = "";

  // Reset the subject result
  subjectResult.classList.add("hidden");
  subjectPhoto.classList.add("hidden");
  subjectPhoto.removeAttribute("src");

  toDiaryButton.classList.add("hidden");

  // Reset the gift cards
  document.querySelectorAll(".gift-card").forEach((card) => {
    card.classList.remove("open");

    const content = card.querySelector(".gift-content");
    content.textContent = "";
  });

  // Reset the typed message
  typedGreeting.textContent = "";
  typedGreeting.classList.remove("typing");
  toSubjectButton.classList.add("hidden");

  resetPlant();

  starField.style.opacity = "1";

  showScreen(screens.night);
});
