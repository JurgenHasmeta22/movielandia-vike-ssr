import express from "express";
import { renderPage } from "vike/server";
import { telefunc } from "telefunc";

const isProduction = process.env.NODE_ENV === "production";
const root = `${__dirname}/..`;

startServer();

async function startServer() {
  const app = express();

  if (isProduction) {
    app.use(express.static(`${root}/dist/client`));
  } else {
    const vite = require("vite");

    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;

    app.use(viteDevMiddleware);
  }

  app.use(express.text());

  app.all("/_telefunc", async (req: any, res: any) => {
    const context = {};
    const httpResponse = await telefunc({
      url: req.originalUrl,
      method: req.method,
      body: req.body,
      context,
    });

    const { body, statusCode, contentType } = httpResponse;
    res.status(statusCode).type(contentType).send(body);
  });

  app.get("*", async (req: any, res: any, next: any) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl,
    };

    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;

    if (!httpResponse) return next();

    const { statusCode, headers } = httpResponse;

    res.status(statusCode);
    headers.forEach(([name, value]: any) => res.setHeader(name, value));
    httpResponse.pipe(res);
  });

  const port = process.env.PORT || 4000;

  app.listen(port);

  console.log(`Server running at http://localhost:${port}`);
}
