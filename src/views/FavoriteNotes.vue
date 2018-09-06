<template>
	<NoteView title="Favorited Notes" :notes="notes"></NoteView>
</template>

<script>
	import NoteView from '@/components/parts/Noteview'

	export default {
		data: () => ({
			all_notes: null,
			notes: [],
		}),
		methods: {
			get_notes(notebook_id, tag_id, selected_note_id) {
				this.notes = []
				for (var note of this.$root.notes) {
					if (note.is_favorited && !note.trashed) {
						this.notes.push(note)
					}
				}
			}
		},
		components: {
			NoteView
		},
		watch: {
			// Whenever the global notes object changes ($root.notes), update the view
			all_notes() {
				this.get_notes(this.notebook_id, this.tag_id, this.selected_note_id)
			}
		},
		created() {
			this.get_notes(this.notebook_id, this.tag_id, this.selected_note_id)
			this.all_notes = this.$root.notes
		},
	}
</script>

<style lang="sass">
</style>
