(function () {
  const entryForm = document.querySelector('#entry-form');
  const entriesList = document.querySelector('.entries-list');
  const entryTitle = document.querySelector('.entry-title');
  const entryTextBox = document.querySelector('.entry-textbox');

  const lastChangedSpan = document.querySelector('.date-updated');

  var entries = [];
  readData();
  updateEntries();



  function onEntrySubmit(event) {
    event.preventDefault();
    addNewEntry(entryTitle.value, entryTextBox.value);
    updateEntries();
    clearInputFields();

    console.log(entries)
  }

  function addNewEntry(title, description) {
    let entry = {
      entryTitle: title,
      entryDescription: description,
      entryDate: getCurrentDateTime(),
    };

    entries.push(entry);
    saveData();
  }

  function updateEntries() {
    entriesList.innerHTML = '';
    entries.forEach(function (entry, index) {
      const displayEntryBtn = document.createElement('button');
      displayEntryBtn.className = 'display-entry-button';
      displayEntryBtn.innerText = entry.entryDate;
      entriesList.appendChild(displayEntryBtn);

      const deleteEntryBtn = document.createElement('button');
      deleteEntryBtn.className = 'delete-entry-button';
      deleteEntryBtn.innerText = 'delete';
      entriesList.appendChild(deleteEntryBtn);

      const singleEntryTitleEl = document.createElement('h3');
      singleEntryTitleEl.className = 'single-entry title';
      singleEntryTitleEl.innerText = entry.entryTitle
      singleEntryTitleEl.style.display = 'none';
      entriesList.appendChild(singleEntryTitleEl);

      const singleEntryTextEl = document.createElement('div');
      singleEntryTextEl.className = 'single-entry clear';
      singleEntryTextEl.innerText = entry.entryDescription
      singleEntryTextEl.style.display = 'none';
      entriesList.appendChild(singleEntryTextEl);


      displayEntryBtn.addEventListener('click', function () {
        const allEntries = document.querySelectorAll('.single-entry');
        allEntries.forEach((element) => {
          element.style.display = 'none'
        });

        singleEntryTitleEl.style.display = 'block';
        singleEntryTextEl.style.display = 'block';
      });
      deleteEntryBtn.addEventListener('click', function() {
        deleteAtIndex(index);

      }); 
    });

    getLastChangedDate();
  }

  function readData() {
    let parsedEntries = JSON.parse(localStorage.getItem('entries'));
    if(parsedEntries) {
      entries = parsedEntries;
    }

    getLastChangedDate();
  }

  function saveData() {
    localStorage.setItem('entries', JSON.stringify(entries));
    localStorage.setItem('lastChangedDate', JSON.stringify(getCurrentDateTime()) 
    );
  }


  function deleteAtIndex(index) {
    console.log('want delete ?' + index);
    entries.splice(index, 1);
    saveData();
    updateEntries();
  }

  function getLastChangedDate() {
    let parsedDate = JSON.parse(localStorage.getItem('lastChangedDate'));


    if(parsedDate) {
      lastChangedSpan.textContent = 'last updated ' + parsedDate;
      console.log(parsedDate);

    } else {
      lastChangedSpan.textContent = '';
    }
  }

  function clearInputFields() {
    entryTitle.value = '';
    entryTextBox.value = '';


  }


  function getCurrentDateTime() {
    let nowDate = new Date();
    nowDate.toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
    });
    return nowDate.toLocaleString();
  }

  entryForm.addEventListener('submit', onEntrySubmit)
})();