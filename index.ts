import express, { Request, Response } from "express";
import fetchInstagramPosts from "./Services/PostService";
import { google } from "@ai-sdk/google";
import { openai } from '@ai-sdk/openai'
import { generateObject, generateText, ImagePart, TextPart } from "ai";
import dotenv from 'dotenv'
import { z } from "zod";

dotenv.config()
const app = express();


const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello there!");
});

// Definimos el esquema Zod para la respuesta
const ProfileAnalysisSchema = z.object({
  description: z.string(),
  mbti: z.string()
});

// Creamos el tipo TypeScript basado en el esquema Zod
type ProfileAnalysis = z.infer<typeof ProfileAnalysisSchema>;

app.get("/getposts/:username", async (req, res) => {
  try {
    let username = req.params.username;
    const posts = await fetchInstagramPosts(username);

    const model = google('models/gemini-1.5-pro-latest');

    const content: (TextPart | ImagePart)[] = [
      { type: 'text', text: 'analizame este perfil' } as TextPart,
      ...posts.map(url => ({ type: 'image', image: url } as ImagePart)),
    ];

    const analysis  = await generateObject<ProfileAnalysis>({
      model: model,
      schema: ProfileAnalysisSchema,
      system: `Eres un analizador de perfiles de instagram, recibiras varias fotografias y daras una descripion profunda de la persona en base a estas, 
      retorna una descripcion de no mas de 100 palabras y minima de 80 y si es posible trata de dar el mbti del usuario

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

    res.send(analysis.object);


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