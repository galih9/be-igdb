import app from './src/app';

const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});