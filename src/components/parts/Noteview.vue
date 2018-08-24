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
						@click="selectNote(index)"
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
				<div v-if="local_note_index != null" id="the_editor">
					<!-- The Title Input -->
					{{curNote.notebook}}
					<v-text-field
						placeholder="Title"
						class="headline"
						:value="curNote.title"
						@input="e => notes[local_note_index].title = e"
						></v-text-field>
					<v-tabs right id="editor-tabs">
						<v-tab @click="markdown_mode = false">
							Fancy
						</v-tab>
						<v-tab @click="markdown_mode = true">
							Markdown
						</v-tab>
						<v-tab-item>
							<VueEditor
								:editorToolbar="editor_toolbar"
								:value="selected_note_html"
								@input="e => changeNoteText('html', e)"
								></VueEditor>
						</v-tab-item>
						<v-tab-item>
							<SimpleMDE
								:isVisible="markdown_mode"
								:value="selected_note_markdown"
								@input="e => changeNoteText('md', e)"
								></SimpleMDE>
						</v-tab-item>
					</v-tabs>
				</div>
				<div v-else>
					No Note selected
				</div>
			</v-container>
		</v-flex>
	</v-layout>
</template>

<script>
	import MdHtml from '@/lib/md-html'
	import {VueEditor} from 'vue2-editor'
	import SimpleMDE from '@/components/parts/SimpleMDE'

	// Useful for quickly JSON.stringify'ing
	// function s(str) {
	// 		return JSON.stringify(str)
	// }

	export default {
		name: 'home',
		props: ['notes', 'selected_note_index'],
		data: () => ({
			favorites: [],
			simplemde: null,
			markdown_mode: false,
			local_note_index: null, // Used to avoid mutating selected_note_index property
			selected_note_html: "",
			selected_note_markdown: "",
			editor_toolbar: [
				[{ header: [1, 2, 3, 4, 5, 6, false] }],
				['bold', 'italic', 'underline'],
				[{ 'list': 'ordered'}, { 'list': 'bullet' }],
				['image', 'code-block']
			],
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
			selectNote(index) {
				this.local_note_index = index
				this.changeNoteText('md', this.curNote.text, true)
			},
			cleanHTML(html) {
				html = html.replace(/(<(?!\/)[^>]+>)+(<\/[^>]+>)+/g, "") // Remove empty tags. ex: <p></p>
				return html
			},
			changeNoteText(input_type, data, force = false) {
				// TODO: Create an abstraction for compiling and decompiling HTML/Markdown
				// TODO: Create unit tests to make sure compiling and decompiling always produce the same result.
				var html = data, markdown = data
				if (input_type == "html") {
					if (this.markdown_mode && !force) {
						return // User is using markdown editor. Do not proceed.
					}
					html = this.cleanHTML(html)
					html = html.replace(/\n/g, "") // Remove newlines from HTML..unneeded
					html = html.replace("<p><br></p>", "") // Replace wrapped br with nothing
					markdown = MdHtml.html2md(html)
				} else { // markdown
					if (!this.markdown_mode && !force) {
						return // User is using fancy editor. Do not proceed.
					}
					html = MdHtml.md2html(markdown).replace(/\n/g, "<br>")
					html = this.cleanHTML(html)
				}
				if (this.selected_note_html != html && this.markdown_mode || force) {
					this.selected_note_html = html
				}
				if (this.selected_note_markdown != markdown && !this.markdown_mode || force) {
					this.selected_note_markdown = markdown
				}
				if (this.curNote.text != markdown || force) {
					this.curNote.text = markdown
				}
			}
		},
		computed: {
			curNote() {
				if (this.notes.length == 0) {
					return null
				}
				return this.notes[this.local_note_index]
			}
		},
		components: {
			VueEditor,
			SimpleMDE
		},
		watch: {
			notes(newVal) {
				this.notes = newVal
			},
			selected_note_index(newVal) {
				this.local_note_index = newVal
				this.changeNoteText('md', this.curNote.text, true)
			}
		},
		created() {
			// If the selected_note_index is set, select & load the note
			if (!isNaN(this.selected_note_index)) {
				this.selectNote(this.selected_note_index)
			}
		}
	}
</script>

<style lang="sass">
	.note_column, .note_edit_column
		max-height: calc(100vh - 50px) // 50px is the height of toolbar
		overflow-y: scroll
	.note_column
		min-width: 365px
		overflow-y: hidden
		&:hover
			overflow-y: scroll
	#dark_column
		background: #424242
	#editor-tabs .v-tabs__bar
		background: rgba(0,0,0,0) !important
	.ql-toolbar
		background: #ececec
</style>