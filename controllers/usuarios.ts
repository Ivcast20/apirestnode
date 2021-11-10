import {Request,Response}  from 'express';
import Usuario from '../models/usuario';


export const getUsuarios = async(req:Request,res:Response) => {
    const usuarios = await Usuario.findAll();
    res.json({
        usuarios
    });
}

export const getUsuario = async(req:Request,res:Response) => {
    const {id} = req.params;
    const usuario = await Usuario.findByPk( id )
    if (usuario) {
        res.json({usuario});
    }else{
        res.status(404).json({
            msg: "No existe el id"
        })
    }
}

export const postUsuario = async(req:Request,res:Response) => {
    const {body} = req;
    try {
        const existeUsuario = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeUsuario)
        {
            return res.status(400).json({
                msg: `Ya existe el email ${body.email}`
            })
        }

        const usuario = Usuario.build(body);
        await usuario.save();
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al insertar al nuevo usuario"
        });
    }
}

export const putUsuario = async(req:Request, res:Response) => {
    const {id} = req.params;
    const {body} = req;
    try {
        const usuario = await Usuario.findByPk( id );
        if (!usuario)
        {
            return res.status(404).json({
                msg: 'No existe ese usuario'
            })
        }
        await usuario.update(body);
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al Actualizar al nuevo usuario"
        });
    }
}

export const deleteUsuario = async(req:Request, res:Response) => {
    const {id} = req.params;
    const usuario = await Usuario.findByPk( id );
    if (!usuario)
    {
        return res.status(404).json({
            msg: `No existe el usuario con el id ${id}`
        });
    }
    // await usuario.destroy(); eliminación física
    await usuario.update({estado: 0});
    res.json(usuario);
}



