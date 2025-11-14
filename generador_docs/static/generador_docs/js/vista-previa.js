// static/generador_docs/js/vista-previa.js

console.log('🔧 Cargando módulo de vista previa...');

function inicializarVistaPrevia() {
    console.log('✅ Inicializando vista previa en tiempo real');
    
    // Obtener elementos del DOM
    const formulario = document.getElementById('documentForm');
    const vistaPrevia = document.getElementById('vistaPrevia');
    const btnActualizar = document.querySelector('.btn-preview');
    
    if (!formulario) {
        console.error('❌ No se encontró el formulario con id "documentForm"');
        return;
    }
    
    if (!vistaPrevia) {
        console.error('❌ No se encontró el elemento de vista previa con id "vistaPrevia"');
        return;
    }
    
    // ✅ IMPORTANTE: NO agregar event listeners al formulario que bloqueen el envío
    
    // Función para formatear fechas
    function formatearFecha(fecha) {
        if (!fecha) return 'No especificada';
        try {
            const fechaObj = new Date(fecha + 'T00:00:00');
            return fechaObj.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch (error) {
            return 'Fecha inválida';
        }
    }
    
    // Función para obtener nombre del documento
    function obtenerNombreDocumento(tipo) {
        const nombres = {
            'desistimiento': '📄 Desistimiento de Acción',
            'desistimiento_sin_efectos': '📋 Desistimiento Sin Efectos de Audiencia',
            'pago_efectivo': '💵 Pago en Efectivo',
            'pago_transferencia': '🏦 Pago por Transferencia',
            'pago_cheque': '📊 Pago con Cheque',
            'pago_cumplido': '✅ Constancia de Pago Cumplido'
        };
        return nombres[tipo] || '📝 Documento no especificado';
    }
    
    // Función principal que actualiza la vista previa
    function actualizarVistaPrevia() {
        console.log('🔄 Actualizando vista previa...');
        
        // Obtener valores del formulario
        const datos = {
            tipoDocumento: document.getElementById('tipo_documento')?.value || '',
            numeroExpediente: document.getElementById('numero_expediente')?.value || '',
            tipoProcedimiento: document.getElementById('tipo_procedimiento')?.value || '',
            fechaAcuerdo: document.getElementById('fecha_acuerdo')?.value || '',
            horaComparecencia: document.getElementById('hora_comparecencia')?.value || '',
            fechaPublicacion: document.getElementById('fecha_publicacion')?.value || '',
            parteActora: document.getElementById('parte_actora')?.value || '',
            parteDemandada: document.getElementById('parte_demandada')?.value || '',
            secretarioAcuerdos: document.getElementById('secretario_acuerdos')?.value || '',
            tipoAudiencia: document.getElementById('tipo_audiencia')?.value || '',
            fechaAudiencia: document.getElementById('fecha_audiencia')?.value || '', 
            personalidad: document.getElementById('personalidad')?.value || '',
            representanteDemandada: document.getElementById('representante_demandada')?.value || '',
            cantidad: document.getElementById('cantidad')?.value || '',
            fechaConvenio: document.getElementById('fecha_convenio')?.value || '',
            // NUEVOS CAMPOS
        };
        
        console.log('Datos capturados para vista previa:', datos);
        
        // Generar HTML para la vista previa
        let htmlVistaPrevia = '';
        
        if (!datos.numeroExpediente && !datos.parteActora) {
            htmlVistaPrevia = `
                <div style="text-align: center; color: #666; padding: 100px 20px;">
                    <div style="font-size: 48px; margin-bottom: 20px;">📋</div>
                    <p style="font-style: italic; font-size: 16px;">
                        Complete el formulario para ver la vista previa del documento
                    </p>
                </div>
            `;
        } else {
            htmlVistaPrevia = generarContenidoDocumento(datos);
        }
        
        // Actualizar el contenido
        vistaPrevia.innerHTML = htmlVistaPrevia;
    }
    
    // Función que genera el contenido del documento
    function generarContenidoDocumento(datos) {
        let seccionEspecifica = '';
        
        // Contenido específico según el tipo de documento
        if (datos.tipoDocumento === 'desistimiento_sin_efectos' && datos.tipoAudiencia) {
            seccionEspecifica = `
                <div style="margin-bottom: 25px;">
                    <h3 style="color: #2c3e50; border-bottom: 1px solid #eaeaea; padding-bottom: 8px; font-size: 18px;">
                        🗓️ Audiencia a Cancelar
                    </h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px;">
                        <div>
                            <strong>Tipo de Audiencia:</strong><br>
                            <span style="color: #2c3e50;">${datos.tipoAudiencia || '---'}</span>
                        </div>
                        <div>
                            <strong>Fecha Programada:</strong><br>
                            <span style="color: #2c3e50;">${formatearFecha(datos.fechaAudiencia)}</span>
                        </div>
                    </div>
                </div>
            `;
        } else if (['pago_efectivo', 'pago_transferencia', 'pago_cheque', 'pago_cumplido'].includes(datos.tipoDocumento)) {
            seccionEspecifica = `
                <div style="margin-bottom: 25px;">
                    <h3 style="color: #2c3e50; border-bottom: 1px solid #eaeaea; padding-bottom: 8px; font-size: 18px;">
                        💰 Datos del Pago
                    </h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px;">
                        <div>
                            <strong>Personalidad del Representante:</strong><br>
                            <span style="color: #2c3e50;">${datos.personalidad || '---'}</span>
                        </div>
                        <div>
                            <strong>Representante de la Demandada:</strong><br>
                            <span style="color: #2c3e50;">${datos.representanteDemandada || '---'}</span>
                        </div>
                        <div>
                            <strong>Cantidad del Pago:</strong><br>
                            <span style="color: #2c3e50;">${datos.cantidad || '---'}</span>
                        </div>
                        <div>
                            <strong>Fecha del Convenio:</strong><br>
                            <span style="color: #2c3e50;">${formatearFecha(datos.fechaConvenio)}</span>
                        </div>
                    </div>
                </div>
            `;
        }
        
        return `
            <div style="font-family: 'Arial', sans-serif; line-height: 1.6; padding: 15px; color: #333;">
                <!-- Encabezado -->
                <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #6a0dad;">
                    <h2 style="color: #2c3e50; margin-bottom: 10px; font-size: 24px;">GENERADOR DE DOCUMENTOS</h2>
                    <p style="color: #7f8c8d; font-size: 14px; margin-bottom: 5px;">${obtenerNombreDocumento(datos.tipoDocumento)}</p>
                    <p style="color: #7f8c8d; font-size: 12px;">Tribunal Laboral - Poder Judicial</p>
                </div>
                
                <!-- Tipo de Documento -->
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #6a0dad;">
                    <h3 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 16px;">📝 Tipo de Documento</h3>
                    <p style="margin: 0; font-weight: bold; color: #6a0dad;">${obtenerNombreDocumento(datos.tipoDocumento)}</p>
                </div>
                
                <!-- Datos del Expediente -->
                <div style="margin-bottom: 25px;">
                    <h3 style="color: #2c3e50; border-bottom: 1px solid #eaeaea; padding-bottom: 8px; font-size: 18px;">
                        📂 Datos del Expediente
                    </h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px;">
                        <div>
                            <strong>Número de Expediente:</strong><br>
                            <span style="color: #2c3e50;">${datos.numeroExpediente || '---'}</span>
                        </div>
                        <div>
                            <strong>Procedimiento:</strong><br>
                            <span style="color: #2c3e50;">${datos.tipoProcedimiento || '---'}</span>
                        </div>
                    </div>
                </div>
                
                <!-- Fechas y Horarios -->
                <div style="margin-bottom: 25px;">
                    <h3 style="color: #2c3e50; border-bottom: 1px solid #eaeaea; padding-bottom: 8px; font-size: 18px;">
                        📅 Fechas y Horarios
                    </h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px;">
                        <div>
                            <strong>Fecha de Acuerdo:</strong><br>
                            <span style="color: #2c3e50;">${formatearFecha(datos.fechaAcuerdo)}</span>
                        </div>
                        <div>
                            <strong>Hora Comparecencia:</strong><br>
                            <span style="color: #2c3e50;">${datos.horaComparecencia || '---'}</span>
                        </div>
                        <div>
                            <strong>Fecha Publicación:</strong><br>
                            <span style="color: #2c3e50;">${formatearFecha(datos.fechaPublicacion)}</span>
                        </div>
                    </div>
                </div>
                
                <!-- Sección Específica (Audiencia o Pago) -->
                ${seccionEspecifica}
                
                <!-- Partes Involucradas -->
                <div style="margin-bottom: 25px;">
                    <h3 style="color: #2c3e50; border-bottom: 1px solid #eaeaea; padding-bottom: 8px; font-size: 18px;">
                        👥 Partes Involucradas
                    </h3>
                    <div style="margin-top: 15px;">
                        <div style="margin-bottom: 10px;">
                            <strong>Parte Actora (Demandante):</strong><br>
                            <span style="color: #2c3e50;">${datos.parteActora || '---'}</span>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <strong>Parte Demandada:</strong><br>
                            <span style="color: #2c3e50;">${datos.parteDemandada || '---'}</span>
                        </div>
                        <div>
                            <strong>Secretario de Acuerdos:</strong><br>
                            <span style="color: #2c3e50;">${datos.secretarioAcuerdos || '---'}</span>
                        </div>
                    </div>
                </div>
                
                <!-- Pie de página -->
                <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; margin-top: 40px; text-align: center;">
                    <p style="margin: 0; color: #7f8c8d; font-size: 12px; font-style: italic;">
                        🚀 Vista previa generada automáticamente - Los datos mostrados son de prueba
                    </p>
                </div>
            </div>
        `;
    }
    
    // Configurar event listeners SOLO para el botón de vista previa
    if (btnActualizar) {
        btnActualizar.addEventListener('click', function(e) {
            console.log('🔄 Botón de vista previa clickeado');
            actualizarVistaPrevia();
        });
    }
    
    // Actualizar automáticamente cuando cambien los campos
    const camposFormulario = formulario.querySelectorAll('input, select');
    camposFormulario.forEach(campo => {
        campo.addEventListener('input', actualizarVistaPrevia);
        campo.addEventListener('change', actualizarVistaPrevia);
    });
    
    // Actualizar vista previa inicial
    actualizarVistaPrevia();
    
    console.log('🎯 Vista previa configurada correctamente');
}

// Esperar a que el DOM esté completamente cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarVistaPrevia);
} else {
    inicializarVistaPrevia();
}