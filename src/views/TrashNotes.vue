<template>
<NoteView :notes="notes">
	<v-subheader>
		Trashed Notes
		<v-btn color="error" @click="emptyTrash">Empty Trash</v-btn>
	</v-subheader>
	</NoteView>
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
					if (note.trashed) {
						this.notes.push(note)
					}
				}
			},
			emptyTrash() {
				let list_of_ips = []
				for (var note of this.notes) {
					list_of_ips.push(note.id)
				}
				this.$root.deleteNotesWithIDs(list_of_ips)
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
