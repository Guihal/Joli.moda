async function elementReady(selector, parent = false) {
  return new Promise((resolve) => {
    let block = document.querySelector(selector);

    if (block) {
      resolve(block);
      return;
    }

    const observer = new MutationObserver((mutations, obs) => {
      block = parent
        ? parent.querySelector(selector)
        : document.querySelector(selector);

      if (block) {
        resolve(block);
        obs.disconnect();
      }
    });

    observer.observe(parent ? parent : document.documentElement, {
      childList: true,
      subtree: true,
    });
  });
}

function sendPurposeOnSubmitForm() {
  document.querySelectorAll(".wpcf7").forEach((form) => {
    form.addEventListener("wpcf7submit", sendPurpose);
  });
}

function sendPurposeOnCartSucceed() {
  document.addEventListener("click", (ev) => {
    const parent = ev.target.closest("#place_order");
    if (!parent) return;
    const invalidInput = document.querySelector(".woocommerce-invalid");

    if (invalidInput) return;

    sendPurpose();
  });
}

function sendPurpose() {
  console.log("Purpouse is sended");
  ym(99657632, "reachGoal", "zapros_opt");
}

function init() {
  sendPurposeOnSubmitForm();
  sendPurposeOnCartSucceed();
}

async function openPopupOnAddToCart() {
  const body = await elementReady("body");

  if (body.classList.contains("logged-in")) return;

  const openPopupButton = await elementReady('[href="#zvonok"]');
  const button = await elementReady(".single_add_to_cart_button");

  button.addEventListener("click", () => {
    openPopupButton.click();
  });
}

openPopupOnAddToCart();

document.addEventListener("DOMContentLoaded", init);
