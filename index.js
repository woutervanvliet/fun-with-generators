const sleep = (time = 300) => new Promise(resolve => setTimeout(resolve, time))
async function* something() {
	let counter = 0
	while(counter < 10) {
		counter = yield `item${counter}`
		await sleep()
	}
}

function* idMaker() {
	var index = 0;
	while (index < 2)
		yield index++;

	return 'done'
}

(async function main() {

	const iterator = something()

	let counter = 0
	for(let item = { done: false }; item.done === false;) {
		item = await iterator.next(counter++)
		console.log('got', { item })
	}
}())
	.then((r) => console.log(r))
	.catch((e) => console.log(e))
