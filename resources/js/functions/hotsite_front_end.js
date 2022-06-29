$(document).ready(() => {

  const sessionStorageKey = 'hfe_data';

  function handleInputChange() {
    var targetEl = document.querySelector(this.getAttribute('handle-preview-target'));
    var labelEl = document.querySelector(`label[for="${this.id}"]`);

    var title = labelEl.innerHTML;
    var value = this.value;

    if (value.trim().length === 0) {
      targetEl.innerHTML = '';
    } else {
      targetEl.innerHTML = `<b>${title}: </b>${value}`;
    }
  }

  // load data
  if (sessionStorage.getItem(sessionStorageKey)) {
    var data = JSON.parse(sessionStorage.getItem(sessionStorageKey));

    $('#certificado-form .ui.form input#name').val(data.name);
    $('#certificado-form .ui.form input#user_email').val(data.email);
    $('#certificado-form .ui.form input#phone').val(data.phone);
    $('#certificado-form .ui.form input#subject').val(data.subject);
    $('#certificado-form .ui.form textarea#message').val(data.message);

    $('[handle-preview-target]').each(handleInputChange);
    $('#certificado-form .ui.form .submit.button')[0].innerHTML = 'Atualizar dados';
  }

  // fields
  $('[handle-preview-target]').each(function () {
    this.oninput = handleInputChange;
  });

  // Form fields validation
  $('#certificado-form .ui.form')
    .form({
      fields: {
        name: {
          identifier: 'name',
          rules: [
            {
              type: 'empty',
              prompt: 'Por favor digite o seu nome'
            }
          ]
        },
        email: {
          identifier: 'email',
          rules: [
            {
              type: 'email',
              prompt: 'Por favor digite um e-mail válido'
            }
          ]
        },
        phone: {
          identifier: 'phone',
          rules: [
            {
              type: 'number',
              prompt: 'Por favor digite um telefone válido'
            },
            {
              type: 'minLength[10]',
              prompt: 'O telefone deve conter DDD + o número'
            }
          ]
        },
        subject: {
          identifier: 'subject',
          rules: [
            {
              type: 'empty',
              prompt: 'Por favor digite o assunto'
            }
          ]
        },
        message: {
          identifier: 'message',
          rules: [
            {
              type: 'empty',
              prompt: 'Por favor digite a mensagem'
            }
          ]
        },
      },
      onSuccess: function (event, fields) {
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(fields));

        window.navigation.reload();
        event.preventDefault();
      },
    });
});