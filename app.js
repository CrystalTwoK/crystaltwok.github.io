const cursor = document.querySelector("#cursor");
const welcomeScreen = document.querySelector("#welcome");
const portfolioScreen = document.querySelector("#screen");
const section = document.querySelector("#section");
const currentSection = document.querySelector("#current-section");
const homeP = document.querySelector("#home-p");
const loadingScreen = document.querySelector("#loading-screen");
const aboutMeText = document.querySelector("#section-about");
const projectsText = document.querySelector("#section-projects");
const mobileKeyboard = document.querySelector("#mobile-keyboard-input");
let text = document.querySelector("#input-text");
let textParent = document.querySelector(".input-render-content");
let username = document.querySelector("#username");
let portfolioUsername = document.querySelector("#portfolio-username");
let list = document.querySelector("ul");
let notSpecial = false;
let specialKeys = [
  "ShiftLeft",
  "ShiftRight",
  "ControlRight",
  "ControlLeft",
  "Tab",
  "CapsLock",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "F10",
  "F11",
  "F12",
  "Insert",
  "Home",
  "Delete",
  "PageUp",
  "PageDown",
  "End",
  "ContextMenu",
  "AltRight",
  "AltLeft",
  "MetaLeft",
  "Enter",
  "ArrowUp",
  "ArrowDown",
  "ArrowRight",
  "ArrowLeft",
];

const help = `
To navigate use the following commands:
01 - 'about' - brings you to the 'About Me' section.
02 - 'projects' - brings you to the 'Projects' section.
03 - 'contact' - brings you to the Contact form.
04 - 'home' - brings you back to the Home

Utility Commands:
u01 - 'help' - shows the all the commands available.
u02 - 'clear' - clears the home terminal from any command executed.
u03 - 'logout' - goes back to the start.
`;

const typeHelp = `
Type 'help' to see the list of commands.
Otherwise use your cursor to navigate trough the menu sections.`;

//welcome and portoflio screen
let onWelcome = true;
welcomeScreen.classList.remove("inactive");
portfolioScreen.classList.add("inactive");

//keyboard sounds
let audio = {
  a: new Audio("./sounds/01.wav"),
  b: new Audio("./sounds/02.wav"),
  c: new Audio("./sounds/03.wav"),
  d: new Audio("./sounds/04.wav"),
  e: new Audio("./sounds/05.wav"),
  f: new Audio("./sounds/06.wav"),
  g: new Audio("./sounds/charenter_01.wav"),
  h: new Audio("./sounds/charenter_02.wav"),
  l: new Audio("./sounds/charenter_03.wav"),
};

//menu focus position
let onHome = false;
let onAbout = false;
let onProjects = false;
let onContact = false;
let onCV = false;

function pageLoaded() {
  loadingScreen.classList.add("inactive");
}

function pageLoadChecker() {
  const interval = window.setInterval(() => {
    if (document.querySelector("body")[0] == undefined) {
      window.clearInterval(interval);
      pageLoaded();
    }
  }, 2000);
}

pageLoadChecker();

