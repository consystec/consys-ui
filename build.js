const fs = require('fs');

const package = JSON.parse(fs.readFileSync('./package.json').toString());
let vIndex;

switch (process.argv[2]) {
	case 'new':
		vIndex = 0;
		break;
	case 'evo':
		vIndex = 1;
		break;
	case 'bug':
		vIndex = 2;
		break;
	default:
		if (process.argv[2]) {
			throw `${process.argv[2]} não é um parâmetro de versão válido`;
		}

		throw 'Parâmetro de versão não encontrado';
}

package.version = package.version.split('.').map((el, i) => {
	const item = parseInt(el);

	if (vIndex > i) {
		return item;
	} else if (vIndex < i) {
		return 0;
	}

	return item + 1;
}).join('.');

fs.writeFileSync('./package.json', JSON.stringify(package, null, 2));

console.log(`Package alterado para versão: ${package.version}`);