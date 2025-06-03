document.getElementById('form-estudiante').addEventListener('submit', async function(e) {
    e.preventDefault();

    const estudiante = {
        tipoDocumento: document.getElementById('tipoDocumento').value,
        numeroDocumento: document.getElementById('numeroDocumento').value,
        nombres: document.getElementById('nombres').value,
        apellidos: document.getElementById('apellidos').value,
        departamento: document.getElementById('departamento').value
    };

    try {
        const response = await fetch('/.netlify/functions/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(estudiante)
        });

        const resultado = await response.json();

        if (response.ok) {
            alert("✅ Estudiante registrado con éxito");
            document.getElementById('form-estudiante').reset();
            mostrarEstudiantes();
        } else {
            alert("❌ Error: " + resultado.error);
        }
    } catch (error) {
        console.error("Error al registrar estudiante:", error);
        alert("❌ No se pudo registrar el estudiante.");
    }
});

async function mostrarEstudiantes() {
    const container = document.getElementById('estudiantes');
    container.innerHTML = 'Cargando...';

    try {
        const response = await fetch('/.netlify/functions/usuarios?listar=true');
        const data = await response.json();

        if (response.ok) {
            container.innerHTML = '';
            data.forEach(e => {
                container.innerHTML += `
                    <p>${e.nombres} ${e.apellidos} - ${e.tipoDocumento}: ${e.numeroDocumento} | Departamento: ${e.departamento}</p>
                `;
            });
        } else {
            container.innerHTML = 'Error al cargar estudiantes.';
        }
    } catch (error) {
        console.error("Error al cargar estudiantes:", error);
        container.innerHTML = 'No se pudieron cargar los estudiantes.';
    }
}

document.addEventListener('DOMContentLoaded', mostrarEstudiantes);
