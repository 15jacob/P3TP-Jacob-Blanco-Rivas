document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const categoriaId = document.getElementById('id_category').value;
        if (categoriaId) {
            mostrarAtributos(categoriaId);
        }
    }, 50);

    document.getElementById('id_category').addEventListener('change', function() {
        mostrarAtributos(this.value);
    });

    document.getElementById('imagen').addEventListener('change', function(e) {
        const preview = document.getElementById('imagePreview');
        const file = e.target.files[0];
        
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
            }
            reader.readAsDataURL(file);
        } else {
            preview.style.display = 'none';
        }
    });
});

function mostrarAtributos(categoriaId) {
    const gorraAttributes = document.getElementById('gorraAttributes');
    const mediaAttributes = document.getElementById('mediaAttributes');
    
    gorraAttributes.style.display = 'none';
    mediaAttributes.style.display = 'none';
    
    gorraAttributes.querySelectorAll('select').forEach(select => select.disabled = true);
    mediaAttributes.querySelectorAll('select').forEach(select => select.disabled = true);
    
    if (categoriaId === '1') {
        gorraAttributes.style.display = 'block';
        gorraAttributes.querySelectorAll('select').forEach(select => {
            select.disabled = false;

        });
    } else if (categoriaId === '2') {
        mediaAttributes.style.display = 'block';
        mediaAttributes.querySelectorAll('select').forEach(select => {
            select.disabled = false;
        });
    }
}