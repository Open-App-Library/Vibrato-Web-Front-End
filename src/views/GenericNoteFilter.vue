<template>
<NoteView :notes="notes" :selected_note_index="selected_note_index">
	<v-toolbar dense flat v-if="notebook_id" color="white">
		<v-toolbar-title>{{rawTitle}}</v-toolbar-title>

		<v-spacer></v-spacer>

		<v-btn icon>
			<v-icon>edit</v-icon>
		</v-btn>
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
			filteredViewTitle: "Notes"
		}),
		props: ['notebook_id', 'tag_id', 'selected_note_id'],
		methods: {
			get_notes(notebook_id, tag_id, selected_note_id) {
				this.notes = []
				this.selected_note_index = null
				if (this.notebook_id >= 0 && this.notebook_id != null) {
					this.rawTitle = this.$root.getNotebookById(this.notebook_id).title
					this.filteredViewTitle = 'Notes in "' + this.rawTitle + '"'
				} else if (this.tag_id >= 0 && this.tag_id != null) {
					this.rawTitle = this.$root.getTagById(this.tag_id).title
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
