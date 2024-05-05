// submit button
const $generateBtn = document.querySelector(".generate-btn");
$generateBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // check password length
  const $pwLength = document.getElementById("length");
  const pwLength = $pwLength.value;
  if (pwLength < 5) {
    modalOpen(`Password length must be at least 5 characters`);
  } else if (pwLength > 70) {
    modalOpen(`Password length must be less than 70 characters`);
  } else if (pwLength === "") {
    modalOpen(`Please enter password length`);
  } else if (isNaN(Number(pwLength))) {
    modalOpen(`Please enter a number`);
  } else {
    // check password type
    //.check-box input[type='checkbox']에서 선택된 요소를 모두 가져온다.
    const $checkedType = document.querySelectorAll(
      ".check-box input[type='checkbox']:checked"
    );
    if ($checkedType.length === 0) {
      modalOpen(`Please select at least one character type`);
    } else {
      const genereatedPW = generatePassword(pwLength, $checkedType);
      printResult(genereatedPW);
    }
  }
});

function generatePassword(length, $checkedType) {
  const characters = {
    number: "0123456789",
    "lower-letter": "abcdefghijklmnopqrstuvwxyz",
    "capital-letter": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    symbols: "@!#$&%",
  };
  let chars = "";
  $checkedType.forEach((type) => {
    chars += characters[type.id];
  });
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
}

// print result
const $result = document.getElementById("result");
const $resultHide = document.getElementById("result-hide");
function printResult(password) {
  $result.textContent = "";
  $resultHide.textContent = password;
  for (let i = 0; i < password.length; i++) {
    setTimeout(() => {
      $result.textContent += password[i];
    }, 250 * i);
  }
}

// copy
const $copyBtn = document.querySelector(".copy-btn");
$copyBtn.addEventListener("click", () => {
  if ($resultHide.textContent) {
    navigator.clipboard.writeText($resultHide.textContent);
    modalOpen(`Password copied to clipboard`);
  }
});

// modal
const $app = document.getElementById("app");
const $modal = document.querySelector(".modal-cont");
const $modalCloseBtn = document.querySelector(".modal-close-btn");
const $modalText = document.querySelector(".modal-txt");
function modalOpen(message) {
  $app.style.pointerEvents = "none";
  $modal.style.pointerEvents = "auto";
  $modal.classList.add("open");
  $modalText.textContent = message;
}
$modalCloseBtn.addEventListener("click", () => {
  if ($modal.classList.contains("open")) {
    $modal.classList.remove("open");
    $app.style.pointerEvents = "auto";
  }
});
