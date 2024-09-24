import usuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const register = async (req, res) => {
    const usuario = req.body
    if (!usuario.email || !usuario.password || !usuario.nombre || !usuario.apellido) {
        return res.status(400).send('Todos los campos tienen que estar completos')
    }

    try {
        const usuario_email = await usuariosService.getUsuarioByEmail(usuario.email)
        if (usuario_email) {
            return res.status(400).json({ message: "Ya hay un usuario con ese email" })
        }
        //Genero Hash
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(usuario.password, salt)
        console.log(hash)

        usuario.password = hash;
        console.log(usuario)

        await usuariosService.createUsuario(usuario);

        return res.json({
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Ha ocurrido un error inesperado" });
    }
}
const login = async (req, res) => {

    const usuario = req.body;

    if (!usuario.email || !usuario.password) {
        return res.status(404).json({ message: error.message })
    }

    try {
        const usuario_db = await usuariosService.getUsuarioByEmail(usuario.email)
        if (!usuario) {
            return res.status(400).json({ message: "No hay un usuario asociado a ese mail" })
        }
        const password = usuario_db.password
        const secret = "nachitobarre"

        const comparison = bcrypt.compareSync(usuario.password, password)
        console.log(comparison)
        if (comparison) {
            const token = jwt.sign({ id: usuario_db.id }, secret, { expiresIn: 30 * 60 });
            return res.status(200).json({
                token: token, usuario: {
                    id: usuario_db.id,
                    nombre: usuario_db.nombre,
                    apellido: usuario_db.apellido,
                    email: usuario_db.email
                }
            })
        }
        if (!comparison) {
            return res.status(400).json({ message: "Contraseña incorrecta" })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const updateAdmin = async (req, res) => {
    const id = req.params.id

    if (!id) {
        res.status(404).json({ message: 'No hay id' })
    }

    try {
        await usuariosService.updateAdmin(id);

    }
    catch (err) {
        return res.status(500).json({ message: 'Error' })
    }
}

export default { register, login, updateAdmin }  