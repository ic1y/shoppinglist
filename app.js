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
	button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><use href="#delete" /></svg>';
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
