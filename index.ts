import express, { Request, Response } from "express";
import fetchInstagramPosts from "./Services/PostService";
import { google } from "@ai-sdk/google";
import { generateObject, generateText, ImagePart, TextPart } from "ai";
import dotenv from 'dotenv'
import { BackResponse } from "./models/response";
import { z } from "zod";
import cors from 'cors';
import { openai } from "@ai-sdk/openai";
import getUserPosts from "./Services/igService";

dotenv.config()
const app = express();
var corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));


const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello there!");
});

const model = openai('gpt-4o');

app.get("/analysis/:username", async (req, res) => {
  try {
    let username = req.params.username;

    const igresponse = await getUserPosts(username);

    if(igresponse.urls.length === 0){
      return res.status(400);
    }

    const content: (TextPart | ImagePart)[] = [
      { type: 'text', text: 'analizame este perfil' } as TextPart,
      ...igresponse.urls.map(url => ({ type: 'image', image: url } as ImagePart)),
    ];

    const analysis  = await generateObject({
      model: model,
      schema: z.object({
        desc: z.string(),
        mbti: z.string()
      }),
      system: `Eres un analizador de perfiles de instagram, recibiras varias fotografias y daras una descripion profunda de la persona en base a estas, 
      retorna una descripcion de no mas de 250 caracteres y minima de 100 regresa el mbti tentativo de la persona, basado en lo que ves en las fotos
      Basate solo en lo visto en las fotos, intenta dar una descripcion lo mas precisa posible, para que parezca quee es algo mas personal

      Evita decir cosas que suenen genericas, como "eres una persona alegre" o "te gusta la naturaleza", intenta ser mas especifico y detallado
      
      Da la respuesta en primera persona, hacia el usuario, es decir, "Eres, te gusta, admiras, etc..." Pero no uses tanto el "Eres" `,
      messages: [
        {
          role: 'user',
          content: content,
        },
      ],
    });

    const backres: BackResponse = {
      username: username,
      description: analysis.object.desc,
      mbti: analysis.object.mbti
    }

    res.send(backres);


  }
  catch (error) {
    console.error('Error doing the analysis:', error);
    res.status(500).json({
      success: false,
      error: 'error al hacer el analisis'
    });
  }
});



app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});