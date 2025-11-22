class TicketController {
    constructor() {
        this.ticketData = null;
        this.init();
    }

    init() {
        this.cargarDatosTicket();
        this.configurarEventListeners();
        this.renderizarTicket();
    }

    cargarDatosTicket() {
        const ticketGuardado = localStorage.getItem('ultimaVenta');
        const nombreUsuario = localStorage.getItem('nombreUsuario');
        
        if (ticketGuardado) {
            this.ticketData = JSON.parse(ticketGuardado);
        } else {
            alert('No se encontraron datos de compra. Serás redirigido al carrito.');
            window.location.href = './cart';
            return;
        }

        this.ticketData.nombreCliente = nombreUsuario || 'Cliente';
    }

    renderizarTicket() {
        if (!this.ticketData) return;

        document.getElementById('ticketNumber').textContent = this.ticketData.numeroVenta || `TKT-${Date.now()}`;
        document.getElementById('ticketDate').textContent = new Date().toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        document.getElementById('ticketClient').textContent = this.ticketData.nombreCliente;
        document.getElementById('ticketTotal').textContent = `$${this.ticketData.total?.toLocaleString('es-AR') || '0'}`;

        const productosContainer = document.getElementById('ticketProducts');
        productosContainer.innerHTML = '';

        (this.ticketData.productos || []).forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.className = 'd-flex justify-content-between align-items-start border-bottom py-1 small';
            
            const nombreCorto = producto.titulo
            const categoriaCorta = `${producto.categoria || 'Prod'} - ${producto.atributoExtra}`;
            
            productoDiv.innerHTML = `
                <div class="w-50 text-small text-muted" title="${producto.titulo}">
                    <div class="fw-medium text-muted">${nombreCorto}</div>
                    <small class="text-muted">${categoriaCorta}</small>
                </div>
                <span class="text-center text-muted" style="width: 40px;">${producto.cantidad}</span>
                <span class="text-end text-muted" style="width: 60px;">$${(producto.precio || 0).toLocaleString('es-AR')}</span>
                <span class="text-end fw-medium text-muted" style="width: 60px;">
                    $${((producto.precio || 0) * (producto.cantidad || 0)).toLocaleString('es-AR')}
                </span>
            `;
            
            productosContainer.appendChild(productoDiv);
        });
    }

    configurarEventListeners() {
        document.getElementById('btnDownloadPDF').addEventListener('click', () => {
            this.descargarPDF();
        });

        document.getElementById('btnNewPurchase').addEventListener('click', () => {
            this.nuevaCompra();
        });
    }

    async descargarPDF() {
        const btnDownload = document.getElementById('btnDownloadPDF');
        const originalText = btnDownload.innerHTML;
        
        try {
            btnDownload.innerHTML = '<i class="bi bi-hourglass-split"></i> Generando PDF...';
            btnDownload.disabled = true;

            await new Promise(resolve => setTimeout(resolve, 500));

            if (typeof window.jspdf === 'undefined' || typeof html2canvas === 'undefined') {
                throw new Error('Librerías PDF no cargadas correctamente');
            }

            const { jsPDF } = window.jspdf;
            const ticketElement = document.getElementById('ticketContent');

            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            });

            const canvas = await html2canvas(ticketElement, {
                scale: 1.5, 
                backgroundColor: '#ffffff',
                useCORS: true,
                logging: false
            });

            const imgData = canvas.toDataURL('image/png', 1.0);
            
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            
            const imgWidth = pageWidth - 20;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            const yPosition = (pageHeight - imgHeight) / 2;
            pdf.addImage(imgData, 'PNG', 10, yPosition, imgWidth, imgHeight);
            
            const numeroTicket = this.ticketData.numeroVenta || `ticket-${Date.now()}`;
            pdf.save(`ticket-${numeroTicket}.pdf`);

        } catch (error) {
            console.error('Error al generar PDF:', error);
            alert('Error al descargar el ticket. Por favor, intenta de nuevo.');
        } finally {
            btnDownload.innerHTML = originalText;
            btnDownload.disabled = false;
        }
    }

    nuevaCompra() {
        localStorage.removeItem('nombreUsuario');
        localStorage.removeItem('ultimaVenta');
        
        if (window.cartManager) {
            window.cartManager.limpiarCarrito();
        }
        
        window.location.href = './index';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TicketController();
});