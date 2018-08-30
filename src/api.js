// Can access these variables by using $root
var global_data = {
	darkmode: false,
	compactmode: false,
	notes: null,
	notebooks: null,
	tags: null
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
	getNotebookById(id, search_array=null) {
		if (id == null) return null
		return this.recurseNotebooks(function(notebook) {
			return notebook.id == id
		})
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