function keyPressed(event) {
  if (event.code == "Enter") {
    audio.g.play();
    audio.g.volume = 0.2;
    if (onWelcome == true) {
      onWelcome = false;
      username.innerText += ` ${text.innerText.toUpperCase()}`;
      portfolioUsername.innerText += ` ${text.innerText.toUpperCase()}`;
      setTimeout(() => {
        welcomeScreen.classList.add("inactive");
        portfolioScreen.classList.remove("inactive");
        audio.g.play();
        audio.g.volume = 0.2;
      }, 400);
    }

    //commands
    if (text.innerText.toLowerCase() == "logout") {
      onWelcome = true;
      setTimeout(() => {
        welcomeScreen.classList.remove("inactive");
        portfolioScreen.classList.add("inactive");
        username.innerText = `INSERT YOUR USERNAME:`;
        portfolioUsername.innerText = `USERNAME:`;
        homeP.innerText = typeHelp;
        audio.g.play();
        audio.g.volume = 0.2;
      }, 400);
    } else if (text.innerText.toLowerCase() == "help") {
      setTimeout(() => {
        homeP.innerText = help;
      }, 400);
    } else if (text.innerText.toLowerCase() == "clear") {
      setTimeout(() => {
        homeP.innerText = typeHelp;
      }, 400);
    } else if (text.innerText.toLowerCase() == "home") {
      openHome();
    } else if (text.innerText.toLowerCase() == "about") {
      openAboutMe();
    } else if (text.innerText.toLowerCase() == "projects") {
      openProjects();
    }
    // end of commands

    //Menu click with Enter
    switch (true) {
      case onHome:
        openHome();
        break;
      case onAbout:
        openAboutMe();
        break;
      case onProjects:
        openProjects();
        break;
      case onContact:
        break;
      case onCV:
        break;
    }

    //default behavior
    let str = text.innerText;
    if (str.length > 0) {
      for (let i = 0; i < str.length; i++) {
        text.innerText = str.substring(0, 0);
      }
    }
    //DELETE CHARS
  } else if (event.code == "Backspace") {
    audio.g.play();
    audio.g.volume = 0.2;
    let str = text.innerText;
    if (str.length > 0) {
      text.innerText = str.substring(0, str.length - 1);
    }
    //MENU ARROW NAVIGATION
  } else if (event.code == "ArrowUp") {
    if (!onAbout && !onProjects && !onContact && !onCV && !onHome) {
      console.log(event.code);
      onCV = true;
      cv.classList.add("onFocus");
      audio.a.play();
      audio.a.volume = 0.2;
    } else if (onCV == true) {
      onCV = false;
      cv.classList.remove("onFocus");
      onContact = true;
      contact.classList.add("onFocus");
      audio.e.play();
      audio.e.volume = 0.2;
    } else if (onContact == true) {
      onContact = false;
      contact.classList.remove("onFocus");
      onProjects = true;
      projects.classList.add("onFocus");
      audio.a.play();
      audio.a.volume = 0.2;
    } else if (onProjects == true) {
      onProjects = false;
      projects.classList.remove("onFocus");
      onAbout = true;
      about.classList.add("onFocus");
      audio.e.play();
      audio.e.volume = 0.2;
    } else if (onAbout == true && home.classList != "inactive") {
      onAbout = false;
      about.classList.remove("onFocus");
      onHome = true;
      home.classList.add("onFocus");
      audio.a.play();
      audio.a.volume = 0.2;
    }
  } else if (event.code == "ArrowDown") {
    if (
      !onAbout &&
      !onProjects &&
      !onContact &&
      !onCV &&
      !onHome &&
      home.classList != "inactive"
    ) {
      console.log(event.code);
      onHome = true;
      home.classList.add("onFocus");
      audio.a.play();
      audio.a.volume = 0.2;
    } else if (
      onHome == true ||
      (!onAbout && !onProjects && !onContact && !onCV && !onHome)
    ) {
      onHome = false;
      home.classList.remove("onFocus");
      onAbout = true;
      about.classList.add("onFocus");
      audio.e.play();
      audio.e.volume = 0.2;
    } else if (onAbout == true) {
      onAbout = false;
      about.classList.remove("onFocus");
      onProjects = true;
      projects.classList.add("onFocus");
      audio.a.play();
      audio.a.volume = 0.2;
    } else if (onProjects == true) {
      onProjects = false;
      projects.classList.remove("onFocus");
      onContact = true;
      contact.classList.add("onFocus");
      audio.e.play();
      audio.e.volume = 0.2;
    } else if (onContact == true) {
      onContact = false;
      contact.classList.remove("onFocus");
      onCV = true;
      cv.classList.add("onFocus");
      audio.a.play();
      audio.a.volume = 0.2;
    }
    //MENU ARROW NAVIGATION END
  } else {
    let specialChar = false;
    for (let key of specialKeys) {
      if (event.code == key) {
        specialChar = true;
      }
      text.innerText.replace(key, "");
    }
    if (!specialChar) {
      text.innerText += event.key;
      console.log(event.code);
      home.classList.remove("onFocus");
      onHome = false;
      about.classList.remove("onFocus");
      onAbout = false;
      projects.classList.remove("onFocus");
      onProjects = false;
      contact.classList.remove("onFocus");
      onContact = false;
      cv.classList.remove("onFocus");
      onCV = false;
      randomKeySound();
    }
  }
}

function mobileKeyPresed(event) {
  console.log(event);
}
function mobileTextReset() {
  mobileKeyboard.value = "";
  text.innerText = mobileKeyboard.value;
}
//all enter key functions
function formSubmission() {
  mobileKeyboard.blur();
  audio.g.play();
  audio.g.volume = 0.2;
  if (onWelcome == true) {
    onWelcome = false;
    username.innerText += ` ${text.innerText.toUpperCase()}`;
    portfolioUsername.innerText += ` ${text.innerText.toUpperCase()}`;
    setTimeout(() => {
      welcomeScreen.classList.add("inactive");
      portfolioScreen.classList.remove("inactive");
      audio.g.play();
      audio.g.volume = 0.2;
    }, 400);
  }
  mobileTextReset();
  return false; //do not submit the form
}

