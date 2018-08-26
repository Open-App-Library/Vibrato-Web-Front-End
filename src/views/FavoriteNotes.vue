<template>
	<NoteView title="Your Favorited Notes" :notes="notes"></NoteView>
</template>

<script>
	import NoteView from '@/components/parts/Noteview'

	export default {
		data: () => ({
			notes: [],
		}),
		methods: {
			get_notes(notebook_id, tag_id, selected_note_id) {
				this.notes = []
				for (var note of this.$root.notes) {
					if (note.is_favorited) {
						this.notes.push(note)
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
