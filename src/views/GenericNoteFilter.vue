<template>
<NoteView :notes="notes" :selected_note_index="selected_note_index">
	<v-toolbar dense flat v-if="notebook_id" color="white">
		<v-toolbar-title>{{selected_notebook.title ? selected_notebook.title : "Untitled Notebook"}}</v-toolbar-title>

		<v-spacer></v-spacer>

		<v-btn icon @click="show_edit_notebook_dialog = true">
			<v-icon>edit</v-icon>
		</v-btn>

		<v-dialog v-model="show_edit_notebook_dialog" max-width="300px">
			<v-card>
				<v-card-title>
					<span class="headline">Edit Notebook</span>
				</v-card-title>
				<v-card-text>
					<v-text-field label="Notebook Title" v-model="selected_notebook.title"></v-text-field>
					<v-select
						:items="suitable_parent_notebooks"
						label="Parent Notebook"
						item-text="title"
						item-value="id"
						:value="selected_notebook.parent"
						@change="e => selectNewParentNotebook(e)"
					></v-select>
				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" flat @click.native="show_edit_notebook_dialog = false">Close</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

	</v-toolbar>

	<v-subheader v-else>
		{{filteredViewTitle}}
	</v-subheader>
</NoteView>
</template>

<script>
	import NoteView from '@/components/parts/Noteview'

	function runTests(tests, note) {
		for (var test of tests) {
			var result = test(note)
			if (!result) {
				return false
			}
		}
		return true
	}
	function isGood(parameter, value) {
		// If value == parameter return true
		if (parameter) {
			if (value != parameter) {
				return false
			}
		}
		return true
	}
	function isGoodArray(parameter, array) {
		// if value in array
		if (!parameter) return true // Don't bother if a parameter was not supplied
		var good_count = 0
		for (var value of array) {
			if (isGood(parameter, value)) {
				good_count++
			}
		}
		return good_count > 0 ? true : false
	}
	export default {
		data: () => ({
			notes: [],
			selected_note_index: null,
			rawTitle: "",
			filteredViewTitle: "Notes",
			show_edit_notebook_dialog: false,
			selected_notebook: null,
			selected_tag: null
		}),
		props: ['notebook_id', 'tag_id', 'selected_note_id'],
		methods: {
			get_notes(notebook_id, tag_id, selected_note_id) {
				this.notes = []
				this.selected_note_index = null
				if (this.notebook_id >= 0 && this.notebook_id != null) {
					this.selected_notebook = this.$root.getNotebookById(this.notebook_id)
					this.rawTitle = this.selected_notebook.title
					this.filteredViewTitle = 'Notes in "' + this.rawTitle + '"'
				} else if (this.tag_id >= 0 && this.tag_id != null) {
					this.selected_tag = this.$root.getTagById(this.tag_id)
					this.rawTitle = this.selected_tag.title
					this.filteredViewTitle = 'Notes tagged "' + this.rawTitle + '"'
				}
				var allNotes = this.$root.notes
				var shouldAdd = true
				var tests = [
					(note) => { // Notebook Test
						return isGood(notebook_id, note.notebook)
					},
					(note) => { // Tag Test
						return isGoodArray(tag_id, note.tags)
					}
				]
				for (var note of allNotes) {
					shouldAdd = runTests(tests, note)
					if (shouldAdd) {
						this.notes.push(note)
						if (this.selected_note_id) {
							if (note.id == selected_note_id) {
								this.selected_note_index = selected_note_id
							}
						}
					}
				}
			},
			recurseChildrenIDs(children) {
				var children_list = []
				for (var child of children) {
					children_list.push(child.id)
					if (child.children) {
						children_list = children_list.concat(this.recurseChildrenIDs(child.children))
					}
				}
				return children_list
			},
			selectNewParentNotebook(parent_id) {
				console.log("selecting new parent notebook")
				this.selected_notebook.parent = parent_id
				this.$root.reorderNotebook(this.selected_notebook)
				console.log("done selecting new parent notebook")
			}
		},
		computed: {
			suitable_parent_notebooks() {
				var all_notebooks = this.$root.notebooks_all
				var   suitable_parent_ids = [{title: "None", id: null}]
				var unsuitable_parent_ids = [this.selected_notebook.id]
				if (this.selected_notebook.children) {
					unsuitable_parent_ids = unsuitable_parent_ids.concat(
						this.recurseChildrenIDs(this.selected_notebook.children)
					)
				}
				for (var notebook of all_notebooks) {
					if (!unsuitable_parent_ids.includes(notebook.id)) {
						suitable_parent_ids.push(notebook)
					}
				}
				return suitable_parent_ids
			}
		},
		components: {
			NoteView
		},
		created() {
			this.get_notes(this.notebook_id, this.tag_id, this.selected_note_id)
		}
	}
</script>

<style lang="sass">
</style>
