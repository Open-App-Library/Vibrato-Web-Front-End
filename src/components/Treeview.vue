<template>
<div class="tree-view">
	<li>
		<div
			:class="{bold: isFolder}"
			>
			<v-list-tile v-if="model.name != 'ROOT'" @click=""> <!-- Click This To Access Node -->
				<v-list-tile-action>
					<v-btn v-if="isFolder" @click="toggle" flat icon>
						<v-icon>keyboard_arrow_down</v-icon>
					</v-btn>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title class="grey--text">
						{{model.name}}
					</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
		</div>
		<ul v-show="open" :class="{root_ul: model.name == 'ROOT'}">
			<Treeview
				v-for="(model, index) in model.children"
				:key="index"
				:model="model">
			</Treeview>
		</ul>
	</li>
</div>
</template>

<script>
export default {
  name: 'Treeview',
	props: ['model'],
	data: () => ({
		open: true
	}),
	methods: {
		toggle() {
			if (this.isFolder) {
				this.open = !this.open
			}
		},
		changeType() {
			if (!this.isFolder) {
				this.model.children = []
				this.addChild()
				this.open = true
			}
		},
		addChild() {
			this.model.children.push({
				name: 'New Item'
			})
		}
	},
	computed: {
		isFolder() {
			return this.model.children && this.model.children.length
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.tree-view
	list-style: none
	padding: 8px 0
	ul.root_ul
		padding: 0
</style>
