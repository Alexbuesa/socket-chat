var params = new URLSearchParams(window.location.search);
var nombreUsuario = params.get('nombre');
var sala = params.get('sala');

// Referencias de jQuery
var divUsuarios = $('#tituloSala');
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');

/**
 * Función para montar la colimna de la izquierda del chat, que contiene los usuarios
 * Se crea la cabecera con el nombre de la sala
 * Con un for se recorren todas las personas y se añaden 
 * 
 * @param {*} personas 
 */
function renderizarUsuarios(personas) {

    console.log(personas);

    var html = '';

    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (var i = 0; i < personas.length; i++) {

        html += '<li>';
        html += '<a data-id="' + personas[i].id + '" href="chat.html?nombre=' + nombreUsuario + '&sala=' + personas[i].id + '"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + ' <small class="text-success">online</small></span></a>';
        html += '</li>';

    }

    divUsuarios.html(html);

}

function renderizarMensajes(mensaje, yo) {
    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'indo';
    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger';
    }

    if (yo) {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';
    } else {

        html += '<li class="animated fadeIn">';
        if (mensaje.nombre !== 'Administrador') {
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '    <div class="chat-content">';
        if (mensaje.nombre !== 'Administrador') {
            html += '        <h5>' + mensaje.nombre + '</h5>';
        }
        html += '        <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    }

    divChatbox.append(html);
    scrollBottom();
}

// Para que el scroll empiece abajo de todo en el chat
function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

// Listeners
// onClick en etiquetas <a>
divUsuarios.on('click', 'a', function() {
    //El 'this' hace referencia al elemento que ha sido clickado
    var id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});

// onSubmit, para cuando se clicke el botón de envíar mensaje
formEnviar.on('submit', function(e) {

    // Para que no haga la acción por defecto
    e.preventDefault();

    // Si el cuadro de texto está vacío al pulsar el botón de envíar, no hace nada
    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    /**
     * Se hace un emit con nombre de evento 'crearMensaje',
     * con el objeto mensaje, que contiene el nombre de usuario y el texto del input,
     * y con el un callback que pinta el mensaje, pasandole true a la función de renderizar, porque es su pripio mensaje y se pinta distinto al de los demás
     */
    socket.emit('crearMensaje', {
            nombre: nombreUsuario,
            mensaje: txtMensaje.val().trim()
        },
        function(mensaje) {
            txtMensaje.val('').focus();
            renderizarMensajes(mensaje, true);
        });

});