<template>
	<v-layout fill-height>
		<v-flex xs3 class="note_column" :id="$root.darkmode ? 'dark_column' : 'light_column'">
			<v-list :three-line="!$root.compactmode">
				<v-subheader>
					Notes
				</v-subheader>
				<template v-for="(note, index) in notes">
					<v-list-tile
						:key="note.title"
						avatar
						ripple
						@click="selected_note = index"
						>
						<v-list-tile-content>
							<v-list-tile-title class="text--primary">{{ note.title}} </v-list-tile-title>
							<v-list-tile-sub-title>{{ getDescription(note.text) }}</v-list-tile-sub-title>
						</v-list-tile-content>

						<v-list-tile-action>
							<v-list-tile-action-text>{{ note.date_created }}</v-list-tile-action-text>
							<v-icon
								@click.stop.prevent="toggleFavorite(index)"
								:color="favorites.includes(index) ? 'yellow darken-2' : 'grey lighten-1'"
								>
								star
							</v-icon>
						</v-list-tile-action>

					</v-list-tile>
					<v-divider
						v-if="index + 1 < notes.length"
						:key="index"
						></v-divider>
				</template>
			</v-list>
		</v-flex>
		<v-flex xs9 class="note_edit_column">
			<v-container id="note_container">
				<div v-if="selected_note != null" id="the_editor">
					<!-- The Title Input -->
					<v-text-field class="headline" :value="curNote.title" @input="e => notes[selected_note].title = e"></v-text-field>

					<!-- Bar above editor -->
					<v-tabs right>
						<v-tab @click="setEditMode(0)">
							Fancy
						</v-tab>
						<v-tab @click="setEditMode(1)">
							Markdown
						</v-tab>
					</v-tabs>
					<VueEditor
						:editorToolbar="editor_toolbar"
						:editorOptions="editor_options"
						:value="curNoteToHTML"
						@input="e => selected_note_html = e"
					></VueEditor>
				</div>
				<div v-else>
					No Note selected
				</div>
			</v-container>
		</v-flex>
	</v-layout>
</template>

<script>
	import Marked from 'marked'
	import TurnDown from 'turndown'
	import {VueEditor} from 'vue2-editor'

	const FANCY_MODE = 0, MARKDOWN_MODE = 1
	const DEFAULT_TOOLBAR = [
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		['bold', 'italic', 'underline'],
		[{ 'list': 'ordered'}, { 'list': 'bullet' }],
		['image', 'code-block']
	]

	const DEFAULT_OPTIONS_FANCY     = {}
	const DEFAULT_OPTIONS_PLAINTEXT = {formats: [], modules: {toolbar: false}}

	export default {
  	name: 'home',
		data: () => ({
			favorites: [0, 2],
			notes: [],
			selected_note: null,
			selected_note_html: "",
			editor_mode: 0,
			editor_toolbar: DEFAULT_TOOLBAR,
			editor_options: DEFAULT_OPTIONS_FANCY
		}),
		methods: {
			toggleFavorite(num) {
				if (this.favorites.includes(num)) {
					const index_to_remove = this.favorites.indexOf(num)
					this.favorites.splice(index_to_remove, 1)
				} else{
					this.favorites.push(num)
				}
			},
			getDescription(text) {
				return text.trim().replace(/[^a-zA-Z ]/g, ' ').substring(0,70)+'...'
			},
			setEditMode(mode) {
				if (mode == FANCY_MODE) {
					if (this.editor_mode != mode) {
						this.editor_mode = mode
						this.editor_options = DEFAULT_OPTIONS_FANCY
					}
				} else { // MARKDOWN_MODE
					if (this.editor_mode != mode) {
						this.editor_mode = mode
						this.editor_options = DEFAULT_OPTIONS_PLAINTEXT
					}
				}
			}
		},
		computed: {
			curNote() {
				return this.notes[this.selected_note]
			},
			curNoteToHTML() {
				return Marked(this.curNote.text)
			},
			curNoteToMarkdown() {
				var HTMLToMarkdown = new TurnDown({headingStyle: "atx"})
				return HTMLToMarkdown.turndown("<h1>test</h1><a href=\"https://google.com\">WEfflcome</a>")
			}
		},
		components: {
			VueEditor
		},
		created() {
			this.notes =require('../../dummy/notes.json');
		}
	}
</script>

<style lang="sass" scoped>
	.note_column, .note_edit_column
		max-height: calc(100vh - 50px) // 50px is the height of toolbar
		overflow-y: scroll
	.note_column
		min-width: 365px
	#dark_column
		background: #424242
</style>
