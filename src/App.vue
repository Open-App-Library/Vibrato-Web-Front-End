<template>
<v-app id="inspire">
	<Sidebar></Sidebar>
	<Toolbar></Toolbar>
	<v-content>
		<v-container fluid>

		</v-container>
	</v-content>
</v-app>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Toolbar from '@/components/Toolbar.vue'
export default {
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
