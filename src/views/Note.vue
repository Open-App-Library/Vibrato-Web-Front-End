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
					@click="selected_note_index = index"
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
			<div v-if="selected_note_index != null" id="the_editor">
				<!-- The Title Input -->
				<v-text-field class="headline" :value="curNote.title" @input="e => notes[selected_note_index].title = e"></v-text-field>
				<v-tabs right>
					<v-tab>
						Fancy
					</v-tab>
					<v-tab>
						Markdown
					</v-tab>
					<v-tab-item>
						<VueEditor
							:editorToolbar="editor_toolbar"
							:value="curNoteToHTML"
							></VueEditor>
					</v-tab-item>
					<v-tab-item>
						<SimpleMDE></SimpleMDE>
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
	import Marked from 'marked'
	import {VueEditor} from 'vue2-editor'
	import Showdown from 'showdown'
	import SimpleMDE from '@/components/parts/SimpleMDE'

	const showdown = new Showdown.Converter()

	const FANCY_MODE = 0, MARKDOWN_MODE = 1
	//var HTMLToMarkdown = new TurnDown({headingStyle: "atx", codeBlockStyle: "indent"})

	export default {
  	name: 'home',
		data: () => ({
			favorites: [0, 2],
			notes: [],
			simplemde: null,
			selected_note_index: null,
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
			HTMLToMarkdown(html) {
				return Breakdance(html)
			},
			cleanMarkdown(markdown) {
				markdown = markdown.replace(/\<\/?p\>/g, "").replace(/<br>/g, "\n")
				return markdown
			}
		},
		computed: {
			curNote() {
				return this.notes[this.selected_note_index]
			},
			curNoteToHTML() {
				//return this.curNote.text
				return showdown.makeHtml(this.curNote.text)
			},
		},
		components: {
			VueEditor,
			SimpleMDE
		},
		created() {
			this.notes =require('../../dummy/notes.json');
		},
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
