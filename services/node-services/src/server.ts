import express from 'express'
import dotenv from 'dotenv'




dotenv.config()

const app = express()


const PORT = process.env.PORT as string

const startServer = async () => {

  app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
  });
};

startServer();