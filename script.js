// toggle icon navbar
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// scroll section
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      // active navbar links
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
      // Active section for animation on scroll
      sec.classList.add("show-animate");
    }
    // if want to use animation that repeats on scroll use this
    else {
      sec.classList.remove("show-animate");
    }
  });

  // sticky header
  let header = document.querySelector("header");

  header.classList.toggle("sticky", window.scrollY > 100);

  // Remove toggle icon and navbar when click navbar links (scroll)
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");

  // animation footer on scroll
  let footer = document.querySelector("footer");

  footer.classList.toggle(
    "show-animate",
    this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight
  );

};

// Get the floating flag element
const floatingFlag = document.querySelector('.floating-flag');

// Initialize a variable to store the previous scroll position
let prevScrollPos = window.pageYOffset;

// Add scroll event listener
window.addEventListener('scroll', () => {
  // Get the current scroll position
  const currentScrollPos = window.pageYOffset;

  // Check the scroll direction (left or right)
  const scrollDirection = currentScrollPos > prevScrollPos ? 'right' : 'left';

  // Update the previous scroll position
  prevScrollPos = currentScrollPos;

  // Add or remove a class to the floating flag element based on the scroll direction
  if (scrollDirection === 'right') {
    floatingFlag.classList.add('move-right');
  } else {
    floatingFlag.classList.remove('move-right');
  }
});


