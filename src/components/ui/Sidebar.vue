<template>
<v-navigation-drawer
	id="vibrato-sidebar"
	enable-resize-watcher
	fixed
	permanent
	clipped
	:class="$root.chooseClasses('grey lighten-4')"
	app

	>
	<v-list
		dense
		:class="$root.chooseClasses('grey lighten-4')"

		>
		<template v-for="(item, i) in layout">
			<v-layout v-if="item.heading" :key="i" row align-center>
				<v-flex xs6>
					<v-subheader v-if="item.heading">
						{{ item.heading }}
					</v-subheader>
				</v-flex>
				<v-flex xs6 class="text-xs-right">
					<v-btn small flat>View All</v-btn>
				</v-flex>
			</v-layout>
			
			<v-divider v-else-if="item.divider" :key="i" dark class="my-3"></v-divider>

			<Treeview v-else-if="item.treeview" :model="item.data"></Treeview>
			<Listview v-else-if="item.listview" :items="item.data"></Listview>

			<v-list-tile v-else :key="i" :to="item.href ? item.href : ''">
				<v-list-tile-action>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title class="$root.chooseClasses('grey--text text--darken-2')">
						{{ item.text }}
					</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
		</template>
	</v-list>
</v-navigation-drawer>

</template>

<script>
import Treeview from '@/components/parts/Treeview.vue'
import Listview from '@/components/parts/Listview.vue'
export default {
	name: 'Sidebar',
	created() {
		this.layout = [
			{ icon: 'notes', text: 'All Notes', href: "/"},
			{ divider: true },
			{ heading: 'Notebooks' },
			{ treeview: true, data: this.notebooks },
			{ icon: 'add', text: 'Create new notebook' },
			{ divider: true },
			{ heading: 'Tags' },
			{ listview: true, data: this.tags },
			{ icon: 'add', text: 'Create new tag' },
			{ divider: true },
			{ icon: 'delete', text: 'Trash' },
			{ divider: true },
			{ icon: 'settings', text: 'Settings' },
			{ icon: 'help', text: 'Support' },
			{ icon: 'phonelink', text: 'Download the App!' },
			{ icon: 'keyboard', text: 'Keyboard shortcuts' }
		]
	},
	data: () => ({
		layout: [],
		notebooks: {
			name: 'ROOT',
			children: [
				{
					name: "Business Ideas", href: "/notebook/1",
				},
				{
					name: "Recipes", href: "/notebook/2",
					children: [
						{
							name: "Breakfasts", href: "/notebook/3",
						},
						{
							name: "Lunches", href: "/notebook/4",
							children: [
								{
									name: "Chinese Lunches", href: "/notebook/5",
								},
								{
									name: "Italian Lunches", href: "/notebook/6",
								},
								{
									name: "American Lunches", href: "/notebook/7",
								},
							]
						}
					]
				},
				{
					name: "Journaling", href: "/notebook/8"
				},
				{
					name: "Research", href: "/notebook/9"
				},
				{
					name: "Drawings", href: "/notebook/10"
				},
				{
					name: "Wishlist", href: "/notebook/11"
				},
			]
		},
		tags: [
			{name: "2018", icon: "label", href: "/tag/1"},
			{name: "2017", icon: "label", href: "/tag/2"},
			{name: "2016", icon: "label", href: "/tag/3"},
			{name: "2015", icon: "label", href: "/tag/4"},
		]
	}),
	methods: {
		changebooks() {
			this.notebooks = {
				name: 'root',
				children: [
					{
						name: 'helllo'
					}
				]
			}
		},
	},
	computed: {

	},
	components: {
		Treeview,
		Listview
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
#vibrato-sidebar
	padding-top: 16px
</style>
