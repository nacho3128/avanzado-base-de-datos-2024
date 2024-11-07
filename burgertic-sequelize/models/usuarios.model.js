import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class Usuario extends Model{}

Usuario.init(
    {
        id:{
            type: DataTypes.INTEGRER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre:{
            type: DataTypes.STRING,
        },
        apellido:{
            type: DataTypes.STRING,
        },
        mail:{
            type: DataTypes.STRING,
            unique: true,
        },
        admin:{
            type: DataTypes.BOOLEAN,
        }
    },
    {
        sequelize,
        modelName: "platos",
        timestamps: false,
    }
)