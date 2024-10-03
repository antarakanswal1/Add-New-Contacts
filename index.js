document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".menu-icon");
  const listing = document.querySelector(".listing");
  const contactList = document.querySelector(".contact-list");
  hamburger.addEventListener("click", (e) => {
    if (listing.style.minWidth == "0px") {
      listing.style.minWidth = "500px";
    } else {
      listing.style.width = "0px";
      listing.style.minWidth = "0px";
    }
  });

  updateContactList();

  // creating the UI Component
  function createContactChip(data) {
    const chip = document.createElement("div");
    chip.className = "contact-chip d-flex";

    const avatar = document.createElement("div");
    avatar.className = "avatar avatar-sm contact-chip-avatar";
    avatar.textContent = `${data.name.toString().substring(0, 1)}`;

    const contactChipInfo = document.createElement("div");
    contactChipInfo.className = "contact-chip-info flex-grow-1";
    contactChipInfo.innerHTML = `<b class="d-block">${data.name}</b>
                                 <span>${data.designation}</span>`;

    // Redy
    const chipActions = document.createElement("div");
    chipActions.className =
      "contact-chip-actions d-flex align-items-center justify-content-end";

    const editButton = document.createElement("button");
    editButton.className = "btn btn-sm contact-chip-button me-1";
    editButton.innerHTML = `<i class="bi bi-pencil-fill"></i>`;

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-sm contact-chip-button me-1";
    deleteButton.innerHTML = `<i class="bi bi-trash3-fill"></i>`;
    const viewButton = document.createElement("button");
    viewButton.className = "btn btn-sm contact-chip-button me-1";
    viewButton.innerHTML = `<i class="bi bi-eye-fill"></i>`;

    chipActions.appendChild(editButton);
    chipActions.appendChild(deleteButton);
    chipActions.appendChild(viewButton);

    chip.appendChild(avatar);
    chip.appendChild(contactChipInfo);
    chip.appendChild(chipActions);
    return chip;
  }
  const form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let data = {};
    const formData = new FormData(form);
    data.name = formData.get("contact-name");
    data.email = formData.get("contact-email");
    data.phone = formData.get("contact-phone");
    data.designation = formData.get("contact-designation");
    data.bio = formData.get("bio");
    data.address = formData.get("address");

    const newChip = createContactChip(data);
    contactList.appendChild(newChip);

    updateLocalStorage(data);
    location.reload();
  });

  function updateLocalStorage(data) {
    // const contacts = JSON.parse(localStorage.getItem("contacts"))     ?? [];
    let contacts = JSON.parse(localStorage.getItem("contacts") ?? "[]") ?? [];
    contacts.push(data);
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  function updateContactList() {
    let contacts = JSON.parse(localStorage.getItem("contacts") ?? "[]") ?? [];

    contacts.forEach(function (contact, index) {
      const newChip = createContactChip(contact);
      contactList.appendChild(newChip);
    });

    console.log(contacts);
  }
});
