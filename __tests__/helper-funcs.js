var fs = require('fs');

export function file(fname) {
	return fs.readFileSync(fname, 'utf8');
}
