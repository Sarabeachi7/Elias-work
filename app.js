require("dotenv").config();

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());

// Ruta del archivo JSON
const ruta = path.join(__dirname, "curriculum", "cv.json");

// ===============================
// FUNCIONES
// ===============================

function leer() {
    if (!fs.existsSync(ruta)) {
        return {};
    }

    const data = fs.readFileSync(ruta, "utf-8");

    return JSON.parse(data);
}

function editar(data) {
    fs.writeFileSync(
        ruta,
        JSON.stringify(data, null, 2),
        "utf-8"
    );
}


// ===============================
// RUTA PRINCIPAL
// ===============================

app.get("/", (req, res) => {
    res.status(200).send("Bienvenido a mi CV");
});


// ===============================
// CURRICULUM
// ===============================

app.get("/curriculum", (req, res) => {

    const data = leer();

    if (!data.curriculum) {
        return res.status(404).json({
            message: "Curriculum no encontrado"
        });
    }

    return res.status(200).json(data.curriculum);
});


// ===============================
// EDUCACIÓN
// ===============================

app.get("/curriculum/educacion", (req, res) => {

    const data = leer();

    if (!data.curriculum || !data.curriculum.educacion) {
        return res.status(404).json({
            message: "Educación no encontrada"
        });
    }

    return res.status(200).json(data.curriculum.educacion);
});


app.get("/curriculum/educacion/:id", (req, res) => {

    const { id } = req.params;

    const data = leer();

    if (!data.curriculum || !data.curriculum.educacion) {
        return res.status(404).json({
            message: "Educación no encontrada"
        });
    }

    const educacion = data.curriculum.educacion.find(
        (e) => String(e.id) === String(id)
    );

    if (!educacion) {
        return res.status(404).json({
            message: "Educación no encontrada"
        });
    }

    return res.status(200).json(educacion);
});


// ===============================
// EXPERIENCIA
// ===============================

app.get("/curriculum/experiencia", (req, res) => {

    const data = leer();

    if (!data.curriculum || !data.curriculum.experiencia) {
        return res.status(404).json({
            message: "Experiencia no encontrada"
        });
    }

    return res.status(200).json(data.curriculum.experiencia);
});


app.get("/curriculum/experiencia/:id", (req, res) => {

    const { id } = req.params;

    const data = leer();

    if (!data.curriculum || !data.curriculum.experiencia) {
        return res.status(404).json({
            message: "Experiencia no encontrada"
        });
    }

    const experiencia = data.curriculum.experiencia.find(
        (ex) => String(ex.id) === String(id)
    );

    if (!experiencia) {
        return res.status(404).json({
            message: "Experiencia no encontrada"
        });
    }

    return res.status(200).json(experiencia);
});


// ===============================
// HABILIDADES
// ===============================

app.get("/curriculum/habilidades", (req, res) => {

    const data = leer();

    if (!data.curriculum || !data.curriculum.habilidades) {
        return res.status(404).json({
            message: "Habilidades no encontradas"
        });
    }

    return res.status(200).json(data.curriculum.habilidades);
});


app.get("/curriculum/habilidades/blandas", (req, res) => {

    const data = leer();

    if (
        !data.curriculum ||
        !data.curriculum.habilidades ||
        !data.curriculum.habilidades.blandas
    ) {
        return res.status(404).json({
            message: "Habilidades blandas no encontradas"
        });
    }

    return res.status(200).json(
        data.curriculum.habilidades.blandas
    );
});


app.get("/curriculum/habilidades/tecnicas", (req, res) => {

    const data = leer();

    if (
        !data.curriculum ||
        !data.curriculum.habilidades ||
        !data.curriculum.habilidades.tecnicas
    ) {
        return res.status(404).json({
            message: "Habilidades técnicas no encontradas"
        });
    }

    return res.status(200).json(
        data.curriculum.habilidades.tecnicas
    );
});


// ===============================
// IDIOMAS
// ===============================

app.get("/curriculum/idiomas", (req, res) => {

    const data = leer();

    if (!data.curriculum || !data.curriculum.idiomas) {
        return res.status(404).json({
            message: "Idiomas no encontrados"
        });
    }

    return res.status(200).json(data.curriculum.idiomas);
});


