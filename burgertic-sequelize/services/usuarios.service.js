
import { Usuario } from "../models/usuarios.model.js";

const getAllUsuarios = async () => await Usuario.findAll();

const getUsuarioByEmail = async (email) => {
    try {
        console.log("Email recibido en el servicio:", email);
        
        const usuario = await Usuario.findOne({
            where: {
                email: email,
            },
            raw: true,
        });

        console.log("Usuario encontrado:", usuario);
        return usuario;
    } catch (error) {
        console.error("Error al buscar usuario por email:", error.message);
        throw new Error("Error al buscar usuario");
    }
};

const getUsuarioById = async (id) => {
    try {
        console.log("Email recibido en el servicio:", id);
        
        const usuario = await Usuario.findOne({
            where: {
                id: id,
            },
            raw: true,
        });

        console.log("Usuario encontrado:", usuario);
        return usuario;
    } catch (error) {
        console.error("Error al buscar usuario por email:", error.message);
        throw new Error("Error al buscar usuario");
    }
};

const createUsuario = async (usuario) => {
    console.log("Datos recibidos:",usuario);

    if (!usuario) throw new Error("No se encuentran los datos de usuario");

    const existingUser = await Usuario.findOne({
        where: { email: usuario.email },
        raw: true,
    });

    console.log("Resultado de la búsqueda:", existingUser);

    if (existingUser) throw new Error("El correo ya está registrado");

    await Usuario.create({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        password: usuario.password,
        email: usuario.email,
        admin: usuario.admin,
    });

    console.log("Usuario creado exitosamente");
};





export default { getAllUsuarios,getUsuarioByEmail,getUsuarioById,createUsuario};
