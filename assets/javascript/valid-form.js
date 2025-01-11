class ValidForm {
  constructor() {
    this.form = document.querySelector('.form')
    this.events()
  }

  events() {
    this.form.addEventListener('submit', e => {
      this.handleSubmit(e)
    })

    // Remove error messages dynamically as user types
    this.form.querySelectorAll('.validate').forEach(field => {
      field.addEventListener('input', () => {
        this.removeErrorOnInput(field)
      })
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const validFields = this.fieldAreValid()
    const passwordValid = this.passwordAreValid()

    if(validFields && passwordValid) {
      alert('form enviado')
    }
  }

  passwordAreValid() {
    let valid = true

    const password = this.form.querySelector('.password')
    const repeatPassword = this.form.querySelector('.repeat-password')

    if(password.value !== repeatPassword.value) {
      valid = false
      this.creatError(password, 'Campos senha e repetir senha precisa ser iguais')
      this.creatError(repeatPassword, 'Campos senha e repetir senha precisa ser iguais')
    }

    if(password.value.length < 6 || password.value.length > 12) {
      valid = false
      this.creatError(password, 'Senha precisa estar entre 6 a 12 caracteres')
    }

    return valid
  }

  fieldAreValid() {
    let valid = true

    for(let errorText of this.form.querySelectorAll('.error-text')) {
      errorText.remove()
    }

    for(let field of this.form.querySelectorAll('.validate')) {
      const label = field.previousElementSibling.innerText

      if(!field.value) {
        this.creatError(field, `Campo ${label} não pode estar em branco.`)
        valid = false
      }

      if(field.classList.contains('cpf')) {
        if(!this.validCPF(field)) valid = false
      }

      if(field.classList.contains('user')) {
        if(!this.validUser(field)) valid = false
      }
    }

    return valid
  }

  validCPF(field) {
    const cpf = new ValidCPF(field.value)

    if(!cpf.valid()) {
      this.creatError(field, 'CPF inválido')
      return false
    }
    return true
  }

  validUser(field) {
    const user = field.value
    let valid = true

    if(user.length < 3 || user.length > 12) {
      this.creatError(field, 'Usuário precisa ter entre 3 e 12 caracters')
      valid = false
    }

    if(!user.match(/^[a-zA-Z0-9]+$/g)) {
      this.creatError(field, 'Nome de usuário precisa conter apenas letras e/ou números')
      valid = false
    }
    return valid
  }

  creatError(field, msg) {
    // Avoid duplicate errors
    if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-text')) {
      return;
    }

    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    field.insertAdjacentElement('afterend', div);
  }

  removeErrorOnInput(field) {
    const error = field.nextElementSibling;
    
    // Check if the error is for CPF and if it's valid
    if (field.classList.contains('cpf')) {
      const cpf = new ValidCPF(field.value);
      if (cpf.valid()) {
        if (error && error.classList.contains('error-text')) {
          error.remove();
        }
      }
    } else {
      if (field.value && error && error.classList.contains('error-text')) {
        error.remove();
      }
    }
  }
}

const valid = new ValidForm()