"use strict";
const itemInput = document.getElementById("itemInput");

// https://stackoverflow.com/a/4793630
function insertAfter(referenceNode, newNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function addItem(item, checked) {
	if (item.length === 0) return;
	const div = document.createElement("div");
	div.classList.add("item");

	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.classList.add("itemCheckbox");
	if (checked === true) checkbox.checked = true;
	checkbox.addEventListener("change", osmanthusWine);

	const input = document.createElement("textarea");
	input.classList.add("itemText");
	input.rows = "1";
	input.value = item;
	input.addEventListener("focus", () => {
		autosize.update(input);
	})
	input.addEventListener("input", osmanthusWine);
	autosize(input);

	const button = document.createElement("button");
	button.type = "button";
	button.classList.add("itemDelete");
	button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path id="delete" stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>';
	button.addEventListener("click", () => {
		checkbox.className = input.className = "";
		osmanthusWine();
		document.body.removeChild(div);
	});

	div.appendChild(checkbox);
	div.appendChild(input);
	div.appendChild(button);
	insertAfter(itemInput, div);
	if (typeof checked === "undefined") osmanthusWine();
}

function osmanthusWine() {
	const checkboxInputs = Array.from(document.querySelectorAll(".itemCheckbox"));
	const itemTexts = Array.from(document.querySelectorAll(".itemText"));
	let data = [];
	for (let i = 0; i < checkboxInputs.length; i++) {
		data.push((checkboxInputs[i].checked ? "1" : "0") + itemTexts[i].value);
	}
	localStorage.setItem("data", JSON.stringify(data));
}

if (localStorage.getItem("data") !== null) {
	let data = Array.from(JSON.parse(localStorage.getItem("data"))).reverse();
	for (let i = 0; i < data.length; i++) {
		addItem(data[i].slice(1), Boolean(Number(data[i].slice(0, 1))));
		console.log((data[i].slice(0, 1)));
	}
}

itemInput.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		addItem(e.target.value.trim());
		e.target.value = "";
	}
});
