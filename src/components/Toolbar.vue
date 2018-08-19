<template>
<v-toolbar id="vibrato-toolbar" height="50" color="blue" dark app absolute clipped-left flat>
	<img id="logo" src="../assets/logo3.svg">
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
	<v-menu offset-y left>
		<v-btn flat slot="activator" dark>Doug<v-icon right>account_box</v-icon></v-btn>
		<v-card>
			<v-list>
				<v-list-tile>
					<v-list-tile-action>
						<v-switch v-model="darkmode" @change="darkmode"></v-switch>
					</v-list-tile-action>
					<v-list-tile-content>
						Dark Theme
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-card>
	</v-menu>
</v-toolbar>
</template>

<script>
export default {
  name: 'Nav',
	data: () => ({
		drawer: null,
		darkmode: false
	}),
  props: {
    msg: String
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
