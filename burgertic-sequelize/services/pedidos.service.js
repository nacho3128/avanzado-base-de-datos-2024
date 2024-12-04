import { Pedido } from "../models/pedidos.model.js";
import { Plato } from "../models/platos.model.js";
import { Usuario } from "../models/usuarios.model.js";
import { sequelize } from "../db.js";
import { Platoxpedido } from "../models/platosxpedidos.model.js"

Plato.belongsTo(Usuario)
Plato.belongsToMany(Pedido,{through:Platoxpedido})
Pedido.belongsToMany(Plato,{through:Platoxpedido})
await sequelize.sync({force:true})

const getPedidos = async() =>{ await Pedido.findAll();}

const getPedidoById= async (id)=> {
 const rta= await Pedido.findOne({
     where:{
         id:id,
     },
     
 })
 return rta; };

const getPedidosByUser=  async(idUsuario) => 
await Pedido.findAll({
    where:{
        id_usuario:idUsuario,
    },
});

const createPedido = async (idUsuario , platos) => {
    try {
        const nuevoPedido = await Pedido.create({
            id_usuario: idUsuario,
            fecha: new Date(),
            estado: 'pendiente',
        });
        console.log(idUsuario)

        const idPedido = nuevoPedido.id;

        for (let plato of platos) {
            const platoExistente = await Plato.findOne({
                where: { nombre: plato.nombre },
            });

            if (!platoExistente) {
                throw new Error(`Plato con nombre ${plato.nombre} no encontrado`);
            }

            await PlatoxPedido.create({
                id_pedido: idPedido,
                id_plato: platoExistente.id,
                cantidad: plato.cantidad,
            });
        }

        return nuevoPedido;
    } catch (error) {
        console.error("Error al crear el pedido:", error.message);
        throw error;
    }
};


const updatePedido = async (id,estado) => {
    
    if(estado !=="aceptado"&&
        estado!=="en camino"&&
        estado!=="entregado"
    ) throw new Error("El pedido no esta en un estado correcto")
    const pedido = await Pedido.findByPk(id);

    if(!pedido) throw new Error ("Pedido no encontrado");
    
    pedido.fecha =  new Date(),
    pedido.estado = estado

    await pedido.save();

    return pedido;
}

const deletePedido= async (id) =>{
const pedido = await Pedido.findByPk(id);

if(!pedido){
    throw new Error ("Pedido no encontrado");
}

await pedido.destroy();

}
export default {
    getPedidos,
    getPedidoById,
    getPedidosByUser,
    createPedido,
    updatePedido,
    deletePedido,
};