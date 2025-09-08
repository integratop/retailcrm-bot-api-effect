import { make } from "../../src";
import { Effect, pipe } from "effect";
import { makeHttpClient } from "./makeHttpClient";
import { testLayer } from "./layer";
import { writeFile } from "node:fs/promises";

test("ListChannels", async () => {
  const result = await pipe(
    Effect.gen(function* () {
      const httpClient = yield* makeHttpClient;
      const client = make(httpClient);
      return yield* client.ListChannels();
    }),
    Effect.provide(testLayer),
    Effect.runPromise,
  );

  console.log(result);
  expect(result).toBeDefined();
  await writeFile("tests/unit/data/ListChannels.json", JSON.stringify(result, null, 2), "utf-8");
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
  await writeFile("tests/unit/data/ListChats.json", JSON.stringify(result, null, 2), "utf-8");
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
  await writeFile("tests/unit/data/ListBots.json", JSON.stringify(result, null, 2), "utf-8");
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
  await writeFile("tests/unit/data/ListCommands.json", JSON.stringify(result, null, 2), "utf-8");
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
  await writeFile("tests/unit/data/ListDialogs.json", JSON.stringify(result, null, 2), "utf-8");
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
  await writeFile("tests/unit/data/ListCustomers.json", JSON.stringify(result, null, 2), "utf-8");
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
  await writeFile("tests/unit/data/ListMembers.json", JSON.stringify(result, null, 2), "utf-8");
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
  await writeFile("tests/unit/data/ListMessages.json", JSON.stringify(result, null, 2), "utf-8");
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
  await writeFile("tests/unit/data/ListUsers.json", JSON.stringify(result, null, 2), "utf-8");
});
