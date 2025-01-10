class ValidCPF {
  constructor(cpfSent) {
    Object.defineProperty(this, 'cpfClean', {
      value: cpfSent.replace(/\D+/g, '')
    })
  }

  itASequence() {
    return this.cpfClean.charAt(0).repeat(11) === this.cpfClean
  }

  generatesNewCpf () {
    const cpfNoDigits = this.cpfClean.slice(0, -2)
    const digit1 = ValidCPF.generatesNewDigit(cpfNoDigits)
    const digit2 = ValidCPF.generatesNewDigit(cpfNoDigits + digit1)
    this.newCPF = cpfNoDigits + digit1 + digit2
  }

  static generatesNewDigit(cpfNoDigits) {
    let total = 0
    let reverse = cpfNoDigits.length + 1 // Sequência decrescente (10 para o 1º dígito, 11 para o 2º)

    for(let stringNumber of cpfNoDigits) {
      total += reverse * Number(stringNumber)
      reverse--
    }

    const digit = 11 - (total % 11)
    return digit <= 9 ? String(digit) : '0'
  }

  
  valid() {
    if(!this.cpfClean) return false
    if(typeof this.cpfClean !== 'string') return false
    if(this.cpfClean.length !== 11) return false
    if(this.itASequence()) return false
    this.generatesNewCpf()

    return this.newCPF === this.cpfClean
  }
  
}

// const validcpf = new ValidCPF('070.987.720-03')
// if (validcpf.valid()) {
//   console.log('CPF válido')
// } else {
//   console.log('CPF inválido')
// }