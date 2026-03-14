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
    "https://script.google.com/macros/s/AKfycbyZxfVHXquf8iAQUmZepJVB6A0deiZ-nLiCQf-KuhCnAYmAU-tFBau-mIZDdSeD-is/exec"; // e.g. API endpoint

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
