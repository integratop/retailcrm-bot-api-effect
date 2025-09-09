# RetailCRM Bot API Effect Client

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Клиент для RetailCRM Bot API, построенный на библиотеке [Effect](https://effect.website/) для TypeScript. Предоставляет типобезопасный и функциональный интерфейс для работы с RetailCRM Bot API.

## Особенности

- 🚀 **Полная типобезопасность** - все методы и сущности имеют строгие TypeScript типы
- ⚡ **Функциональный подход** - построен на библиотеке Effect для чистого функционального программирования
- 📦 **Автогенерация** - клиент генерируется из OpenAPI схемы RetailCRM
- 🔧 **Гибкая настройка** - поддержка кастомные HTTP клиенты и трансформации
- 🧪 **Тестирование** - включает end-to-end тесты для некоторых методов API

## Установка

```bash
npm install @integratop/retailcrm-bot-api-effect
# или
yarn add @integratop/retailcrm-bot-api-effect
# или
pnpm add @integratop/retailcrm-bot-api-effect
```

## Быстрый старт

### Конфигурация

```typescript
import { Config } from "effect";

export const RETAILCRM_BOT_ENDPOINT = Config.url("RETAILCRM_BOT_ENDPOINT");
export const RETAILCRM_BOT_TOKEN = Config.redacted("RETAILCRM_BOT_TOKEN");
```

Код примера в файле: [config.ts](tests/e2e/config.ts).

### Настройка HTTP клиента

```typescript
import { HttpClient, HttpClientRequest } from "@effect/platform";
import { Effect, flow, pipe, Redacted } from "effect";
import { RETAILCRM_BOT_ENDPOINT, RETAILCRM_BOT_TOKEN } from "./config.js";

export const makeHttpClient = Effect.gen(function* () {
  const baseUrl = yield* RETAILCRM_BOT_ENDPOINT;
  const token = yield* RETAILCRM_BOT_TOKEN;
  const apiUrl = new URL("/api/bot/v1", baseUrl);

  return pipe(
    yield* HttpClient.HttpClient,
    HttpClient.mapRequest(
      flow(
        HttpClientRequest.prependUrl(apiUrl.href),
        HttpClientRequest.setHeaders({
          "X-Bot-Token": `${Redacted.value(token)}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      ),
    ),
  );
});
```

Полный код примера с повторными попытками и `RateLimiter` в файле: [httpClient.ts](tests/e2e/httpClient.ts).

### Настройка Effect Layer

```typescript
import { NodeHttpClient } from "@effect/platform-node";
import { Layer, Logger, LogLevel } from "effect";

export const testLayer = Layer.mergeAll(
  Logger.minimumLogLevel(LogLevel.All),
  NodeHttpClient.layer,
  Layer.scope,
);
```

Код примера в файле: [layer.ts](tests/e2e/layer.ts).

### Пример использования

```typescript
import { make } from "@integratop/retailcrm-bot-api-effect";
import { Effect, pipe } from "effect";
import { makeHttpClient } from "./httpClient.js";
import { testLayer } from "./layer.js";

// Получение списка каналов
async function main() {
  const result = await pipe(
    Effect.gen(function* () {
      // Создание HttpClient
      const httpClient = yield* makeHttpClient;
      // Создание Bot API клиента
      const client = make(httpClient);
      // Запрос списка каналов
      return yield* client.ListChannels();
    }),
    Effect.provide(testLayer),
    Effect.runPromise,
  );

  console.log(result);
}

// Запуск примера
await main();
```

Код примера в файле: [examples.test.ts](tests/e2e/examples.test.ts).

## Bot API

- **Документация**: [RetailCRM Документация: Bot API](https://docs.retailcrm.ru/Developers/API/MGAPI/MGBotAPI)
- **OpenAPI Спецификация**: [integratop/retailcrm-bot-api-schema](https://github.com/integratop/retailcrm-bot-api-schema) 

## Обработка ошибок

Все методы возвращают `Effect`, который может завершиться с ошибкой типа `HttpClientError` или `ParseError`:

```typescript
pipe(
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
```

## Разработка

### Установка зависимостей

```bash
pnpm install
```

### Обновление OpenAPI спецификации

Выполняется через обновление версии зависимости: `@integratop/retailcrm-bot-api-schema`.

### Генерация клиента

```bash
pnpm src
```

### Полная сборка

```bash
pnpm build
```

### Тестирование

```bash
pnpm test
```

## Лицензия

MIT License - смотрите файл [LICENSE](LICENSE) для подробностей.

## Версионирование

Проект использует [Semantic Versioning](https://semver.org/).

## Безопасность

Если вы обнаружили уязвимость безопасности, пожалуйста, сообщите нам об этом.

## Поддержка

Если у вас есть вопросы или предложения, создайте issue в [GitHub репозитории](https://github.com/integratop/retailcrm-bot-api-effect/issues).
