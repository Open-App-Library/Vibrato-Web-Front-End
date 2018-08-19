<template>
<v-navigation-drawer
	id="vibrato-sidebar"
	enable-resize-watcher
	fixed
	permanent
	clipped
	class="grey lighten-4"
	app
	>
	<v-list
		dense
		class="grey lighten-4"
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

			<v-list-tile v-else :key="i" @click="">
				<v-list-tile-action>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title class="grey--text">
						{{ item.text }}
					</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
		</template>
	</v-list>
</v-navigation-drawer>

</template>

<script>
import Treeview from '@/components/Treeview.vue'
export default {
	name: 'Sidebar',
	created() {
		this.layout = [
			{ icon: 'notes', text: 'All Notes' },
			{ divider: true },
			{ heading: 'Notebooks' },
			{ treeview: true,
				data: this.notebooks
			},
			{ icon: 'add', text: 'Create new notebook' },
			{ divider: true },
			{ heading: 'Tags' },
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
					name: "First Child"
				},
				{
					name: "Second child",
					children: [
						{
							name: "child of second"
						},
						{
							name: "child2 of second"
						}
					]
				}
			]
		}
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
		}
	},
	components: {
		Treeview
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
#vibrato-sidebar
	padding-top: 16px
</style>
