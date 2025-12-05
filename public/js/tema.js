class TemaManager {
    constructor() {
        this.init();
    }

    init() {
        this.aplicarTemaGuardado();
        this.crearBotonFlotante();
    }

    aplicarTemaGuardado() {
        const savedTheme = localStorage.getItem('bs-theme') || 'auto';
        document.documentElement.setAttribute('data-bs-theme', savedTheme);
    }

    crearBotonFlotante() {
        if (document.getElementById('temaFlotante')) return;

        const boton = document.createElement('button');
        boton.id = 'temaFlotante';
        boton.className = 'btn btn-success bg-success-subtle position-fixed bottom-0 end-0 m-3 rounded-circle shadow';
        boton.style = 'width: 50px; height: 50px; z-index: 1000; bottom: 4rem!important';
        boton.innerHTML = '<i class="bi bi-moon-stars"></i>';
        boton.title = 'Cambiar tema';

        boton.addEventListener('click', () => this.toggleTheme());

        document.body.appendChild(boton);
        this.actualizarIcono();
    }

    toggleTheme() {
        const html = document.documentElement;
        const theme = html.getAttribute('data-bs-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('bs-theme', newTheme);
        this.actualizarIcono();
    }

    actualizarIcono() {
        const boton = document.getElementById('temaFlotante');
        if (!boton) return;

        const icon = boton.querySelector('i');
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        const temaReal = currentTheme === 'auto' ? 
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : 
            currentTheme;

        if (icon) {
            icon.className = temaReal === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars';
            boton.title = `Cambiar a modo ${temaReal === 'dark' ? 'claro' : 'oscuro'}`;
        }
    }
}

const temaManager = new TemaManager();