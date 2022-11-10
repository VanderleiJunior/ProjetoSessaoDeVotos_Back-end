const express = require("express");

const todosRoutes = express.Router();
const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");

const prisma = new PrismaClient();

todosRoutes.post("/politico", async (request, response) => {
    var {nomePolitico} = request.body;
    const {senha} = request.body;

    const politico = await prisma.politico.create({
        data: {
            nomePolitico,
            senha
        }
    });

    return response.status(201).json(politico)
})


todosRoutes.get("/politico/:nomePolitico/:senha", async (request, response) => {
    const {nomePolitico, senha} = request.params;

    const politicoExist = await prisma.politico.findFirst({ where: { nomePolitico, senha}});

    if (!politicoExist) {
        return response.status(404).json("Politico not exist");
    }


    return response.status(200).json(nomePolitico)
})

todosRoutes.get("/sessoes", async (request, response) => {
    const sessoes = await prisma.sessao.findMany()

    if(!sessoes) {
        return response.status(404).json("Sessoes not exist")
    }

    return response.status(200).json(sessoes)
})

todosRoutes.get("/sessoes/:id", async (request, response) => {
    const {id} = request.params


    const sessaoVotada = await prisma.sessao.findUnique({ where: {id: Number(id)}})

    return response.status(200).json(sessaoVotada)
})

todosRoutes.put("/sessoes", async (request, response) => {
    const {id, votosFavor, votosContra} = request.body
    const sessoes = await prisma.sessao.update({
        where : {
            id,
        },
        data: {
            votosFavor,
            votosContra
        }
    });

    return response.status(200).json(sessoes)
})

todosRoutes.delete("/politico/:id", async(request, response) => {
    const {id} = request.params;

    const intId = parseInt(id)
    if (!intId) {
        return response.status(400).json("Id is mandatory");
    }

    const politicoAlreadyExist = await prisma.politico.findUnique({ where: { idPolitico: intId }});

    if (!politicoAlreadyExist) {
        return response.status(404).json("Todo not exist");
    }

    await prisma.politico.delete({where: { idPolitico: intId }});
    return response.status(200).send();
})



module.exports = todosRoutes;