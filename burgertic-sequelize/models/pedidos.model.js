import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class Pedido extends Model{}

Pedido.init(
    {
        id:{
            type: DataTypes.INTEGRER,
            autoIncrement: true,
            primaryKey:true,
        },
        id_usuario:{
            type: DataTypes.INTEGRER,
            foreignKey: true,
        },
        fecha:{
            type: DataTypes.DATE,
        },
        estado:{
            type: DataTypes.STRING,
        }
    }
)