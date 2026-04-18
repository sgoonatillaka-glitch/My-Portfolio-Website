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

/*----------contact form confirmation message-------------*/

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const confirmation = document.getElementById("confirmation-message");

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwhrQa8FBtsEEzbZVgZp26cK9ZuEGctOR30vWTgWeYoezV2gtO1hZtp0UAOqvsKAQ/exec";

  if (form && confirmation) {
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      confirmation.textContent = "Sending...";
      confirmation.style.display = "block";
      if (submitButton) {
        submitButton.disabled = true;
      }

      try {
        const params = new URLSearchParams();
        formData.forEach((value, key) => {
          params.append(key, value);
        });

        const response = await fetch(scriptURL, {
          method: "POST",
          body: params,
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        confirmation.textContent = "Thank you! Your message has been received.";
        form.reset();

        setTimeout(() => {
          confirmation.style.display = "none";
        }, 5000);
      } catch (error) {
        confirmation.textContent =
          "Sorry, something went wrong. Please try again.";
        console.error("Form submission error:", error);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
        }
      }
    });
  }
});

/*----------Show button when user scrolls down-------------*/
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

/*----------Loader-------------*/

window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  loader.style.opacity = "0";
  loader.style.transition = "0.5s";

  setTimeout(() => {
    loader.style.display = "none";
  }, 500);
});

/*----------Privacy Policy and Terms and Conditions-------------*/

function openModal(id) {
  document.getElementById("modal-" + id).classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal(id) {
  document.getElementById("modal-" + id).classList.remove("open");
  document.body.style.overflow = "";
}
function declineTerms() {
  closeModal("terms");
  setTimeout(function () {
    alert(
      "We respect your choice. However, access to this website requires acceptance of our Terms and Conditions. Please accept to continue or close this page.",
    );
  }, 100);
}
document.querySelectorAll(".modal-overlay").forEach((el) => {
  el.addEventListener("click", (e) => {
    if (e.target === el) closeModal(el.id.replace("modal-", ""));
  });
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape")
    document
      .querySelectorAll(".modal-overlay.open")
      .forEach((el) => closeModal(el.id.replace("modal-", "")));
});

/*----------Sticky nav pinning to bottom when reaching footer-------------*/

const nav = document.querySelector("nav");
const stopEl = document.getElementById("footer");
const navLinks = document.querySelectorAll("#sidemenu a");

/*----------Active nav link: permanent for separate pages, scroll-based for index.html-------------*/
(function initActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  function setActive(link) {
    navLinks.forEach((a) => a.classList.remove("active"));
    if (link) link.classList.add("active");
  }

  // Separate pages (blog.html, projects.html, …) — match by filename, stay permanent
  if (currentPage !== "index.html") {
    navLinks.forEach((link) => {
      if (link.getAttribute("href").split("#")[0] === currentPage) {
        link.classList.add("active");
      }
    });
    return;
  }

  // index.html — default to "Home" until a section scrolls into view
  const homeLink = document.querySelector('#sidemenu a[href="index.html"]');
  setActive(homeLink);

  // Keep a live set of sections currently intersecting the viewport
  const intersecting = new Set();
  const sectionIds = ["header", "about", "projects", "contact"]; // DOM order matters

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          intersecting.add(e.target.id);
        } else {
          intersecting.delete(e.target.id);
        }
      });

      if (intersecting.size === 0) {
        // Back at the top — highlight Home
        setActive(homeLink);
      } else {
        // Highlight the topmost visible section (first in DOM order)
        const activeId = sectionIds.find((id) => intersecting.has(id));
        if (activeId) {
          // href*= matches both "index.html#about" and "projects.html" (contains "projects")
          const link = document.querySelector(
            `#sidemenu a[href*="${activeId}"]`,
          );
          setActive(link);
        }
      }
    },
    { threshold: 0.3 },
  );

  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });
})();

/*----------Pinned-bottom nav when footer enters view-------------*/
if (stopEl) {
  const stopObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        const stopTop = stopEl.offsetTop - nav.offsetHeight;
        nav.style.top = stopTop + "px";
        nav.classList.add("pinned-bottom"); // switches to position: absolute
      } else {
        nav.style.top = "";
        nav.classList.remove("pinned-bottom"); // back to sticky
      }
    },
    {
      rootMargin: `-${nav.offsetHeight}px 0px 0px 0px`,
      threshold: 0,
    },
  );

  stopObserver.observe(stopEl);
}
