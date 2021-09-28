import { ApolloServer } from "apollo-server-express";
import "dotenv-safe/config";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import expressPlayground from "graphql-playground-middleware-express";
import Redis from "ioredis";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { Copil } from "./entities/Copil";
import { Prezenta } from "./entities/Prezenta";
import { PrezentaTopic } from "./entities/PrezentaTopic";
import { User } from "./entities/User";
import { CopilResolver } from "./resolvers/copil";
import { HelloResolver } from "./resolvers/hello";
import { PrezentaResolver } from "./resolvers/prezenta";
import { PrezentaTopicResolver } from "./resolvers/prezentaTopic";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, Copil, Prezenta, PrezentaTopic],
  });
  await conn.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        UserResolver,
        CopilResolver,
        PrezentaResolver,
        PrezentaTopicResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.get(
    "/playground",
    expressPlayground({
      endpoint: "/graphql",
    })
  );

  app.listen(process.env.PORT, () => {
    console.log(`Server Started on port ${process.env.PORT}`);
  });
};

main().catch((err) => {
  console.log(err);
});