app.get("/curriculum/idiomas/:id", (req, res) => {

    const { id } = req.params;

    const data = leer();

    if (!data.curriculum || !data.curriculum.idiomas) {
        return res.status(404).json({
            message: "Idiomas no encontrados"
        });
    }

    const idioma = data.curriculum.idiomas.find(
        (i) => String(i.id) === String(id)
    );

    if (!idioma) {
        return res.status(404).json({
            message: "Idioma no encontrado"
        });
    }

    return res.status(200).json(idioma);
});


// ===============================
// CERTIFICACIONES
// ===============================

app.get("/curriculum/certificaciones", (req, res) => {

    const data = leer();

    if (!data.curriculum || !data.curriculum.certificaciones) {
        return res.status(404).json({
            message: "Certificaciones no encontradas"
        });
    }

    return res.status(200).json(
        data.curriculum.certificaciones
    );
});


// ===============================
// POST EDUCACIÓN
// ===============================

app.post("/curriculum/educacion", (req, res) => {

    const data = leer();

    if (!data.curriculum || !data.curriculum.educacion) {
        return res.status(404).json({
            message: "Educación no encontrada"
        });
    }

    const nuevaEducacion = req.body;

    data.curriculum.educacion.push(nuevaEducacion);

    editar(data);

    return res.status(201).json({
        message: "Educación agregada correctamente",
        educacion: nuevaEducacion
    });
});


// ===============================
// POST EXPERIENCIA
// ===============================

app.post("/curriculum/experiencia", (req, res) => {

    const data = leer();

    if (!data.curriculum || !data.curriculum.experiencia) {
        return res.status(404).json({
            message: "Experiencia no encontrada"
        });
    }

    const nuevaExperiencia = req.body;

    data.curriculum.experiencia.push(nuevaExperiencia);

    editar(data);

    return res.status(201).json({
        message: "Experiencia agregada correctamente",
        experiencia: nuevaExperiencia
    });
});


// ===============================
// POST HABILIDAD BLANDA
// ===============================

app.post("/curriculum/habilidades/blandas", (req, res) => {

    const data = leer();

    if (
        !data.curriculum ||
        !data.curriculum.habilidades ||
        !data.curriculum.habilidades.blandas
    ) {
        return res.status(404).json({
            message: "Habilidades blandas no encontradas"
        });
    }

    const nuevaHabilidad = req.body;

    data.curriculum.habilidades.blandas.push(nuevaHabilidad);

    editar(data);

    return res.status(201).json({
        message: "Habilidad blanda agregada correctamente",
        habilidad: nuevaHabilidad
    });
});


// ===============================
// POST HABILIDAD TÉCNICA
// ===============================

app.post("/curriculum/habilidades/tecnicas", (req, res) => {

    const data = leer();

    if (
        !data.curriculum ||
        !data.curriculum.habilidades ||
        !data.curriculum.habilidades.tecnicas
    ) {
        return res.status(404).json({
            message: "Habilidades técnicas no encontradas"
        });
    }

    const nuevaHabilidad = req.body;

    data.curriculum.habilidades.tecnicas.push(nuevaHabilidad);

    editar(data);

    return res.status(201).json({
        message: "Habilidad técnica agregada correctamente",
        habilidad: nuevaHabilidad
    });
});


// ===============================
// POST IDIOMAS
// ===============================

app.post("/curriculum/idiomas", (req, res) => {

    const data = leer();

    if (!data.curriculum || !data.curriculum.idiomas) {
        return res.status(404).json({
            message: "Idiomas no encontrados"
        });
    }

    const nuevoIdioma = req.body;

    data.curriculum.idiomas.push(nuevoIdioma);

    editar(data);

    return res.status(201).json({
        message: "Idioma agregado correctamente",
        idioma: nuevoIdioma
    });
});


// ===============================
// POST CERTIFICACIONES
// ===============================

