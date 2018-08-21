<template>
	<textarea ref="area"></textarea>
</template>

<script>
import simplemde from 'simplemde'
import 'simplemde/dist/simplemde.min.css'

export default {
	props: ['value', 'isVisible'],
	mounted() {
		this.mde = new simplemde({
			element: this.$refs.area,
			toolbar: false,
			autosave: {
				enabled: false
			},
			spellChecker: false,
			status: false
		})

		this.mde.value(this.value)
		var self = this

		this.mde.codemirror.on('change', function() {
			self.$emit('input', self.mde.value())
		})
	},
	watch: {
		// this would update on every keystroke, so maybe you have to remove it.
		// component should work nonetheless, but if an external source changed the value, it would not reflect in this component.
		value(newVal) {
			if (newVal != this.mde.value()) {
				this.mde.value(newVal)
			}
		},
		isVisible(visible) {
			if (visible) {
				this.mde.codemirror.refresh()
			}
		}
	},
	beforeDestroy() {
		this.mde.toTextArea() // clean up when component gets destroyed.
	}
}
</script>
