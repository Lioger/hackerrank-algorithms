class StringTransform {
    constructor (string) {
        this.string = string;
    }
  
    getCharacterCount = (character) => this.string.split(character).length - 1;
  
    getRandomElOfArray = (array) => array[Math.floor(Math.random() * array.length)];
  
    getBracketsList = () => {
        let brackets = [];
        for (let i = 0; i < this.string.length; i++) {
            if (this.string[i] === '{') {
                brackets.push({ type: '{', index: i });
            } else if (this.string[i] === '}') {
                brackets.push({ type: '}', index: i });
            };
        };
        return brackets;
    }
  
    mutateString() {
        const brackets = this.getBracketsList().reverse();
        if (!brackets.length) {
            return
        } else {
            brackets.forEach((bracket, i) => {
                if (bracket.type === '}' && brackets[i + 1].type === '{') {
                    const string = this.getRandomElOfArray(this.string.slice(brackets[i + 1].index + 1, bracket.index).split('|'));
                    this.string = this.string.slice(0, brackets[i + 1].index)+string+this.string.slice(bracket.index + 1);
                };
            });
            this.mutateString();
        }
    }
  
    parseString() {
        const openBracketsCount = this.getCharacterCount('{')
        const closeBracketsCount = this.getCharacterCount('}')
        if (openBracketsCount !== closeBracketsCount) {
            console.log('Invalid input data')
            return
        }
  
        this.mutateString()
        console.log(this.string)
        return this.string
    }
}
  
const example = 'Table {is {red|blue|orange|white|green-{yellow|black}}|has {{twenty|thirty} two|{{two hundred and |three hundred and }forty |fifty }three|four} legs} and is placed {in a corner|in the middle} of the office and the {printer|phone} is {{gray-|}black|white}.';
  
const stringTransformer = new StringTransform(example);
const parsedString = stringTransformer.parseString();