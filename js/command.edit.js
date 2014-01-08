MM.Command.Edit = Object.create(MM.Command, {
	label: {value: "Edit item"},
	keys: {value: [
		{keyCode: 32},
		{keyCode: 113}
	]}
});
MM.Command.Edit.execute = function() {
	MM.App.current.startEditing();
	MM.App.editing = true;
}

MM.Command.Finish = Object.create(MM.Command, {
	keys: {value: [{keyCode: 13, altKey:false, ctrlKey:false, shiftKey:false}]},
	editMode: {value: true}
});
MM.Command.Finish.execute = function() {
	MM.App.editing = false;
	var text = MM.App.current.stopEditing();
	if (text) {
		var action = new MM.Action.SetText(MM.App.current, text);
	} else {
		var action = new MM.Action.RemoveItem(MM.App.current);
	}
	MM.App.action(action);
}

MM.Command.Newline = Object.create(MM.Command, {
	label: {value: "Line break"},
	keys: {value: [
		{keyCode: 13, shiftKey:true},
		{keyCode: 13, ctrlKey:true}
	]},
	editMode: {value: true}
});
MM.Command.Newline.execute = function() {
	var range = getSelection().getRangeAt(0);
	var br = document.createElement("br");
	range.insertNode(br);
	range.setStartAfter(br);
}

MM.Command.Cancel = Object.create(MM.Command, {
	editMode: {value: true},
	keys: {value: [{keyCode: 27}]}
});
MM.Command.Cancel.execute = function() {
	MM.App.editing = false;
	MM.App.current.stopEditing();
	var oldText = MM.App.current.getText();
	if (!oldText) { /* newly added node */
		var action = new MM.Action.RemoveItem(MM.App.current);
		MM.App.action(action);
	}
}

MM.Command.Bold = Object.create(MM.Command, {
	editMode: {value: true},
	label: {value: "Bold"},
	keys: {value: [{charCode: "b".charCodeAt(0), ctrlKey:true}]}
});
MM.Command.Bold.execute = function() {
	document.execCommand("bold", null, null);
}

MM.Command.Underline = Object.create(MM.Command, {
	editMode: {value: true},
	label: {value: "Underline"},
	keys: {value: [{charCode: "u".charCodeAt(0), ctrlKey:true}]}
});
MM.Command.Underline.execute = function() {
	document.execCommand("underline", null, null);
}

MM.Command.Italic = Object.create(MM.Command, {
	editMode: {value: true},
	label: {value: "Italic"},
	keys: {value: [{charCode: "i".charCodeAt(0), ctrlKey:true}]}
});
MM.Command.Italic.execute = function() {
	document.execCommand("italic", null, null);
}

MM.Command.Strikethrough = Object.create(MM.Command, {
	editMode: {value: true},
	label: {value: "Strike-through"},
	keys: {value: [{charCode: "s".charCodeAt(0), ctrlKey:true}]}
});
MM.Command.Strikethrough.execute = function() {
	document.execCommand("strikeThrough", null, null);
}