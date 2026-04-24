const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");
const scrollTopBtn = document.querySelector("#scroll-top");

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
};

window.onscroll = () => {
    sections.forEach((sec) => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });

    const header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 100);
    if (scrollTopBtn) {
        scrollTopBtn.classList.toggle("show", window.scrollY > 300);
    }

    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
};

ScrollReveal({
    // reset: true,
    distance: "80px",
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(".home-img, .services-container, .portfolio-box, .contact form, .experience-content, .certificate-box", { origin: "bottom" });
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content, .experience-content", { origin: "right" });

const typed = new Typed(".multiple-text", {
    strings: ["MERN Full Stack Developer", "Software Engineer", "Technical Trainer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

const contactForm = document.querySelector("#contact-form");
const contactSubmitBtn = document.querySelector("#contact-submit-btn");
const contactFormStatus = document.querySelector("#contact-form-status");

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const accessKey = formData.get("access_key");

        if (!accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
            contactFormStatus.textContent = "Please add your Web3Forms access key in index.html before sending messages.";
            contactFormStatus.className = "contact-form-status error";
            return;
        }

        contactSubmitBtn.disabled = true;
        contactSubmitBtn.textContent = "Sending...";
        contactFormStatus.textContent = "";
        contactFormStatus.className = "contact-form-status";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                contactFormStatus.textContent = "Message sent successfully. I will get back to you soon.";
                contactFormStatus.className = "contact-form-status success";
                contactForm.reset();
            } else {
                contactFormStatus.textContent = result.message || "Message could not be sent. Please try again.";
                contactFormStatus.className = "contact-form-status error";
            }
        } catch (error) {
            contactFormStatus.textContent = "Network error. Please check your connection and try again.";
            contactFormStatus.className = "contact-form-status error";
        } finally {
            contactSubmitBtn.disabled = false;
            contactSubmitBtn.textContent = "Send Message";
        }
    });
}