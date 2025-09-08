import { Effect, pipe } from "effect";
import { makeHttpClient } from "./httpClient.js";
import { testLayer } from "./layer.js";
import { make } from "../../src/index.js";

test("ListChannels", async () => {
  const result = await pipe(
    Effect.gen(function* () {
      const httpClient = yield* makeHttpClient;
      const client = make(httpClient);
      return yield* pipe(
        client.ListChannels(),
        // Обработка одного типа ошибки
        Effect.catchTag("ParseError", (error) =>
          Effect.logError(`Failed to parse received data: ${error.message}`),
        ),
        // Обработка двух типов ошибок
        Effect.catchTags({
          RequestError: (error) => Effect.logError(`Failed to make request: ${error.message}`),
          ResponseError: (error) => Effect.logError(`Response error: ${error.message}`),
        }),
      );
    }),
    Effect.provide(testLayer),
    Effect.runPromise,
  );

  console.log(result);
  expect(result).toBeDefined();
});

test("ListChats", async () => {
  const result = await pipe(
    Effect.gen(function* () {
      const httpClient = yield* makeHttpClient;
      const client = make(httpClient);
      return yield* client.ListChats();
    }),
    Effect.provide(testLayer),
    Effect.runPromise,
  );

  console.log(result);
  expect(result).toBeDefined();
});

test("ListBots", async () => {
  const result = await pipe(
    Effect.gen(function* () {
      const httpClient = yield* makeHttpClient;
      const client = make(httpClient);
      return yield* client.ListBots();
    }),
    Effect.provide(testLayer),
    Effect.runPromise,
  );

  console.log(result);
  expect(result).toBeDefined();
});

test("ListCommands", async () => {
  const result = await pipe(
    Effect.gen(function* () {
      const httpClient = yield* makeHttpClient;
      const client = make(httpClient);
      return yield* client.ListCommands();
    }),
    Effect.provide(testLayer),
    Effect.runPromise,
  );

  console.log(result);
  expect(result).toBeDefined();
});

test("ListDialogs", async () => {
  const result = await pipe(
    Effect.gen(function* () {
      const httpClient = yield* makeHttpClient;
      const client = make(httpClient);
      return yield* client.ListDialogs();
    }),
    Effect.provide(testLayer),
    Effect.runPromise,
  );

  console.log(result);
  expect(result).toBeDefined();
});

test("ListCustomers", async () => {
  const result = await pipe(
    Effect.gen(function* () {
      const httpClient = yield* makeHttpClient;
      const client = make(httpClient);
      return yield* client.ListCustomers();
    }),
    Effect.provide(testLayer),
    Effect.runPromise,
  );

  console.log(result);
  expect(result).toBeDefined();
});

test("ListMembers", async () => {
  const result = await pipe(
    Effect.gen(function* () {
      const httpClient = yield* makeHttpClient;
      const client = make(httpClient);
      return yield* client.ListMembers();
    }),
    Effect.provide(testLayer),
    Effect.runPromise,
  );

  console.log(result);
  expect(result).toBeDefined();
});

test("ListMessages", async () => {
  const result = await pipe(
    Effect.gen(function* () {
      const httpClient = yield* makeHttpClient;
      const client = make(httpClient);
      return yield* client.ListMessages();
    }),
    Effect.provide(testLayer),
    Effect.runPromise,
  );

  console.log(result);
  expect(result).toBeDefined();
});

test("ListUsers", async () => {
  const result = await pipe(
    Effect.gen(function* () {
      const httpClient = yield* makeHttpClient;
      const client = make(httpClient);
      return yield* client.ListUsers();
    }),
    Effect.provide(testLayer),
    Effect.runPromise,
  );

  console.log(result);
  expect(result).toBeDefined();
});
