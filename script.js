document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.querySelector("#postsTable tbody");

    // Intentamos cargar el archivo Excel
    fetch('data/instagram_posts_recent.xlsx')
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el archivo Excel.");
            }
            return response.arrayBuffer();
        })
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            // Insertamos los datos en la tabla
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
                img.alt = "Imagen publicación";
                img.style.maxWidth = "100px";
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
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
});

