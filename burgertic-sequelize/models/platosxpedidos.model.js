import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class Platoxpedido extends Model{}
Platoxpedido.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
        },
        cantidad:{
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        modelName: "platosxpedidos",
        timestamps: false,
    }
) 