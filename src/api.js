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
		/* Take a Notebook ID that has had its parent changed and
		 * then restructure notebooks object to correct order */
		var have_moved_notebook = false
		var have_deleted_old_entry = false
		var newNotebookObject = []
		this.recurseNotebooks(function(notebook) {
			if (notebook.id == selected_notebook.parent) {
				if (!notebook.children) {
					notebook.children = []
				}
				notebook.children.push(selected_notebook)
			}
			if (notebook.id != selected_notebook.id) {
				newNotebookObject.push(notebook)
			}
		})
		this.notebooks = newNotebookObject
		console.log(this.notebooks)
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
