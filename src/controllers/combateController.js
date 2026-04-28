// const Combate = require('../classes/Combate')  // TODO: descomentar cuando tenga hecho la clase Combate

const simularCombate = (req, res) => {
  const { id1, id2 } = req.body

  if (!id1 || !id2) {
    return res.status(400).json({ error: 'Faltan los id1, id2' })
  }

  if (id1 === id2) {
    return res.status(400).json({ error: 'Son el mismo personaje' })
  }

  // TODO: reemplazar por Combate.simular(p1, p2) cuando esté hecha la clase
  const ganador = Math.random() < 0.5 ? id1 : id2
  const perdedor = ganador === id1 ? id2 : id1

  res.json({ ganador, perdedor })
}

module.exports = { simularCombate }