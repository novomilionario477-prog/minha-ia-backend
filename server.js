
const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
    res.json({
        status: "online",
        nome: "Minha IA"
    });
});

app.post("/chat", async (req, res) => {

    try {

        const mensagem = req.body.message;

        if (!mensagem) {
            return res.status(400).json({
                erro: "Mensagem não enviada"
            });
        }

        const resposta = await openai.responses.create({
            model: "gpt-5.6-luna",
            input: mensagem
        });

        res.json({
            resposta: resposta.output_text
        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao conversar com a IA"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Minha IA rodando na porta ${PORT}`);
});
