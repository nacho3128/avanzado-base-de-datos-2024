import { sequelize } from "../db.js";
import Plato from "../platos.model.js"
import Pedido from "../pedidos.model.js"
import Usuario from "../usuarios.model.js"
import Platosxpedido from "../platosxpedidos.model.js"

Plato.belongsTo(Usuario)
Plato.belongsToMany(Pedido,{through:"Platosxpedido"})
Pedido.belongsToMany(Plato,{through:"Platosxpedido"})