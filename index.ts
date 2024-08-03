import express, { Request, Response } from "express";
import fetchInstagramPosts from "./Services/PostService";
import { google } from "@ai-sdk/google";
import { generateObject, generateText, ImagePart, TextPart } from "ai";
import dotenv from 'dotenv'
import { BackResponse } from "./models/response";
import { z } from "zod";
import cors from 'cors';

dotenv.config()
const app = express();
var corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));


const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello there!");
});

//Zod Schema for the request
const ProfileAnalysisSchema = z.object({
  description: z.string(),
  mbti: z.string()
});

const model = google('models/gemini-1.5-flash-latest');

type ProfileAnalysis = z.infer<typeof ProfileAnalysisSchema>;

app.get("/analisys/:username", async (req, res) => {
  try {
    let username = req.params.username;

    const igresponse = await fetchInstagramPosts(username);

    if(igresponse.urls.length === 0){
      return res.status(400);
    }

    const content: (TextPart | ImagePart)[] = [
      { type: 'text', text: 'analizame este perfil' } as TextPart,
      ...igresponse.urls.map(url => ({ type: 'image', image: url } as ImagePart)),
    ];

    const analysis  = await generateText({
      model: model,
      system: `Eres un analizador de perfiles de instagram, recibiras varias fotografias y daras una descripion profunda de la persona en base a estas, 
      retorna una descripcion de no mas de 250 caracteres y minima de 100 regresa el mbti tentativo de la persona, basado en lo que ves en las fotos
      Basate solo en lo visto en las fotos, intenta dar una descripcion lo mas precisa posible, para que parezca quee es algo mas personal

      Evita decir cosas que suenen genericas, como "eres una persona alegre" o "te gusta la naturaleza", intenta ser mas especifico y detallado
      
      Da la respuesta en primera persona, hacia el usuario, es decir, "Eres, te gusta, admiras, etc..." `,
      messages: [
        {
          role: 'user',
          content: content,
        },
      ],
    });

    const backres: BackResponse = {
      username: username,
      description: analysis.text,
      mbti: 'ENTP'
    }

    res.send(backres);


  }
  catch (error) {
    console.error('Error fetching Instagram posts:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener los posts de Instagram'
    });
  }
});



app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});