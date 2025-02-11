import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { routes } from "./routes";
import passport from "./routes/auth";
import csrf from "csurf";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: "http://localhost:3000", // L'URL de ton front-end
  credentials: true // Autorise les cookies
}));
app.use(bodyParser.json());
// Initialisation de Passport
app.use(passport.initialize());
app.use(cookieParser("fJBYgyfyuvy65fuyR76RfGHoh"));

// Protection CSRF
/* app.use(csrf()); */

//app.use(passport.session());

// Middleware pour gérer les messages
/* app.use((req: Request, res: Response, next: NextFunction) => {
  const session = (req as Request & { session?: any }).session;
  const msgs = session?.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  if (session) {
    session.messages = [];
  }
  next();
}); */

// Middleware pour fournir le token CSRF
/* app.use((req: Request, res: Response, next: NextFunction) => {
  const csrfToken = (req as Request & { csrfToken: () => string }).csrfToken();
  res.locals.csrfToken = csrfToken;
  next();
}); */

// Routes
app.use("/", routes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
