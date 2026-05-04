const { Router } = require("express");
const validar = require("../middleware/validarCampos");
const control = require("../controllers/personajeController");

const router = Router();

router.get("/", control.listar);
router.get("/:id", control.obtenerUno);
router.post(
  "/manual",
  validar(["nombre", "especie", "categoria"]),
  control.crearManual,
);
router.post("/aleatorio", control.crearAleatorio);
router.put("/:id", validar(["nombre"]), control.actualizar);

// Bonus creado por grupo 3 || Futura implementación
// router.delete("/genocidio", control.genocidio);

router.delete("/:id", control.eliminar);



module.exports = router;
