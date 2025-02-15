document.addEventListener('DOMContentLoaded', function() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwTasGB6Eblzv9GnjhZkV8TxRjt9NsGi2aL5ncHUPvTtzfSjXUvimtkAqXpQz5CePeuXw/exec';
    const form = document.forms['cad-register'];

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o envio imediato do formulário
        
        const button = document.getElementById('confirm');
        button.disabled = true;
        button.classList.add('loading');

        // Verifica se o reCAPTCHA foi carregado corretamente
        if (typeof grecaptcha !== "undefined") {
            grecaptcha.ready(function() {
                grecaptcha.execute('6Lc1By0qAAAAAApJvUCzjlOaZJdS23R2gaiL7BWY', {action: 'submit'}).then(function(token) {
                    console.log("Token gerado:", token); // Debug: Exibe o token gerado no console
                    
                    let recaptchaResponse = document.createElement('input');
                    recaptchaResponse.setAttribute('type', 'hidden');
                    recaptchaResponse.setAttribute('name', 'g-recaptcha-response');
                    recaptchaResponse.setAttribute('value', token);
                    form.appendChild(recaptchaResponse);

                    // Simula o tempo de exibição "Enviando..." de 10 segundos
                    setTimeout(function() {
                        // Envia o formulário após 5 segundos de espera
                        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
                            .then(response => {
                                alert("Você está Cadastrado. > Acesse o grupo a seguir e se mantenha atualizado!");
                                window.location.replace("https://chat.whatsapp.com/Hp3UISJ76NP7igiLg961y2");
                            })
                            .catch(error => console.error('Error!', error.message))
                            .finally(() => {
                                button.disabled = false;
                                button.classList.remove('loading');
                            });
                    }, 5000); // Tempo de envio de formulário (5 segundos)
                });
            });
        } else {
            console.error("grecaptcha não foi definido. Verifique se o script do reCAPTCHA foi carregado corretamente.");
            button.disabled = false;
            button.classList.remove('loading');
        }
    });

    // Formatação do campo de telefone
    document.getElementById('phone').addEventListener('input', function (event) {
        let inputValue = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        inputValue = inputValue.substring(0, 11); // Limita a 11 caracteres (9 dígitos + 2 pontos)

        if (inputValue.length > 10) {
            inputValue = inputValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (inputValue.length > 6) {
            inputValue = inputValue.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else if (inputValue.length > 2) {
            inputValue = inputValue.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        }

        event.target.value = inputValue;
    });
});
