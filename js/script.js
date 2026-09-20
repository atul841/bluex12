document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu-toggle"),
    nav = document.querySelector(".nav-links");
  if (menu && nav) {
    menu.addEventListener("click", () => {
      nav.classList.toggle("open");
      menu.innerHTML = nav.classList.contains("open")
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });
    nav
      .querySelectorAll("a")
      .forEach((a) =>
        a.addEventListener("click", () => nav.classList.remove("open")),
      );
  }
  const header = document.querySelector(".header"),
    top = document.querySelector(".back-top");
  window.addEventListener("scroll", () => {
    if (header) header.classList.toggle("scrolled", scrollY > 20);
    if (top) top.classList.toggle("show", scrollY > 500);
  });
  if (top)
    top.addEventListener("click", () =>
      scrollTo({ top: 0, behavior: "smooth" }),
    );
  const observer = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      }),
    { threshold: 0.12 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  document.querySelectorAll(".counter").forEach((el) => {
    const obs = new IntersectionObserver(
      (es) => {
        if (!es[0].isIntersecting) return;
        const target = +el.dataset.target;
        let n = 0;
        const step = Math.max(1, Math.ceil(target / 45));
        const tick = () => {
          n = Math.min(n + step, target);
          el.textContent = n;
          if (n < target) requestAnimationFrame(tick);
          else if (target === 98) el.textContent = "98%";
          else el.textContent = n + "+";
        };
        tick();
        obs.disconnect();
      },
      { threshold: 0.7 },
    );
    obs.observe(el);
  });
  const tf = document.getElementById("trackingForm");
  if (tf)
    tf.addEventListener("submit", (e) => {
      e.preventDefault();
      const no = document.getElementById("trackingNumber").value.trim();
      const box = document.getElementById("trackResult");
      box.innerHTML = `<div class="result-card"><div class="result-status"><div><b>${no}</b><div style="font-size:10px;color:#71859b;margin-top:3px">Estimated delivery: 22 Sep 2026</div></div><span class="status-pill">IN TRANSIT</span></div><div class="timeline"><div class="done">Shipment booked</div><div class="done">Picked up</div><div class="done">In transit</div><div>Out for delivery</div></div></div>`;
    });
  const qf = document.getElementById("quoteForm");
  if (qf)
    qf.addEventListener("submit", (e) => {
      e.preventDefault();
      const m = document.getElementById("formMessage");
      m.className = "form-success";
      m.textContent =
        "Thank you. Your enquiry has been submitted successfully. Our team will contact you shortly.";
      qf.reset();
    });
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});
