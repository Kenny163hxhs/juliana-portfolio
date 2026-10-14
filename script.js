
document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // AUTOMATIC FOOTER YEAR
    // ========================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // ========================================
    // PROFILE PHOTO FALLBACK
    // ========================================

    const profilePhoto = document.getElementById("profilePhoto");
    const avatarPlaceholder = document.getElementById("avatarPlaceholder");

    function showAvatarFallback() {
        if (profilePhoto) {
            profilePhoto.hidden = true;
        }

        if (avatarPlaceholder) {
            avatarPlaceholder.hidden = false;
        }
    }

    if (profilePhoto) {
        profilePhoto.addEventListener("error", showAvatarFallback);

        if (profilePhoto.complete && profilePhoto.naturalWidth === 0) {
            showAvatarFallback();
        }
    }


    // ========================================
    // MOBILE NAVIGATION
    // ========================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        function closeMenu() {
            navLinks.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.textContent = "☰";
        }

        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            menuToggle.textContent = isOpen ? "×" : "☰";
        });

        // Close menu after clicking a navigation link
        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        // Close mobile menu using Escape
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Close mobile menu when returning to desktop width
        window.addEventListener("resize", function () {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }


    
    // ========================================
    // BACK TO TOP
    // SHOW AFTER HOME SECTION
    // ========================================

    const backTop = document.querySelector("a.back-top");
    const homeSection = document.querySelector("#home");

    if (backTop && homeSection) {

        function toggleBackTop() {
            const homeBottom = homeSection.getBoundingClientRect().bottom;

            if (homeBottom <= 0) {
                backTop.classList.add("show");
            } else {
                backTop.classList.remove("show");
            }
        }

        window.addEventListener("scroll", toggleBackTop, {
            passive: true
        });

        toggleBackTop();

        backTop.addEventListener("click", function (event) {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

});
