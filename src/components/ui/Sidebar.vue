<template>
<v-navigation-drawer
	id="vibrato_sidebar"
	enable-resize-watcher
	clipped
	:class="$root.chooseClasses('grey lighten-4')"
	app
	v-model="$root.show_sidebar"
	>
	<v-list
		dense
		:class="$root.chooseClasses('grey lighten-4')"
		>
		<div v-for="(item, i) in layout" :key="i">
			<v-layout v-if="item.heading" row align-center>
				<v-flex xs6>
					<v-subheader v-if="item.heading">
						{{ item.heading }}
					</v-subheader>
				</v-flex>
				<v-flex v-if="!item.hide_btn" xs6 class="text-xs-right">
					<v-btn small flat :to="item.href">View All</v-btn>
				</v-flex>
			</v-layout>

			<v-divider v-else-if="item.divider" dark class="my-3"></v-divider>

			<NotebookTree :is_root="true" v-else-if="item.notebooktree" :notebookObject="$root.notebooks"></NotebookTree>
			<Tagview v-else-if="item.tagview" :tags="item.data"></Tagview>

			<v-list-tile v-else-if="item.actionButton" @click="item.action">
				<v-list-tile-action>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title class="$root.chooseClasses('grey--text text--darken-2')">
						{{ item.text }}
					</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>

			<v-list-tile v-else :to="item.href ? item.href : ''">
				<v-list-tile-action>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title class="$root.chooseClasses('grey--text text--darken-2')">
						{{ item.text }}
					</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
		</div>
	</v-list>
</v-navigation-drawer>

</template>

<script>
import NotebookTree from '@/components/parts/NotebookTree.vue'
import Tagview from '@/components/parts/Tagview.vue'

export default {
	name: 'Sidebar',
	data: () => ({
		layout: [],
	}),
	methods: {
		setURLs(base_url, items) {
			// create URL 
			for (var i in items) {
				items[i].href=base_url + items[i].id + "/"
				if (items[i].children) {
					this.setURLs(base_url, items[i].children)
				}
			}
		},
		newNote() {
			let curPage = this.$route.name
			let params  = this.$route.params
			let new_note = {
				title: "Untitled Note",
				shared_with: null,
				is_favorited: false,
				notebook: null,
				tags: []
			}
			switch (curPage) {
				case "favorites":
					new_note.is_favorited = true
					break
				case "single-notebook":
					new_note.notebook = params.notebook_id
					break
				case "single-tag":
					new_note.tags.push(params.tag_id)
					break
				default:
					if (curPage != "all-notes") {
						// If user is not already on the all-notes page, go to the all-notes page
						this.$router.push("/")
					}
					break
			}
			new_note = this.$root.saveNote(new_note)
			this.$root.notes.unshift(new_note)
		}
	},
	computed: {

	},
	components: {
		NotebookTree,
		Tagview
	},
	created() {
		this.layout = [
			{ actionButton: true, icon: 'edit', text: 'Create New Note', action: this.newNote },
			{ divider: true },
			{ icon: 'notes', text: 'All Notes', href: "/"},
			{ icon: 'star', text: 'Favorites', href: "/favorites"},
			{ divider: true },
			{ heading: 'Notebooks', href: "/notebooks", hide_btn: true },
			{ notebooktree: true, data: this.$root.notebooks },
			{ icon: 'add', text: 'Create new notebook' },
			{ divider: true },
			{ heading: 'Tags' },
			{ tagview: true, data: this.$root.tags },
			{ icon: 'add', text: 'Create new tag' },
			{ divider: true },
			{ icon: 'delete', text: 'Trash', href: '/trash' },
			{ divider: true },
			{ icon: 'settings', text: 'Settings' },
			{ icon: 'help', text: 'Support' },
			{ icon: 'phonelink', text: 'Download the App!' },
			{ icon: 'keyboard', text: 'Keyboard shortcuts' }
		]
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
#vibrato_sidebar
	padding-top: 16px
	overflow-y: hidden
	&:hover
		overflow-y: scroll
</style>
