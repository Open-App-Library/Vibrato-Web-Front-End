<template>
<v-container>
	
	<div class="toolbar-container">
		<v-toolbar flat v-if="selected_notes.length">
			<v-toolbar-items class="hidden-sm-and-down">
				<v-btn flat color="error" @click="emptyTrashSelected">Delete Selected</v-btn>
				<v-btn flat color="info" @click="restoreTrashSelected">Restore Selected</v-btn>
			</v-toolbar-items>
			<v-toolbar-title>{{selected_notes.length}} {{selected_notes.length == 1 ? "note" : "notes"}} selected</v-toolbar-title>
		</v-toolbar>
		<v-toolbar flat v-else>
			<v-toolbar-items class="hidden-sm-and-down">
				<v-btn color="error" @click="emptyTrash">Empty Trash</v-btn>
			</v-toolbar-items>
		</v-toolbar>
	</div>


	<v-divider></v-divider>

	<v-data-table
		flat
		:items="notes"
		class="elevation-1">
		<template slot="headers" slot-scope="props">
			<tr>
				<th :width="50">
					<v-checkbox
						primary
						hide-details
						@change="e => toggleNoteSelection(e)"
						></v-checkbox>
				</th>
				<th class="text-xs-left">
					Note Title
				</th>
			</tr>
		</template>
		<template slot="items" slot-scope="props">
			<tr>
				<td><v-checkbox hide-details v-model="selected_notes" :value="props.item.id"></v-checkbox></td>
				<td>{{ props.item.title }}</td>
				<td :width="100" class="text-xs-right"><v-btn color="info" flat @click="restoreNote(props.item.id)">Restore Note</v-btn></td>
				<td :width="100" class="text-xs-right"><v-btn color="error" flat @click="deleteNote(props.item.id)">Delete Note</v-btn></td>
			</tr>
		</template>
	</v-data-table>
</v-container>
</template>

<script>
	import NoteView from '@/components/parts/Noteview'

	export default {
		data: () => ({
			all_notes: null,
			notes: [],
			selected_notes: []
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
				let list_of_ids = []
				for (var note of this.notes) {
					list_of_ids.push(note.id)
				}
				this.$root.deleteNotesWithIDs(list_of_ids)
			},
			emptyTrashSelected() {
				let list_of_ids = []
				for (var noteID of this.selected_notes) {
					list_of_ids.push(noteID)
				}
				this.$root.deleteNotesWithIDs(list_of_ids)
				this.selected_notes = []
			},
			restoreTrashSelected() {
				let list_of_ids = []
				for (var noteID of this.selected_notes) {
					list_of_ids.push(noteID)
				}
				this.$root.trashNotes(list_of_ids, false)
				this.get_notes(this.notebook_id, this.tag_id, this.selected_note_id)
			},
			deleteNote(note_id) {
				this.$root.deleteNotesWithIDs([note_id])
			},
			restoreNote(note_id) {
				this.$root.trashNotes([note_id], false)
				this.get_notes(this.notebook_id, this.tag_id, this.selected_note_id)
			},
			toggleNoteSelection(is_checked) {
				this.selected_notes = []
				if (is_checked) {
					for (var note of this.notes) {
						this.selected_notes.push(note.id)
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
.toolbar-container
	margin-bottom: 20px
</style>
