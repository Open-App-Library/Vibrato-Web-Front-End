// Can access these variables by using $root
var global_data = {
	darkmode: false,
	compactmode: false,
	notes: null,
	notebooks: null,
	tags: null,
	show_sidebar: true
}

var global_methods = {
	load_data() {
		// Loads notes, notebooks and other API data
		this.notes = require('../dummy/notes.json')
		this.notebooks = require('../dummy/notebooks.json')
		this.tags = require('../dummy/tags.json')
	},
	saveNote(note) {
		// TODO: Implement this function with the backend

		/* This function will take a note object, send it
		 * to the back-end, get a complete note object with
		 * all fields filled, and then return it.
		 *
		 * Important Note: This function current uses placeholder
		 * data to simulate an API call */

		let curDate = this.get_date_string()
		let default_note_template = {
			id:  Math.floor((Math.random() * 500) + 100), // random num
			title: "Note Title",
			text: "",
			user: 1,
			date_created: curDate,
			date_modified: curDate,
			shared_with: null,
			is_public: false,
			is_favorited: false,
			notebook: null,
			tags: [],
			trashed: false
		}
		let api_returned_note_value = Object.assign(default_note_template, note)
		return api_returned_note_value
	},
	deleteNotesWithIDs(noteIDArray) {
		//TODO: Send noteArray to back-end API
		// Step 1: Delete notes on server
		// ...
		// Step 2: Delete the notes locally
		for (var i=this.notes.length-1; i >= 0; i--) {
			let current_note = this.notes[i]
			if (noteIDArray.includes(current_note.id)) {
				this.notes.splice(i, 1)
			}
		}
	},
	trashNotes(id_array, trashed_bool) {
		// Takes an array of note IDs and the trash status.
		for (var note of this.notes) {
			if (id_array.includes(note.id)) {
				note.trashed = trashed_bool
			}
		}
	},
	recurseNotebooks(callback, parent_id=null, search_array=null) {
		var notebooks = this.notebooks
		if (search_array) notebooks = search_array

		for (var notebook of notebooks) {
			var should_stop = callback(notebook)
			if (should_stop) return notebook
			if (notebook.children) {
				var children_check = this.recurseNotebooks(callback, notebook.id, notebook.children)
				if (children_check) return children_check
			}
		}
		return null
	},
	recurseAndEditNotebooks(callback, parent_id=null, search_array=null) {
		var notebooks = this.notebooks
		if (search_array) notebooks = search_array
		var new_notebook_object = []

		for (var notebook of notebooks) {
			if (!notebook.children) {
				notebook.children = []
			}
			notebook = callback(notebook, parent_id)
			if (notebook) {
				if (notebook.children) {
					notebook.children = this.recurseAndEditNotebooks(callback, notebook.id, notebook.children)
				}
				new_notebook_object.push(notebook)
			}
		}
		return new_notebook_object
	},
	getNotebookById(id) {
		if (id == null) return null
		return this.recurseNotebooks(function(notebook) {
			return notebook.id == id
		})
	},
	getTagById(id) {
		if (id == null) return null
		for (var tag of this.tags) {
			if (tag.id == id) {
				return tag
			}
		}
		return null
	},
	addNewTag(new_tag_label) {
		new_tag_label = new_tag_label.trim()
		// Add new tag and return its ID
		// First check if tag exists
		for (var tag of this.tags) {
			if (tag.title.toLowerCase() == new_tag_label.toLowerCase()) {
				return tag.id
			}
		}
		// Otherwise, add a new tag
		var new_tag_id = Math.floor(Math.random() * 10000) + 10;
		this.tags.push({title: new_tag_label, id: new_tag_id})
		return new_tag_id
	},
	chooseClasses(light_classes) {
		if (this.darkmode) {
			return ""
		} else {
			return light_classes
		}
	},
	reorderNotebook(selected_notebook) {
		/* Historical note: Getting the treeview to work drived me bonkers.
		 * Turns out it was a javascript variable problem and the solution
		 * was to convert the object into a JSON string and then parse it
		 * back into a regular javascript variable. */
		var new_notebooks = JSON.parse(JSON.stringify(this.recurseAndEditNotebooks(function(notebook, active_parent) {
			if (notebook.id == selected_notebook.id && notebook.parent != active_parent) {
				return null
			}
			if (notebook.id == selected_notebook.parent) {
				notebook.children.push(selected_notebook)
			}
			return notebook
		})))
		if (selected_notebook.parent == null) {
			new_notebooks.push(selected_notebook)
		}
		this.notebooks = new_notebooks
	},
	get_date_string() {
		let today = new Date()
		let dd = today.getDate()
		let mm = today.getMonth()+1
		let yyyy = today.getFullYear()
		if(dd<10){
			dd='0'+dd
		}
		if(mm<10){
			mm='0'+mm
		}
		return yyyy+'-'+mm+'-'+dd
	}
}

var global_computed = {
	notebooks_all() {
		// Returns all notebooks (including children) as a flat array
		var notebook_list = []
		this.recurseNotebooks(function(notebook) {
			notebook_list.push(notebook)
		})
		return notebook_list
	}
}

export default {
	global_data,
	global_methods,
	global_computed
}
