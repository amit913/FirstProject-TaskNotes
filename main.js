function save(event) {
  event.preventDefault()
  const taskContentBox = document.querySelector("#taskContent");
  const taskContent = taskContentBox.value;
  const taskDateBox = document.querySelector("#taskDate");
  const taskDate = taskDateBox.value;
  const taskTimeBox = document.querySelector("#taskTime");
  const taskTime = taskTimeBox.value;

  const currentTasks = localStorage.getItem("amitProjectTasks");

  let uniqeID = 1;

  let arr = [];

  if (currentTasks) {
    arr = JSON.parse(currentTasks);

    for (const [i, value] of arr.entries()) {
      if (i === arr.length - 1) {
        uniqeID = value.uniqeID + 1;
      }
    }
  }

  const task = {
    content: taskContent,
    date: taskDate,
    time: taskTime,
    uniqeID: uniqeID,
  };

  arr.push(task);

  localStorage.setItem("amitProjectTasks", JSON.stringify(arr));

  clearInputValues();

  loadtasks("fadeIn");
}

function loadtasks(fadein) {
  const currentTasks = localStorage.getItem("amitProjectTasks");
  if (currentTasks) {
    let allNotes = ``;

    const arr = JSON.parse(currentTasks);

    for ([i,item] of arr.reverse().entries()) {
      let fixDate = changeDateFormat(item.date);

      let fadeInLast
      if(i===  0 && fadein) {
        fadeInLast = "fadeIn"
      }else {fadeInLast = ""}

      allNotes += `
       
        <div id="${item.uniqeID}" class="stickyNote ${fadeInLast}" >
       
          <p class="content">${item.content}</p>
          <span>${fixDate}</span> <br />
          <span>${item.time}</span> <br />
          <a href="#"  id="clear"><span class="glyphicon glyphicon-remove"></span>  </a>  
        </div>`;
    }

    const containerDiv = document.querySelector("#containerDiv");
    containerDiv.innerHTML = allNotes;
  }
}

function deleteNote(e) {
  if (e.target.parentElement.parentElement.classList.contains("stickyNote")) {
    let removeTarget = e.target.parentElement.parentElement;
    removeTarget.style.opacity = "0";
    setTimeout(() => removeTarget.remove(), 1000);
  }

  removeFromLS(e.target.parentElement.parentNode.id);
  e.preventDefault();
}

function removeFromLS(noteID) {
  let notes;
  if (localStorage.getItem("amitProjectTasks") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("amitProjectTasks"));
  }

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].uniqeID === +noteID) {
      notes.splice(i, 1);
    }
  }

  localStorage.setItem("amitProjectTasks", JSON.stringify(notes));
}

function onWindowLoad() {
  loadtasks("");

  const saveBtn = document.querySelector("form");
  saveBtn.onsubmit = save;

  const resetBtn = document.querySelector("#resetBtn");
  resetBtn.onclick = clearInputValues;

  const notes = document.querySelector("#containerDiv");
  notes.onclick = deleteNote;

  focusInput();
}

window.onload = onWindowLoad;

function focusInput() {
  const taskContentBox = document.querySelector("#taskContent");
  taskContentBox.focus();
}

function changeDateFormat(noteDate) {
  if (noteDate) {
    const [day, month, year] = noteDate.split("-");
    return `${year}/${month}/${day}`;
  } else {
    return "";
  }
}

function clearInputValues() {
  const inputs = document.querySelectorAll("input");
  for (const input of inputs) {
    input.value = "";
  }
  focusInput();
}
