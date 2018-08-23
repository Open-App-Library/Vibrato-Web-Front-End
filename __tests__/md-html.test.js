import {file} from './helper-funcs'
import mdhtml from '../src/lib/md-html'


test('Markdown -> HTML -> Markdown', () => {
	var dummy = file('dummy/example-markdown.md')
	var html = mdhtml.md2html(dummy)
	var new_md = mdhtml.html2md(html)
	expect(dummy == new_md).toBeTruthy()
})
