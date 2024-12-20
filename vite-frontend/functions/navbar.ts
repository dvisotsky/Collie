export function insertNavbar(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    fetch("/components/navbar.html")
      .then((response) => response.text())
      .then((html) => {
        element.innerHTML = html;
      })
      .then(() => {
        highlightActiveLink();
      })
      .catch((error) => {
        console.error("Error loading navbar:", error);
      });
  } else {
    console.error("Element not found:", elementId);
  }
}

export function highlightActiveLink() {
  const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll("a");

  links.forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });
}
