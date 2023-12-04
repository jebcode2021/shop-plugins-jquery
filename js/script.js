$(document).ready(function () {
    $('#carousel-imagens').slick({
        //dots: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });
    $('.menu-hamburguer').click(function () {
        $('nav').slideToggle();
    });

    $('#telefone').mask('(00) 0000-0000');
    $('#cpf').mask('000.000.000-00', { reverse: true });
    $('#cep').mask('00000-000');

    $('form').validate({
        rules: {
            nome: {
                required: true,
                minlength: 3
            },
            telefone: {
                required: true,
                minlength: 14
            },
            cpf: {
                required: true,
                minlength: 14
            },
            cep: {
                required: true,
                minlength: 9
            },
            veiculo: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            mensagem: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            nome: {
                required: 'Por favor, digite seu nome',
                minlength: 'O campo nome deve ter no mínimo 3 caracteres'
            },
            telefone: {
                required: 'O campo telefone é obrigatório',
                minlength: 'O campo telefone deve ter no mínimo 14 caracteres'
            },
            cpf: {
                required: 'O campo CPF é obrigatório',
                minlength: 'O campo CPF deve ter no mínimo 14 caracteres'
            },
            cep: {
                required: 'O campo CEP é obrigatório',
                minlength: 'O campo CEP deve ter no mínimo 9 caracteres'
            },
            veiculo: {
                required: 'O campo veículo é obrigatório'
            },
            email: {
                required: 'O campo e-mail é obrigatório',
                email: 'Digite um e-mail válido'
            },
            mensagem: {
                required: 'O campo mensagem é obrigatório',
                minlength: 'O campo mensagem deve ter no mínimo 10 caracteres'
            }
        },
        submitHandler: function (form) {
            alert('Formulário enviado com sucesso!');
        },
        invaldHandler: function (event, validator) {
            let camposIncorretos = validator.numberOfInvalids();
            if (camposIncorretos) {
                alert(`Existem ${camposIncorretos} campos incorretos`);
            }
        }
    });

    $('.lista-veiculos button').click(function () {
        const destino = $('#contato');
        const nomeVeiculo = $(this).parent().find('h3').text();
        const nomeVeiculoOption = $('#veiculo-interesse option');
        const valorVeiculo = $(this).parent().find('strong').text();

        nomeVeiculoOption.each(function () {
            if ($(this).text() === nomeVeiculo) {
                $(this).attr('selected', true);
            } else {
                $(this).attr('selected', false);
            }
        });

        $('#valor').val(valorVeiculo);

        $('html').animate({
            scrollTop: destino.offset().top
        }, 1000);
    });

});


$(function () {
    // MASK
    var cellMaskBehavior = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        },
        cellOptions = {
            onKeyPress: function(val, e, field, options) {
                field.mask(cellMaskBehavior.apply({}, arguments), options);
            }
        };

    // SEARCH ZIPCODE
    $('.busca_cep').blur(function () {
        function limpar() {
            $(".rua").val("");
            $(".bairro").val("");
            $(".cidade").val("");
            $(".estado").val("");
            $(".ibge").val("");
            $(".numero").val("");
        }

        var zip_code = $(this).val().replace(/\D/g, '');
        var validate_zip_code = /^[0-9]{8}$/;

        if (zip_code != "" && validate_zip_code.test(zip_code)) {
            $(".rua").val("");
            $(".bairro").val("");
            $(".cidade").val("");
            $(".estado").val("");
            $(".ibge").val("");
            $(".numero").val("");


            $.getJSON("https://viacep.com.br/ws/" + zip_code + "/json/?callback=?", function (data) {
                if (!("erro" in data)) {
                    $(".rua").val(data.logradouro);
                    $(".bairro").val(data.bairro);
                    $(".cidade").val(data.localidade);
                    $(".estado").val(data.uf);
                    $(".ibge").val(data.ibge);
                    $(".numero").focus();
                } else {
                    limpar();
                    ModalCepNaoEncontrado();
                }
            });
        }else {
            limpar();
            ModalCepInvalido();
        }
    });

});

function ModalCepNaoEncontrado(){
    var erro  = document.getElementById("cepNaoEncontrado");
    erro.style.display = 'block';
    erro.style.marginTop = '-1px';
    erro.style.marginLeft = '1px';
}

function ModalCepInvalido(){
    var erro  = document.getElementById("cepInvalido");
    erro.style.display = 'block';
    erro.style.marginTop = '-1px';
    erro.style.marginLeft = '1px';
}

function fMasc(objeto,mascara) {
    obj=objeto
    masc=mascara
    setTimeout("fMascEx()",1)
}
function fMascEx() {
    obj.value=masc(obj.value)
}
function mTel(tel) {
    tel=tel.replace(/\D/g,"")
    tel=tel.replace(/^(\d)/,"($1")
    tel=tel.replace(/(.{3})(\d)/,"$1)$2")
    if(tel.length == 9) {
        tel=tel.replace(/(.{1})$/,"-$1")
    } else if (tel.length == 10) {
        tel=tel.replace(/(.{2})$/,"-$1")
    } else if (tel.length == 11) {
        tel=tel.replace(/(.{3})$/,"-$1")
    } else if (tel.length == 12) {
        tel=tel.replace(/(.{4})$/,"-$1")
    } else if (tel.length > 12) {
        tel=tel.replace(/(.{4})$/,"-$1")
    }
    return tel;
}
function mCEP(cep){
    cep=cep.replace(/\D/g,"")
    cep=cep.replace(/^(\d{2})(\d)/,"$1.$2")
    cep=cep.replace(/\.(\d{3})(\d)/,".$1-$2")
    return cep
}


function is_cpf(c) {

    if ((c = c.replace(/[^\d]/g, "")).length != 11)
        return false

    if (c == "00000000000")
        return false;

    var r;
    var s = 0;

    for (i = 1; i <= 9; i++)
        s = s + parseInt(c[i - 1]) * (11 - i);

    r = (s * 10) % 11;

    if ((r == 10) || (r == 11))
        r = 0;

    if (r != parseInt(c[9]))
        return false;

    s = 0;

    for (i = 1; i <= 10; i++)
        s = s + parseInt(c[i - 1]) * (12 - i);

    r = (s * 10) % 11;

    if ((r == 10) || (r == 11))
        r = 0;

    if (r != parseInt(c[10]))
        return false;

    return true;
}


cpfCheck = function (el) {
    document.getElementById('cpfResponse').innerHTML = is_cpf(el.value) ? '<a href="#" class="btn btn-verde"><i class="fas fa-check"></i> CPF Válido </a>' : '<a href="#" class="btn btn-vermelho"><i class="fas fa-times-circle"></i> CPF inválido</a>';
    if (el.value == '') document.getElementById('cpfResponse').innerHTML = '';
}

function fecharMsg() {
    $(".box-modal ").hide();
}
