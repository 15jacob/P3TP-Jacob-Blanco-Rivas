document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('id_category').addEventListener('change', function() {
        const categoriaId = this.value;
        const gorraAttributes = document.getElementById('gorraAttributes');
        const mediaAttributes = document.getElementById('mediaAttributes');
        
        gorraAttributes.style.display = 'none';
        mediaAttributes.style.display = 'none';
        
        gorraAttributes.querySelectorAll('select').forEach(select => select.disabled = true);
        mediaAttributes.querySelectorAll('select').forEach(select => select.disabled = true);
        
        if (categoriaId === '1') {
            gorraAttributes.style.display = 'block';
            gorraAttributes.querySelectorAll('select').forEach(select => select.disabled = false);
        } else if (categoriaId === '2') {
            mediaAttributes.style.display = 'block';
            mediaAttributes.querySelectorAll('select').forEach(select => select.disabled = false);
        }
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

    document.getElementById('productoForm').addEventListener('submit', function(e) {
        const price = document.getElementById('price').value;
        if (!/^\d+(\.\d{1,2})?$/.test(price)) {
            e.preventDefault();
            alert('Por favor, ingrese un precio válido (ej: 12000 o 12000.50)');
            return false;
        }
    });
});