/*-----------------tabs----------------- */

var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(evt, tabname) {
  // declare loop variables to avoid leaking globals
  for (let tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (let tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  for (let tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  evt.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

/*-----------------sidemenu----------------- */

var sidemenu = document.getElementById("sidemenu");

function openmenu() {
  sidemenu.style.right = "0";
}

function closemenu() {
  sidemenu.style.right = "-200px";
}

// contact form confirmation message

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const confirmation = document.getElementById("confirmation-message");

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwnXTXLzVCW9nkLmwJ40zy0XT2PTnVFWJQGqEtkIwrOXbHpH1EB4_H5tgf3OYenS0w/exec"; // e.g. API endpoint

  if (form && confirmation) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      fetch(scriptURL, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          confirmation.textContent =
            "Thank you! Your message has been received.";
          confirmation.style.display = "block";

          form.reset();

          setTimeout(() => {
            confirmation.style.display = "none";
          }, 5000);
        })
        .catch((error) => {
          confirmation.textContent =
            "Sorry, something went wrong. Please try again.";
          confirmation.style.display = "block";

          console.error("Form submission error:", error);
        });
    });
  }
});

// Show button when user scrolls down
window.onscroll = function () {
  const btn = document.getElementById("topBtn");
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    btn.style.display = "flex";
  } else {
    btn.style.display = "none";
  }
};

// Scroll to top smoothly
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Loader
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  loader.style.opacity = "0";
  loader.style.transition = "0.5s";

  setTimeout(() => {
    loader.style.display = "none";
  }, 500);
});