function randomKeySound() {
  let randomSound = Math.floor(Math.random() * 6);
  switch (randomSound) {
    case 1:
      audio.a.play();
      audio.a.volume = 0.2;
      break;
    case 2:
      audio.b.play();
      audio.b.volume = 0.2;
      break;
    case 3:
      audio.c.play();
      audio.c.volume = 0.2;
      break;
    case 4:
      audio.d.play();
      audio.d.volume = 0.2;
      break;
    case 5:
      audio.e.play();
      audio.e.volume = 0.2;
      break;
    case 6:
      audio.f.play();
      audio.f.volume = 0.2;
      break;
  }
}

function openHome() {
  onHome = false;
  setTimeout(() => {
    aboutMeText.classList.add("inactive");
    projectsText.classList.add("inactive");
    home.classList.add("inactive");
    homeP.classList.remove("inactive");
    currentSection.innerText = "HOME";
    audio.g.play();
    audio.g.volume = 0.2;
  }, 400);
}

function openAboutMe() {
  if (currentSection.innerText != "ABOUT ME") {
    setTimeout(() => {
      aboutMeText.classList.remove("inactive");
      projectsText.classList.add("inactive");
      home.classList.remove("inactive");
      homeP.classList.add("inactive");
      currentSection.innerText = "ABOUT ME";
      audio.g.play();
      audio.g.volume = 0.2;
      homeP.innerText = typeHelp;
    }, 400);
  }
}

function openProjects() {
  if (currentSection.innerText != "PROJECTS") {
    setTimeout(() => {
      const aboutMeText = document.querySelector("#section-about");
      const projectsText = document.querySelector("#section-projects");
      aboutMeText.classList.add("inactive");
      projectsText.classList.remove("inactive");
      home.classList.remove("inactive");
      homeP.classList.add("inactive");
      homeP.innerText = typeHelp;
      currentSection.innerText = "PROJECTS";

      audio.g.play();
      audio.g.volume = 0.2;
    }, 400);
  }
}

window.addEventListener("keydown", (e) => {
  if (onMobile == false) {
    keyPressed(e);
  } else if (onMobile == true) {
    mobileKeyPresed(e);
  }
});

window.addEventListener("input", (e) => {
  randomKeySound();
  text.innerText = mobileKeyboard.value;
});

const home = document.querySelector("#home");
const about = document.querySelector("#about");
const projects = document.querySelector("#projects");
const contact = document.querySelector("#contact");
const cv = document.querySelector("#cv");
//===========================================================
//HOME SECTION EVENTS
home.addEventListener("mouseenter", () => {
  audio.l.play();
  audio.l.volume = 0.2;
});
home.addEventListener("click", () => {
  openHome();
  audio.e.play();
  audio.e.volume = 0.2;
});
//===========================================================
//===========================================================
//ABOUT ME SECTION EVENTS
about.addEventListener("mouseenter", () => {
  audio.l.play();
  audio.l.volume = 0.2;
});

about.addEventListener("click", () => {
  openAboutMe();
  audio.e.play();
  audio.e.volume = 0.2;
});
//===========================================================
//===========================================================
//PROJECTS SECTION EVENTS
projects.addEventListener("click", () => {
  openProjects();
  audio.e.play();
  audio.e.volume = 0.2;
});

projects.addEventListener("mouseenter", () => {
  audio.l.play();
  audio.l.volume = 0.2;
});
//===========================================================
//===========================================================
//CONTACT SECTION EVENTS
contact.addEventListener("mouseenter", () => {
  audio.l.play();
  audio.l.volume = 0.2;
});
//===========================================================
//===========================================================
//DOWNLOAD CV SECTION EVENTS
cv.addEventListener("mouseenter", () => {
  audio.l.play();
  audio.l.volume = 0.2;
});
//===========================================================
//Cursor active or inactive based on focus or blur events
window.addEventListener("focus", () => {
  cursor.classList.remove("inactive");
});
window.addEventListener("blur", () => {
  cursor.classList.add("inactive");
});
window.addEventListener("click", () => {
  home.classList.remove("onFocus");
  about.classList.remove("onFocus");
  projects.classList.remove("onFocus");
  contact.classList.remove("onFocus");
  cv.classList.remove("onFocus");
});

let onMobile = false;
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  onMobile = true;
} else {
  onMobile = false;
}

textParent.addEventListener("click", () => {
  if (onMobile == true) {
    mobileKeyboard.focus();
  }
});
