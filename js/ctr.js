class formatOperation {
    constructor(str_ = '') {
        this.opr = str_;
        this.signs = ['+', '-', '*', '/', '%']
    }

    add(item) {
        this.opr += item
    }
    
    exp(expresion) {
        this.vfy();
        let lv = this.opr.length-1
        let isSign = this.signs.includes(expresion);
        if (this.opr[lv] == ')' && !isSign) {
            this.add('*');
            this.add(expresion);
        }
        else { this.add(expresion); }
    }

    sgn() {
        this.vfy();
        let lv = this.opr.length-1
        if (isNaN(this.opr[lv])) {
            this.add('(')
            this.add('-')
        }
        else {
            this.add('*')
            this.add('(')
            this.add('-')
        }
    }

    brc() {
        this.vfy();
        let openb = 0;
        let closeb = 0;
        let lv = this.opr.length-1
        this.opr.split('').forEach(e=> {
            openb += (e === '(') ? 1 : 0;
            closeb += (e === ')') ? 1 : 0;
        });
        if (openb > closeb) {
            if (this.opr[lv] == '(') { this.add('('); }
            else {
                if (this.opr[lv] == '*' || this.opr[lv] == '/') { this.add('('); }
                else { this.add(')'); }
            }
        }
        else {
            if (this.opr === '' || this.signs.includes(this.opr[lv])) { this.add('('); }
            else {
                if (this.opr[lv] == '.') { this.add('0'); }
                this.add('*'); 
                this.add('('); 
            }
        }
    }

    vfy() {
        if (this.opr == 'Infinity') { this.opr = '';}
    }
}

class Calculator {
    constructor() {
        this.operation = new formatOperation();
        this.output = document.getElementById('output');
        this.lastOutput = document.getElementById('last-output');
    }

    clear(mode) {
        this.operation.opr = (mode == 'a') ? '': (mode == 'd') ? this.operation.opr.slice(0, -1) : '';
        this.update();
    }
    
    write(l) {
        this.operation.exp(l);
        this.update();
    }
   
    brackets() {
        this.operation.brc();
        this.update(); 
    }

    sign() {
        this.operation.sgn();
        this.update();
    }

    equal() {
        let result = eval(this.operation.opr);
        if (typeof result === "undefined" || isNaN(result) || result === null) {
            return "";
        }
        this.lastOutput.innerHTML = `-${result}`
        this.operation.opr = result.toString();
        this.update();
    }

    update() {
        this.output.value = this.operation.opr;
    }

}

const calculator = new Calculator();
const spts = document.querySelectorAll('.spt');
const alc = document.querySelector('.alc');
const brc = document.querySelector('.brc');
const sgn = document.querySelector('.sgn');
const equ = document.querySelector('.equ');
const del = document.getElementById('backspace');
spts.forEach(stp=> {
    stp.addEventListener('click', ()=> {
        calculator.write(stp.getAttribute('btn'));
    });
});

alc.addEventListener('click', ()=> {
    calculator.clear('a');
});

del.addEventListener('click', ()=> {
    calculator.clear('d');
});

brc.addEventListener('click', ()=> {
    calculator.brackets();
});

sgn.addEventListener('click', ()=> {
    calculator.sign();
});

equ.addEventListener('click', ()=> {
    try {
        calculator.equal();
    }
    catch (e) {
        console.log(`error: ${e}`);
        calculator.output.classList.add('error');
        calculator.output.classList.remove('typing');
        setTimeout(()=> {
            calculator.output.classList.add('typing');
            calculator.output.classList.remove('error');
        }, 500)
    }
});

calculator.output.addEventListener('input', ()=> {
    calculator.operation.opr = calculator.output.value;
});