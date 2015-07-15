window.addEventListener("load", function onLoad(event) {
	const showForm = document.getElementById("showForm");
	const rules = document.getElementById("rules");
	const form = document.getElementById("form");
	const cancel = document.getElementById("cancel");
	const rule = document.getElementById("rule");
	const message = document.getElementById("message");
	const addRule = document.getElementById("addRule");
	const rulesList = document.getElementById("rulesList");
	const removeList = document.getElementById("removeList");
	const remove = document.getElementById("remove");
	const exportButton = document.getElementById("exportButton");

	if (rule != null) {
		rule.addEventListener("change", onRuleChange);
		rule.addEventListener("keyup", onRuleChange);
	}

	if (cancel != null) {
		cancel.addEventListener("click", onCancelClick);
	}

	if (showForm != null) {
		showForm.addEventListener("click", onShowFormClick);
	}

	if (addRule != null) {
		addRule.addEventListener("click", onAddRuleClick);
	}

	if (remove != null) {
		remove.addEventListener("click", onRemoveClick);
	}

	self.port.on("getRules", onGetRules);

	addRule.style.display = "none";

	self.port.emit("event", "load");
});

function isExactMatch(pattern) {
	const urlPattern =
		new RegExp("^(http|ftp|https)://[\\w-]+(\\.[\\w-]+)*/$");
	return urlPattern.test(pattern);
}


function isDomainNamePrefixedWithAsterixAndDot(pattern) {
	const urlPattern = new RegExp("^\\*(\\.[\\w-]+)+$");
	return urlPattern.test(pattern);
}


function isURLFollowedByAsterix(pattern) {
	const urlPattern =
		new RegExp("^(http|ftp|https)://[\\w-]+(\\.[\\w-]+)*/\\*$");
	return urlPattern.test(pattern);
}


function changeMessage(color, msg) {
	while (message.lastChild) {
		message.removeChild(message.lastChild);
	}

	message.style.borderColor = color;
	message.appendChild(document.createTextNode(msg));
}


const onRuleChange = function(data) {
	rule.value = rule.value.trim();

	if (rule.value == null) {
		return;
	}

	if (rule.value == "") {
		changeMessage("red", "Please enter a new rule.");
		return;
	}

	if ((rule.value.match(/\*/g) || []).length > 1) {
		changeMessage("red", "There can only be one asterix (*) in a rule.");
		return;
	}

	let go = false;

	if (isExactMatch(rule.value)) {
		go = true;
		changeMessage("green", "Only this URL will be blocked.");
	}

	if (isDomainNamePrefixedWithAsterixAndDot(rule.value)) {
		go = true;
		changeMessage("green", "All URLs and subpages containing the domain" +
			" will be blocked.");
	}

	if (isURLFollowedByAsterix(rule.value)) {
		go = true;
		changeMessage("green", "All URLs and subpages will be blocked.");
	}

	if (go) {
		addRule.style.display = "inline";
	}
	else {
		changeMessage("red", "This is not a correct rule.");
		addRule.style.display = "none";
	}
};


const onCancelClick = function(data) {
	rules.style.display = "block";
	form.style.display = "none";

	rule.value = "";
	onRuleChange(false);
};


const onShowFormClick = function(data) {
	rules.style.display = "none";
	form.style.display = "block";
};


const onGetRules = function(data) {
	exportButton.style.display = "none";

	while (rulesList.lastChild) {
		rulesList.removeChild(rulesList.lastChild);
	}

	while (removeList.lastChild) {
		removeList.removeChild(removeList.lastChild);
	}

	if (data.length == 0) {
		let li = document.createElement("li");
		li.appendChild(document.createTextNode("There are no rules, yet."));
		rulesList.appendChild(li);

		remove.style.display = "none";

		return;
	}

	let rules = "";

	for each (let rule in data) {
		rules += rule + "\n";

		let li = document.createElement("li");
		li.appendChild(document.createTextNode(rule));
		rulesList.appendChild(li);

		let option = document.createElement("option");
		option.appendChild(document.createTextNode(rule));
		option.value = rule;
		removeList.appendChild(option);
	}

	exportButton.setAttribute("href", "data:text/text;charset=utf-8," + encodeURIComponent(rules));
	exportButton.style.display = "inline";

	remove.style.display = "inline";
};


const onAddRuleClick = function(data) {
	self.port.emit("add", rule.value);

	onCancelClick(false);
}


const onRemoveClick = function(data) {
	if (removeList.selectedIndex < 0) {
		return;
	}

	self.port.emit("remove",
		removeList.options[removeList.selectedIndex].value);
}
