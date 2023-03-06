import * as dotenv from "dotenv";
dotenv.config();
import { Configuration, OpenAIApi } from "openai";

console.log(process.env.OPENAI_API_KEY);
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello workd");
});

app.post("/dream", async (req, res) => {
  try {
    const prompt = req.body?.prompt;

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const image = aiResponse.data?.data[0]?.url;
    res.send({ image });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(error?.response.data.error.message || "Something went wrong");
  }
});

app.listen(8080, () => console.log("Make art on http://localhost:8080/drem"));
