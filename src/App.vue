<template>
<v-app :dark="$root.darkmode" id="inspire">
	<Sidebar></Sidebar>
	<Toolbar></Toolbar>
	<v-content>
		<router-view :key="$route.path"></router-view>
	</v-content>
</v-app>
</template>

<script>
import Sidebar from '@/components/ui/Sidebar.vue'
import Toolbar from '@/components/ui/Toolbar.vue'
export default {
	data() {
		return {
			title: "Hello"
		}
	},
	components: {
		Sidebar,
		Toolbar,
	}
}
</script>

<style lang="sass">
#keep main .container
	height: 660px
.v-navigation-drawer__border
	display: none
.text
	font-weight: 400
</style>
