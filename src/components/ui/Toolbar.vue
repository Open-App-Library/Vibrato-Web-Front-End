<template>
<v-toolbar id="vibrato-toolbar" height="50" color="blue" dark app absolute clipped-left flat>
	<img id="logo" src="../../assets/logo.svg">
	<v-spacer></v-spacer>
	<v-text-field
		solo-inverted
		flat
		hide-details
		label="Search notes, notebooks, and tags"
		prepend-inner-icon="search"
		height="30"
		clearable
		></v-text-field>
	<v-spacer></v-spacer>

	<div class="text-xs-center">
		<v-menu
			:close-on-content-click="false"
			:nudge-width="300"
			offset-x
			
		>
			<v-btn flat slot="activator" dark>Doug<v-icon right>account_box</v-icon></v-btn>

			<v-card>
				<v-list>
					<v-list-tile avatar>
						<v-list-tile-avatar>
							<img src="https://pbs.twimg.com/profile_images/738444461156487168/aWOiX5-Q_400x400.jpg" alt="John">
						</v-list-tile-avatar>

						<v-list-tile-content>
							<v-list-tile-title>Doug Beney</v-list-tile-title>
							<v-list-tile-sub-title>Founder of Vibrato Notes</v-list-tile-sub-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>

				<v-divider></v-divider>

				<v-list>
					<TileToggle label="Dark Mode" v-model="$root.darkmode"></TileToggle>
					<TileToggle label="Compact Mode" v-model="$root.compactmode"></TileToggle>
				</v-list>
			</v-card>
		</v-menu>
	</div>

	<!-- <v-menu offset-y left> -->
	<!-- 	<v-btn flat slot="activator" dark>Doug<v-icon right>account_box</v-icon></v-btn> -->
	<!-- 	<v-card> -->
	<!-- 		<v-list> -->
	<!-- 			<TileToggle label="Dark Mode" v-model="$root.darkmode"></TileToggle> -->
	<!-- 			<TileToggle label="Compact Mode" v-model="$root.compactmode"></TileToggle> -->
	<!-- 		</v-list> -->
	<!-- 	</v-card> -->
	<!-- </v-menu> -->
</v-toolbar>
</template>

<script>
import TileToggle from '@/components/parts/TileToggle'
export default {
	name: 'Nav',
	data: () => ({
		drawer: null,
		test: true
	}),
	props: {
		msg: String
	},
	methods: {

	},
	components: {
		TileToggle
	},
	created() {
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
#vibrato-toolbar
	img#logo
		max-height: 38px
		padding: 5px 0
		opacity: 0.8
		transition: 100ms ease-in
		&:hover
			opacity: 1.0
			cursor: pointer
	// Make sure searchbar respects navbar height
	.v-text-field.v-text-field--solo .v-input__control
		min-height: 35px

</style>
