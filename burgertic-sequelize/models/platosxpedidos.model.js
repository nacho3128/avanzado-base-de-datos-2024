import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class platoxpedido extends Model{}
platoxpedido.init(
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