import { sequelize } from "../db.js";
import {Plato} from "..models/platos.model.js"
import {Pedido} from "..models/pedidos.model.js"
import {Usuario} from "..models/usuarios.model.js"
import {Platosxpedido} from "..models/platosxpedidos.model.js"

Plato.belongsTo(Usuario)
Plato.belongsToMany(Pedido,{through:Platosxpedido})
Pedido.belongsToMany(Plato,{through:Platosxpedido})
await sequelize.sync({force:true})