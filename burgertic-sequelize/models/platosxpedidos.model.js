import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class Platoxpedido extends Model{}
Platoxpedido.init(
    {
        id:{
            type: DataTypes.INTEGRER,
            autoIncrement:true,
        },
        cantidad:{
            type: DataTypes.INTEGRER,
        },
    },
    {
        sequelize,
        modelName: "platos",
        timestamps: false,
    }
) 