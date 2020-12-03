import * as fs from 'fs';
import * as path from 'path';
const file = path.resolve(__dirname, './input.txt');
const lines = fs.readFileSync(file).toString().split('\n');
// console.log(lines);

class Entry {
	min: number;
	max: number;
	char: string;
	password: string;

	constructor(input: string){
		let [policy, password] = input.split(':');
		password = password.substring(1);
	
		const [minMax, char] = policy.split(' ');
		const [min, max] = minMax.split('-').map(s => parseInt(s));
	
		this.min = min;
		this.max = max;
		this.char = char;
		this.password = password;
	}
	
	getCharCountInPassword(){
		const regex = new RegExp(this.char, 'g');
		return this.password.match(regex)?.length || 0;
	}

	isPasswordValidPart1(){
		const count = this.getCharCountInPassword();
		return count >= this.min && count <= this.max;
	}
	
	isPasswordValidPart2(){
		const index1 = this.min - 1;
		const index2 = this.max - 1;
		const inIndex1 = this.password.charAt(index1) === this.char;
		const inIndex2 = this.password.charAt(index2) === this.char;
		// XOR
		return inIndex1 != inIndex2;
	}
}
const entries = lines.map(line => new Entry(line));

let countPart1 = 0;
let countPart2 = 0
for(let entry of entries){
	if(entry.isPasswordValidPart1()) countPart1++;
	if(entry.isPasswordValidPart2()) countPart2++;
}

console.log('valid passwords part 1:', countPart1);
console.log('valid passwords part 1:', countPart2);
