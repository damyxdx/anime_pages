<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.9/xlsx.full.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.querySelector("#postsTable tbody");

    // Cargar el archivo Excel
    fetch('data/instagram_posts_recent.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            // Insertar los datos en la tabla
            jsonData.forEach(row => {
                const tr = document.createElement('tr');

                const tdDate = document.createElement('td');
                tdDate.textContent = row['Fecha'];
                tr.appendChild(tdDate);

                const tdUser = document.createElement('td');
                tdUser.textContent = row['Usuario'];
                tr.appendChild(tdUser);

                const tdDesc = document.createElement('td');
                tdDesc.textContent = row['Descripción'];
                tr.appendChild(tdDesc);

                const tdImage = document.createElement('td');
                const img = document.createElement('img');
                img.src = row['Imagen'];
                tdImage.appendChild(img);
                tr.appendChild(tdImage);

                const tdLikes = document.createElement('td');
                tdLikes.textContent = row['Likes'];
                tr.appendChild(tdLikes);

                const tdComments = document.createElement('td');
                tdComments.textContent = row['Comentarios'];
                tr.appendChild(tdComments);

                tableBody.appendChild(tr);
            });
        });
});
</script>
