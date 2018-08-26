<template>
	<NoteView :notes="notes" :selected_note_index="selected_note_index"></NoteView>
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
		if (parameter) {
			if (value != parameter) {
				return false
			}
		}
		return true
	}
	function isGoodArray(parameter, array) {
		for (var value in array) {
			if (!isGood(parameter, value)) {
				return false
			}
		}
		return true
	}
	export default {
		data: () => ({
			notes: [],
			selected_note_index: null
		}),
		props: ['notebook_id', 'tag_id', 'selected_note_id'],
		methods: {
			get_notes(notebook_id, tag_id, selected_note_id) {
				this.notes = []
				this.selected_note_index = null
				var allNotes = require('../../dummy/notes.json');
				var shouldAdd = true
				var tests = [
					(note) => {
						return isGood(notebook_id, note.notebook)
					},
					(note) => {
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
		},
		beforeRouteUpdate(to, from, next) {
			// this.get_notes(
			// 	to.params.notebook_id,
			// 	to.params.tag_id,
			// 	to.params.selected_note_id
			// )
			next()
		},
	}
</script>

<style lang="sass">
</style>
