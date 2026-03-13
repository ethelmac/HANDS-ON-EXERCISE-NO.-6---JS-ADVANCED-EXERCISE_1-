const numField = document.getElementById("numField");
const addBtn = document.getElementById("addBtn");
const clearInputBtn = document.getElementById("clearInputBtn");
const resetAllBtn = document.getElementById("resetAllBtn");
const summaryBtn = document.getElementById("summaryBtn");
const numTableBody = document.getElementById("numTableBody");
const summaryDisplay = document.getElementById("summaryDisplay");

let numberList = [];

function processEntry() {
    const inputVal = numField.value;

    if (inputVal === "") {
        alert("Input cannot be empty");
        return;
    }

    const value = parseInt(inputVal);
    numberList.push(value);
    
    numField.value = "";
    numField.focus();
    updateTable();
}

function updateTable() {
    numTableBody.innerHTML = "";
    summaryDisplay.innerHTML = "";

    numberList.forEach((n, index) => {
        const isEven = n % 2 === 0;
        const row = document.createElement("tr");

        const valCell = document.createElement("td");
        valCell.textContent = n;

        const catCell = document.createElement("td");
        catCell.textContent = isEven ? "EVEN" : "ODD";
        catCell.className = isEven ? "even-text" : "odd-text";

        const actionCell = document.createElement("td");
        const delBtn = document.createElement("button");
        delBtn.textContent = "Remove";
        delBtn.onclick = () => {
            numberList.splice(index, 1);
            updateTable();
        };

        actionCell.appendChild(delBtn);
        row.appendChild(valCell);
        row.appendChild(catCell);
        row.appendChild(actionCell);
        numTableBody.appendChild(row);
    });
}

addBtn.addEventListener("click", processEntry);

numField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") processEntry();
});

clearInputBtn.addEventListener("click", () => {
    numField.value = "";
});

resetAllBtn.addEventListener("click", () => {
    numberList = [];
    updateTable();
});

summaryBtn.addEventListener("click", () => {
    if (numberList.length === 0) return;

    const evens = numberList.filter(n => n % 2 === 0).length;
    const odds = numberList.length - evens;

    summaryDisplay.innerHTML = `Total items: ${numberList.length} | Evens: ${evens} | Odds: ${odds}`;
});