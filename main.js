const username = document.querySelector("#username");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const email = document.querySelector("#email");
const clearBtn = document.querySelector(".clear");
const sendBtn = document.querySelector(".send");
const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".close");
const listOfInputs = [username, password, password2, email];

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector(".error-text");

	formBox.classList.add("error");
	errorMsg.textContent = msg;
};

const clearError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.remove("error");
};

const checkForm = (input) => {
	input.forEach((el) => {
		if (el.value === "") {
			showError(el, el.placeholder);
		} else {
			clearError(el);
		}
	});
};

const checkLenght = (input, min) => {
	if (input.value.length < min) {
		showError(
			input,
			`${input.previousElementSibling.innerText.slice(
				0,
				-1
			)} musi mieć conajmniej ${min} znaków!`
		);
	}
};

const checkPassword = (pass1, pass2) => {
	if (pass1.value !== pass2.value) {
		showError(pass2, "Hasła do siebie nie pasują!");
	}
};

const checkEmail = (email) => {
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, "Email jest niepoprawny!");
	}
};

const checkErrors = () => {
	const allInputs = document.querySelectorAll(".form-box");
	let errorCount = 0;

	allInputs.forEach((el) => {
		if (el.classList.contains("error")) {
			errorCount++;
		}
	});

	if (errorCount === 0) {
		popup.classList.add("show-popup");
	}
};

sendBtn.addEventListener("click", (e) => {
	e.preventDefault();

	checkForm(listOfInputs);
	checkLenght(username, 3);
	checkLenght(password, 8);
	checkPassword(password, password2);
	checkEmail(email);
	checkErrors();
});

clearBtn.addEventListener("click", (e) => {
	e.preventDefault();

	listOfInputs.forEach((el) => {
		el.value = "";
		clearError(el);
	});
});