app.post("/curriculum/certificaciones", (req, res) => {

    const data = leer();

    if (!data.curriculum || !data.curriculum.certificaciones) {
        return res.status(404).json({
            message: "Certificaciones no encontradas"
        });
    }

    const nuevaCertificacion = req.body;

    data.curriculum.certificaciones.push(nuevaCertificacion);

    editar(data);

    return res.status(201).json({
        message: "Certificación agregada correctamente",
        certificacion: nuevaCertificacion
    });
});


// ===============================
// PUT EDUCACIÓN
// ===============================

app.put("/curriculum/educacion/:id", (req, res) => {

    const { id } = req.params;
    const data = leer();

    const indice = data.curriculum.educacion.findIndex(
        (e) => String(e.id) === String(id)
    );

    if (indice === -1) {
        return res.status(404).json({
            message: "Educación no encontrada"
        });
    }

    data.curriculum.educacion[indice] = req.body;

    editar(data);

    return res.status(200).json({
        message: "Educación actualizada correctamente",
        educacion: data.curriculum.educacion[indice]
    });
});


// ===============================
// PUT EXPERIENCIA
// ===============================

app.put("/curriculum/experiencia/:id", (req, res) => {

    const { id } = req.params;
    const data = leer();

    const indice = data.curriculum.experiencia.findIndex(
        (e) => String(e.id) === String(id)
    );

    if (indice === -1) {
        return res.status(404).json({
            message: "Experiencia no encontrada"
        });
    }

    data.curriculum.experiencia[indice] = req.body;

    editar(data);

    return res.status(200).json({
        message: "Experiencia actualizada correctamente",
        experiencia: data.curriculum.experiencia[indice]
    });
});


// ===============================
// PUT IDIOMAS
// ===============================

app.put("/curriculum/idiomas/:id", (req, res) => {

    const { id } = req.params;
    const data = leer();

    const indice = data.curriculum.idiomas.findIndex(
        (i) => String(i.id) === String(id)
    );

    if (indice === -1) {
        return res.status(404).json({
            message: "Idioma no encontrado"
        });
    }

    data.curriculum.idiomas[indice] = req.body;

    editar(data);

    return res.status(200).json({
        message: "Idioma actualizado correctamente",
        idioma: data.curriculum.idiomas[indice]
    });
});


// ===============================
// DELETE EDUCACIÓN
// ===============================

app.delete("/curriculum/educacion/:id", (req, res) => {

    const { id } = req.params;
    const data = leer();

    const indice = data.curriculum.educacion.findIndex(
        (e) => String(e.id) === String(id)
    );

    if (indice === -1) {
        return res.status(404).json({
            message: "Educación no encontrada"
        });
    }

    const educacionEliminada =
        data.curriculum.educacion.splice(indice, 1);

    editar(data);

    return res.status(200).json({
        message: "Educación eliminada correctamente",
        educacion: educacionEliminada[0]
    });
});


// ===============================
// DELETE EXPERIENCIA
// ===============================

app.delete("/curriculum/experiencia/:id", (req, res) => {

    const { id } = req.params;
    const data = leer();

    const indice = data.curriculum.experiencia.findIndex(
        (e) => String(e.id) === String(id)
    );

    if (indice === -1) {
        return res.status(404).json({
            message: "Experiencia no encontrada"
        });
    }

    const experienciaEliminada =
        data.curriculum.experiencia.splice(indice, 1);

    editar(data);

    return res.status(200).json({
        message: "Experiencia eliminada correctamente",
        experiencia: experienciaEliminada[0]
    });
});


// ===============================
// DELETE IDIOMA
// ===============================

app.delete("/curriculum/idiomas/:id", (req, res) => {

    const { id } = req.params;
    const data = leer();

    const indice = data.curriculum.idiomas.findIndex(
        (i) => String(i.id) === String(id)
    );

    if (indice === -1) {
        return res.status(404).json({
            message: "Idioma no encontrado"
        });
    }

    const idiomaEliminado =
        data.curriculum.idiomas.splice(indice, 1);

    editar(data);

    return res.status(200).json({
        message: "Idioma eliminado correctamente",
        idioma: idiomaEliminado[0]
    });
});


// ===============================
// EXPORTAR PARA VERCEL
// ===============================

module.exports = app;