<template>
<div>
This will be a distraction-free note-writing page similar to Evernote Webs'.
</div>
</template>

<script>
	import NoteView from '@/components/parts/Noteview'

	export default {
		data: () => ({
			notes: null,
			selected_note_index: 0,
		}),
		components: {
			NoteView
		},
		created() {
			this.notes = this.$root.notes
			const note_id = this.notes.length
			this.notes.unshift(
				{title: "Untitled Note",
				 text: "",
				 shared_with:null,
				 is_public: true,
				 is_favorited: false,
				 notebook: null,
				 tags: []
				}
			)
		}
	}
</script>

<style lang="sass">
</style>
