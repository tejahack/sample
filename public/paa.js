const correctPassword = "Mteja@1437"; 
    const input = document.getElementById("passwordInput");
    const card = document.getElementById("cardContainer");
    const error = document.getElementById("errorMessage");

    function checkPassword() {
      if (input.value === correctPassword) {
        error.textContent = "";
        sessionStorage.setItem("authenticated", "true"); // ✅ Access flag
        card.classList.add("flipped");
        setTimeout(() => {
          window.location.href = "secret.html"; // 🔐 Only accessible with flag
        }, 1200);
      } else {
        error.textContent = "Incorrect password!";
        card.classList.add("shake");
        setTimeout(() => card.classList.remove("shake"), 400);
      }
    }

    function togglePassword() {
      const toggle = event.target;
      if (input.type === "password") {
        input.type = "text";
        toggle.textContent = "Hide";
      } else {
        input.type = "password";
        toggle.textContent = "Show";
      }
    }
