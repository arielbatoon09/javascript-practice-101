const data = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
  { id: 3, name: "Mike Johnson", email: "mike.johnson@example.com" },
  { id: 4, name: "Emily Davis", email: "emily.davis@example.com" },
  { id: 5, name: "Alex Wilson", email: "alex.wilson@example.com" },
  { id: 6, name: "Ariel Batoon", email: "info.arielbatoon.com" },
];

const searchInput = document.getElementById('searchInput');
const autocomplete = document.getElementById('autocomplete');
const suggestions = document.getElementById('suggestions');
const tableBody = document.getElementById('tableBody');
const modalBackdrop = document.getElementById('modalBackdrop');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const modalCloseButton = document.getElementById('modalCloseButton');

const mergeFunctions = {
  init() {
    this.addEventListeners();
    this.showTableData(data);
  },

  addEventListeners() {
    searchInput.addEventListener('input', this.handleInput.bind(this));
    modalCloseButton.addEventListener('click', this.closeModal.bind(this));
    modalBackdrop.addEventListener('click', this.closeModal.bind(this));
  },

  handleInput(event) {
    const inputText = event.target.value.toLowerCase();
    if (inputText === '') {
      this.hideAutocomplete();
      this.showTableData(data);
    } else {
      const matchingItems = data.filter(
        item =>
          item.name.toLowerCase().includes(inputText) ||
          item.email.toLowerCase().includes(inputText)
      );
      this.showAutocomplete(matchingItems);
      this.showTableData(matchingItems);
    }
  },

  showAutocomplete(matchingItems) {
    suggestions.innerHTML = '';
    if (matchingItems.length > 0) {
      matchingItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name}`;
        li.classList.add('px-4', 'py-2', 'cursor-pointer', 'hover:bg-gray-100');
        li.addEventListener('click', () => {
          searchInput.value = item.name;
          this.hideAutocomplete();
          this.showTableData([item]);
        });
        suggestions.appendChild(li);
      });
      autocomplete.classList.remove('hidden');
    } else {
      this.hideAutocomplete();
    }
  },

  hideAutocomplete() {
    autocomplete.classList.add('hidden');
  },

  showTableData(data) {
    tableBody.innerHTML = '';
    if (data.length > 0) {
      data.forEach(item => {
        const tr = document.createElement('tr');
        const tdId = document.createElement('td');
        tdId.classList.add('py-2', 'px-4', 'border-b');
        tdId.textContent = item.id;
        const tdName = document.createElement('td');
        tdName.classList.add('py-2', 'px-4', 'border-b');
        tdName.textContent = item.name;
        const tdEmail = document.createElement('td');
        tdEmail.classList.add('py-2', 'px-4', 'border-b');
        tdEmail.textContent = item.email;
        const tdAction = document.createElement('td');
        tdAction.classList.add('py-2', 'px-4', 'border-b');

        const viewButton = document.createElement('button');
        viewButton.textContent = 'View';
        viewButton.classList.add('px-4', 'py-2', 'bg-blue-500', 'text-white', 'rounded', 'hover:bg-blue-600');
        viewButton.addEventListener('click', () => {
          this.openModal(item);
        });

        tdAction.appendChild(viewButton);

        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdEmail);
        tr.appendChild(tdAction);
        tableBody.appendChild(tr);
      });
    } else {
      const tr = document.createElement('tr');
      const tdNotFound = document.createElement('td');
      tdNotFound.setAttribute('colspan', '4');
      tdNotFound.classList.add('py-2', 'px-4', 'text-center', 'text-red-500');
      tdNotFound.textContent = 'Not found';
      tr.appendChild(tdNotFound);
      tableBody.appendChild(tr);
    }

  },

  openModal(item) {
    modalTitle.textContent = item.name;
    modalContent.textContent = `ID: ${item.id}\nEmail: ${item.email}`;
    modalBackdrop.classList.remove('hidden');
    modal.classList.remove('hidden');
  },

  closeModal() {
    modalBackdrop.classList.add('hidden');
    modal.classList.add('hidden');
  }
};

mergeFunctions.init();