const openModal = (modal) => {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscKey);
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
};

const closeModal = (modal) => {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscKey);
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
};

const closeModalOnRemoteClick = (evt) => {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.target);
  }
};

const handleEscKey = (evt) => {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    closeModal(activeModal);
  }
};

export { openModal, closeModal };
