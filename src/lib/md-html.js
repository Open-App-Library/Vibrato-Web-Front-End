import Marked from 'marked'
import TurnDown from 'turndown'

var td = new TurnDown({
	headingStyle  : "atx",
	codeBlockStyle: "fence"
})

export default {
	md2html: (md) => {
		return Marked(md)
	},
	html2md: (html) => {
		return td.turndown(html)
	}
}

