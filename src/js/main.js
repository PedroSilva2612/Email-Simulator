document.addEventListener('DOMContentLoaded', function() {
    
    const email = {
        email : '',
        asunto : '',
        mensaje : ''
    }

    // Variables

    const inputEmail = document.querySelector('#email')
    const inputAsunto = document.querySelector('#asunto')
    const inputMensaje = document.querySelector('#mensaje')
    const btnEnviar = document.querySelector('#btnEnviar')
    const btnBorrar = document.querySelector('#btnBorrar')
    const formulario = document.querySelector('#formulario')
    const spinner = document.querySelector('#spinner')

    // Asignar Eventos

    inputEmail.addEventListener('blur', validar)
    inputAsunto.addEventListener('blur', validar)
    inputMensaje.addEventListener('blur', validar)

    formulario.addEventListener('submit', enviarEmail)

    btnBorrar.addEventListener('click', e => {
        e.preventDefault()

        resetFormulario()
    })

    function enviarEmail(e) {
        e.preventDefault()

        spinner.classList.remove('hidden')

        setTimeout(() => {
            spinner.classList.add('hidden')

            resetFormulario()

            // Crear una alerta
            const alertaExito = document.createElement('p')
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded', 'mt-5')
            alertaExito.textContent = 'Mensaje enviado correctamente'

            formulario.appendChild(alertaExito)

            setTimeout(() => {
                alertaExito.remove()
            }, 3000)
        }, 2000)
    }

    // Funciones

    function validar(e) {
        if( e.target.value.trim() === '' ) {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement)
            email[e.target.id] = ''
            comprobarEmail()
            return
        }

        if( e.target.id === 'email' && !validarEmail(e.target.value) ) {
            mostrarAlerta('El email no es válido', e.target.parentElement)
            email[e.target.id] = ''
            comprobarEmail()
            return
        }

        limpiarAlerta(e.target.parentElement)

        // Asignar los valores a nuestro objeto de email
        email[e.target.id] = e.target.value.trim().toLowerCase()

        // Comprobar el objeto de email
        comprobarEmail()
    }

    function mostrarAlerta(mensaje, referencia) {

        limpiarAlerta(referencia)

        // Generar alerta en HTML
        const error = document.createElement('p')
        error.textContent = mensaje
        error.classList.add('bg-red-600', 'p-2', 'mt-2', 'text-center', 'rounded' )
        
        // Inyectar el error al formulario
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia) {
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600')
        if( alerta ) {
            alerta.remove()
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email)
        return resultado
    }

    function comprobarEmail() {
        if( Object.values(email).includes('') ) {
            btnEnviar.classList.add('opacity-50')
            btnEnviar.classList.remove('transition-colors', 'duration-500', 'hover:bg-gray-700')
            btnEnviar.disabled = true
            return
        } 

        btnEnviar.classList.remove('opacity-50')
        btnEnviar.classList.add('transition-colors', 'duration-500', 'hover:bg-gray-700')
        btnEnviar.disabled = false
    }

    function resetFormulario() {
        // Reiniciar el formulario
        email.email = '',
        email.asunto = '',
        email.mensaje = ''

        formulario.reset()
        
        comprobarEmail()
    }

})