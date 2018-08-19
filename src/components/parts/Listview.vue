<template>
<div class="list-view">
	<v-list>
		<v-list-tile v-for="item in items" :to="item.href ? item.href : ''">
			<v-list-tile-action>
				<v-icon>{{item.icon}}</v-icon>
			</v-list-tile-action>
			<v-list-tile-content>
				<v-list-tile-title>{{item.name}}</v-list-tile-title>
			</v-list-tile-content>
		</v-list-tile>
	</v-list>
</div>
</template>

<script>
export default {
  name: 'Treeview',
	props: ['items'],
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
		},
		shouldShow(model_name) {
			if (model_name == "ROOT") {
				return true
			} else if (this.open) {
				return true
			} else {
				return false
			}
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

</style>
