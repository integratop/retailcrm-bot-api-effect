import type * as HttpClient from "@effect/platform/HttpClient";
import * as HttpClientError from "@effect/platform/HttpClientError";
import * as HttpClientRequest from "@effect/platform/HttpClientRequest";
import * as HttpClientResponse from "@effect/platform/HttpClientResponse";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import type { ParseError } from "effect/ParseResult";
import * as S from "effect/Schema";

/**
 * Логический тип
 */
export class Boolean extends S.Literal("1", "0", "true", "false") {}

/**
 * Тип роли бота
 */
export class Role extends S.Literal("responsible", "distributor", "hidden") {}

/**
 * Массив типов ролей бота
 */
export class Roles extends S.Array(Role) {}

export class ListBotsParams extends S.Struct({
  id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  active: S.optionalWith(Boolean, { nullable: true }),
  role: S.optionalWith(Roles, { nullable: true }),
  since: S.optionalWith(S.String, { nullable: true }),
  since_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  until: S.optionalWith(S.String, { nullable: true }),
  until_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  limit: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1), S.lessThanOrEqualTo(1000)), {
    nullable: true,
  }),
}) {}

/**
 * Информация о боте
 */
export class Bot extends S.Class<Bot>("@integratop/retailcrm-bot-api-effect/Bot")({
  /**
   * Публичный URL аватара бота
   */
  avatar_url: S.optionalWith(S.String, { nullable: true }),
  /**
   * Уникальный внешний идентификатор клиента бота
   */
  client_id: S.String,
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  created_at: S.String,
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  deactivated_at: S.optionalWith(S.String, { nullable: true }),
  /**
   * Внутренний уникальный идентификатор бота
   */
  id: S.Int,
  /**
   * Показывает, активен ли бот
   */
  is_active: S.Boolean,
  /**
   * Показывает, является ли этот бот текущим аутентифицированным
   */
  is_self: S.Boolean,
  /**
   * Показывает, является ли бот системным
   */
  is_system: S.Boolean,
  /**
   * Читаемое имя бота
   */
  name: S.String,
  /**
   * Список ролей, назначенных боту
   */
  roles: S.Array(Role),
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  updated_at: S.optionalWith(S.String, { nullable: true }),
}) {}

export class ListBots200 extends S.Array(Bot) {}

export class ListBotsDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class UpdateBot200 extends S.Struct({}) {}

export class UpdateBotDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

/**
 * Тип канала, используемого для общения
 */
export class ChannelType extends S.Literal(
  "telegram",
  "fbmessenger",
  "viber",
  "whatsapp",
  "skype",
  "vk",
  "instagram",
  "consultant",
  "yandex_chat",
  "odnoklassniki",
  "max",
  "ozon",
  "wildberries",
  "yandex_market",
  "mega_market",
  "avito",
  "drom",
  "youla",
  "custom",
) {}

export class ListChannelsParams extends S.Struct({
  id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  types: S.optionalWith(S.Array(ChannelType), { nullable: true }),
  active: S.optionalWith(Boolean, { nullable: true }),
  since: S.optionalWith(S.String, { nullable: true }),
  since_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  until: S.optionalWith(S.String, { nullable: true }),
  until_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  limit: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1), S.lessThanOrEqualTo(1000)), {
    nullable: true,
  }),
}) {}

/**
 * Поддержка операций с сообщениями указанного типа
 */
export class ChannelFeature extends S.Literal("none", "receive", "send", "both") {}

/**
 * Поддержка текстовых сообщений
 */
export class TextMessageSetting extends S.Class<TextMessageSetting>(
  "@integratop/retailcrm-bot-api-effect/TextMessageSetting",
)({
  creating: S.optionalWith(ChannelFeature, { nullable: true }),
  deleting: S.optionalWith(ChannelFeature, { nullable: true }),
  editing: S.optionalWith(ChannelFeature, { nullable: true }),
  quoting: S.optionalWith(ChannelFeature, { nullable: true }),
  reaction: S.optionalWith(ChannelFeature, { nullable: true }),
  /**
   * Максимальное число символов в текстовом сообщении
   */
  max_chars_count: S.optionalWith(S.Int, { nullable: true }),
}) {}

/**
 * Настройки поддержки аудио сообщений в канале
 */
export class AudioMessageSetting extends S.Class<AudioMessageSetting>(
  "@integratop/retailcrm-bot-api-effect/AudioMessageSetting",
)({
  creating: S.optionalWith(ChannelFeature, { nullable: true }),
  deleting: S.optionalWith(ChannelFeature, { nullable: true }),
  quoting: S.optionalWith(ChannelFeature, { nullable: true }),
  reaction: S.optionalWith(ChannelFeature, { nullable: true }),
  /**
   * Максимальный размер аудио‑файла (байт)
   */
  max_item_size: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Максимальное число аудио‑вложений в сообщении
   */
  max_items_count: S.optionalWith(S.Int, { nullable: true }),
}) {}

/**
 * Поддержка сообщений с файлами
 */
export class FileMessageSetting extends S.Class<FileMessageSetting>(
  "@integratop/retailcrm-bot-api-effect/FileMessageSetting",
)({
  creating: S.optionalWith(ChannelFeature, { nullable: true }),
  deleting: S.optionalWith(ChannelFeature, { nullable: true }),
  editing: S.optionalWith(ChannelFeature, { nullable: true }),
  quoting: S.optionalWith(ChannelFeature, { nullable: true }),
  reaction: S.optionalWith(ChannelFeature, { nullable: true }),
  /**
   * Максимальный размер файла для отправки
   */
  max_item_size: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Максимальное число файловых вложений в сообщении
   */
  max_items_count: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Максимальное количество символов в аннотации к файловому сообщению
   */
  note_max_chars_count: S.optionalWith(S.Int, { nullable: true }),
}) {}

/**
 * Поддержка медиа‑сообщений
 */
export class ImageMessageSetting extends S.Class<ImageMessageSetting>(
  "@integratop/retailcrm-bot-api-effect/ImageMessageSetting",
)({
  creating: S.optionalWith(ChannelFeature, { nullable: true }),
  deleting: S.optionalWith(ChannelFeature, { nullable: true }),
  editing: S.optionalWith(ChannelFeature, { nullable: true }),
  quoting: S.optionalWith(ChannelFeature, { nullable: true }),
  reaction: S.optionalWith(ChannelFeature, { nullable: true }),
  /**
   * Максимальный размер изображения для отправки
   */
  max_item_size: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Максимальное количество медиа-вложений в сообщении
   */
  max_items_count: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Максимум символов в аннотации медиа‑сообщения
   */
  note_max_chars_count: S.optionalWith(S.Int, { nullable: true }),
}) {}

/**
 * Поддержка сообщений о заказах
 */
export class OrderMessageSetting extends S.Class<OrderMessageSetting>(
  "@integratop/retailcrm-bot-api-effect/OrderMessageSetting",
)({
  creating: S.optionalWith(ChannelFeature, { nullable: true }),
  deleting: S.optionalWith(ChannelFeature, { nullable: true }),
  editing: S.optionalWith(ChannelFeature, { nullable: true }),
  reaction: S.optionalWith(ChannelFeature, { nullable: true }),
  quoting: S.optionalWith(ChannelFeature, { nullable: true }),
}) {}

/**
 * Поддержка сообщений о продукте
 */
export class ProductMessageSetting extends S.Class<ProductMessageSetting>(
  "@integratop/retailcrm-bot-api-effect/ProductMessageSetting",
)({
  creating: S.optionalWith(ChannelFeature, { nullable: true }),
  deleting: S.optionalWith(ChannelFeature, { nullable: true }),
  editing: S.optionalWith(ChannelFeature, { nullable: true }),
  reaction: S.optionalWith(ChannelFeature, { nullable: true }),
  quoting: S.optionalWith(ChannelFeature, { nullable: true }),
}) {}

/**
 * Поддержка внешних идентификаторов клиентов
 */
export class CustomerExternalId extends S.Literal("any", "phone") {}

/**
 * Типы сообщений, отправляемых после истечения времени ответа
 */
export class SendingPolicyAfterReplyTimeout extends S.Literal("no", "template") {}

/**
 * Типы сообщений для отправки новому клиенту
 */
export class SendingPolicyNewCustomer extends S.Literal("no", "template", "text") {}

/**
 * Поддержка исходящих сообщений
 */
export class SendingPolicyOutgoing extends S.Literal("allowed", "restricted") {}

/**
 * Политика отправки сообщений
 */
export class SendingPolicy extends S.Class<SendingPolicy>(
  "@integratop/retailcrm-bot-api-effect/SendingPolicy",
)({
  after_reply_timeout: S.optionalWith(SendingPolicyAfterReplyTimeout, { nullable: true }),
  new_customer: S.optionalWith(SendingPolicyNewCustomer, { nullable: true }),
  outgoing: S.optionalWith(SendingPolicyOutgoing, { nullable: true }),
}) {}

/**
 * Передача информации о статусе сообщения
 */
export class StatusSetting extends S.Class<StatusSetting>(
  "@integratop/retailcrm-bot-api-effect/StatusSetting",
)({
  delivered: S.optionalWith(ChannelFeature, { nullable: true }),
  read: S.optionalWith(ChannelFeature, { nullable: true }),
}) {}

/**
 * Поддержка типов быстрых ответов
 */
export class Suggestions extends S.Class<Suggestions>(
  "@integratop/retailcrm-bot-api-effect/Suggestions",
)({
  email: S.optionalWith(ChannelFeature, { nullable: true }),
  phone: S.optionalWith(ChannelFeature, { nullable: true }),
  text: S.optionalWith(ChannelFeature, { nullable: true }),
  url: S.optionalWith(ChannelFeature, { nullable: true }),
}) {}

/**
 * Поддержка шаблонов сообщений
 */
export class TemplateSetting extends S.Class<TemplateSetting>(
  "@integratop/retailcrm-bot-api-effect/TemplateSetting",
)({
  /**
   * Поддержка создания шаблонов в системе
   */
  creation: S.optionalWith(S.Boolean, { nullable: true }),
}) {}

/**
 * Качество канала WhatsApp
 */
export class WAChannelQuality extends S.Literal("high", "medium", "low") {}

/**
 * Статус канала WhatsApp
 */
export class WAChannelStatus extends S.Literal(
  "connected",
  "flagged",
  "offline",
  "pending",
  "restricted",
) {}

/**
 * Свойства канала WhatsApp
 */
export class WAChannelProperties extends S.Class<WAChannelProperties>(
  "@integratop/retailcrm-bot-api-effect/WAChannelProperties",
)({
  channel_quality: S.optionalWith(WAChannelQuality, { nullable: true }),
  channel_status: S.optionalWith(WAChannelStatus, { nullable: true }),
  tier: S.optionalWith(S.Int, { nullable: true }),
}) {}

/**
 * Поддержка работы с реакциями на сообщения
 */
export class Reactions extends S.Class<Reactions>("@integratop/retailcrm-bot-api-effect/Reactions")(
  {
    /**
     * Словарь доступных реакций
     */
    dictionary: S.optionalWith(S.Array(S.String), { nullable: true }),
    /**
     * Максимальное число реакций, добавляемых системой
     */
    max_count: S.optionalWith(S.Int, { nullable: true }),
  },
) {}

/**
 * Настройки и возможности конкретного канала связи
 */
export class ChannelSettings extends S.Class<ChannelSettings>(
  "@integratop/retailcrm-bot-api-effect/ChannelSettings",
)({
  text: S.optionalWith(TextMessageSetting, { nullable: true }),
  audio: S.optionalWith(AudioMessageSetting, { nullable: true }),
  file: S.optionalWith(FileMessageSetting, { nullable: true }),
  image: S.optionalWith(ImageMessageSetting, { nullable: true }),
  order: S.optionalWith(OrderMessageSetting, { nullable: true }),
  product: S.optionalWith(ProductMessageSetting, { nullable: true }),
  customer_external_id: S.optionalWith(CustomerExternalId, { nullable: true }),
  sending_policy: S.optionalWith(SendingPolicy, { nullable: true }),
  status: S.optionalWith(StatusSetting, { nullable: true }),
  suggestions: S.optionalWith(Suggestions, { nullable: true }),
  template: S.optionalWith(TemplateSetting, { nullable: true }),
  whatsapp: S.optionalWith(WAChannelProperties, { nullable: true }),
  reactions: S.optionalWith(Reactions, { nullable: true }),
}) {}

/**
 * Канал связи, используемый ботом
 */
export class ChannelListResponseItem extends S.Class<ChannelListResponseItem>(
  "@integratop/retailcrm-bot-api-effect/ChannelListResponseItem",
)({
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  activated_at: S.String,
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  created_at: S.String,
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  deactivated_at: S.optionalWith(S.String, { nullable: true }),
  /**
   * Уникальный идентификатор канала
   */
  id: S.Int,
  /**
   * Показывает, активен ли канал
   */
  is_active: S.Boolean,
  /**
   * Необязательное читаемое имя канала
   */
  name: S.optionalWith(S.String, { nullable: true }),
  /**
   * Конфигурационные настройки, специфичные для типа канала
   */
  settings: ChannelSettings,
  /**
   * Тип канала связи
   */
  type: ChannelType,
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  updated_at: S.optionalWith(S.String, { nullable: true }),
}) {}

export class ListChannels200 extends S.Array(ChannelListResponseItem) {}

export class ListChannelsDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class ListChatsParams extends S.Struct({
  id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  since: S.optionalWith(S.String, { nullable: true }),
  until: S.optionalWith(S.String, { nullable: true }),
  limit: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1), S.lessThanOrEqualTo(1000)), {
    nullable: true,
  }),
  since_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  until_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  channel_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  channel_type: S.optionalWith(ChannelType, { nullable: true }),
  customer_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  customer_external_id: S.optionalWith(S.String.pipe(S.minLength(1)), { nullable: true }),
  include_mass_communication: S.optionalWith(Boolean, { nullable: true }),
}) {}

/**
 * Представляет канал связи, используемый ботом
 */
export class Channel extends S.Class<Channel>("@integratop/retailcrm-bot-api-effect/Channel")({
  /**
   * URI пользовательского аватара канала
   */
  avatar: S.String,
  /**
   * Уникальный идентификатор канала
   */
  id: S.Int,
  /**
   * Показывает, активен ли канал
   */
  is_active: S.Boolean,
  /**
   * Необязательное читаемое имя канала
   */
  name: S.optionalWith(S.String, { nullable: true }),
  /**
   * Конфигурационные настройки, специфичные для типа канала
   */
  settings: ChannelSettings,
  /**
   * Идентификатор базовой транспортной системы канала
   */
  transport_id: S.Int,
  /**
   * Тип канала связи
   */
  type: ChannelType,
}) {}

export class ActorType extends S.Literal("user", "bot", "customer", "channel") {}

/**
 * Участник чата
 */
export class Actor extends S.Class<Actor>("@integratop/retailcrm-bot-api-effect/Actor")({
  /**
   * Идентификатор пользователя
   */
  id: S.Int,
  /**
   * Индикатор статуса пользователя (только для типа «user»)
   */
  available: S.optionalWith(S.Boolean, { nullable: true }),
  /**
   * Аватар пользователя
   */
  avatar: S.optionalWith(S.String, { nullable: true }),
  /**
   * Электронная почта пользователя (только тип «customer»)
   */
  email: S.optionalWith(S.String, { nullable: true }),
  /**
   * Внешний идентификатор пользователя
   */
  external_id: S.String,
  /**
   * Имя пользователя (только для типов customer и user)
   */
  first_name: S.optionalWith(S.String, { nullable: true }),
  /**
   * Индикатор блокировки пользователя (только тип «customer»)
   */
  is_blocked: S.optionalWith(S.Boolean, { nullable: true }),
  /**
   * Индикатор системного пользователя (только для типа bot)
   */
  is_system: S.optionalWith(S.Boolean, { nullable: true }),
  /**
   * Индикатор технической учётной записи (только для пользователя типа user)
   */
  is_technical_account: S.optionalWith(S.Boolean, { nullable: true }),
  /**
   * Фамилия пользователя (только для типов «customer» и «user»)
   */
  last_name: S.optionalWith(S.String, { nullable: true }),
  /**
   * Никнейм пользователя
   */
  name: S.String,
  /**
   * Телефонный номер пользователя
   */
  phone: S.optionalWith(S.String, { nullable: true }),
  type: ActorType,
  /**
   * Имя пользователя (только для типа «customer»)
   */
  username: S.optionalWith(S.String, { nullable: true }),
}) {}

/**
 * UTM‑параметры для отслеживания маркетинговых кампаний
 */
export class Utm extends S.Class<Utm>("@integratop/retailcrm-bot-api-effect/Utm")({
  /**
   * Кампания
   */
  campaign: S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(255)), { nullable: true }),
  /**
   * Рекламный контент
   */
  content: S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(255)), { nullable: true }),
  /**
   * Средство/носитель
   */
  medium: S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(255)), { nullable: true }),
  /**
   * Источник
   */
  source: S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(255)), { nullable: true }),
  /**
   * Ключевое слово
   */
  term: S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(255)), { nullable: true }),
}) {}

/**
 * Объект диалога
 */
export class Dialog extends S.Class<Dialog>("@integratop/retailcrm-bot-api-effect/Dialog")({
  id: S.Int,
  /**
   * Дата и время в формате RFC 3339
   */
  created_at: S.String,
  /**
   * Дата и время в формате RFC 3339
   */
  closed_at: S.optionalWith(S.String, { nullable: true }),
  assigned_at: S.optionalWith(S.String, { nullable: true }),
  responsible: S.optionalWith(Actor, { nullable: true }),
  utm: S.optionalWith(Utm, { nullable: true }),
}) {}

/**
 * Системное действие сообщения (только для сообщений типа system)
 */
export class SystemAction extends S.Literal(
  "dialog_opened",
  "dialog_closed",
  "user_joined",
  "user_left",
  "dialog_assign",
  "customer_blocked",
  "customer_unblocked",
  "dialog_unassign",
) {}

/**
 * Определяет возможные действия, которые можно выполнить с сообщением
 */
export class MessageAction extends S.Literal("edit", "delete", "quote") {}

/**
 * Диалог сообщений
 */
export class MessageDialog extends S.Class<MessageDialog>(
  "@integratop/retailcrm-bot-api-effect/MessageDialog",
)({
  /**
   * Идентификатор диалога
   */
  id: S.Int,
}) {}

/**
 * Код ошибки сообщения
 */
export class MessageErrorCode extends S.Literal(
  "unknown",
  "network_error",
  "malformed_response",
  "async_send_timeout",
  "general",
  "customer_not_exists",
  "reply_timed_out",
  "spam_suspicion",
  "access_restricted",
) {}

/**
 * Подробности ошибки сообщения (только для сообщений со статусом `failed`)
 */
export class MessageError extends S.Class<MessageError>(
  "@integratop/retailcrm-bot-api-effect/MessageError",
)({
  code: MessageErrorCode,
  /**
   * Текстовое описание ошибки
   */
  message: S.optionalWith(S.String, { nullable: true }),
}) {}

/**
 * Звуковая диаграмма (только для аудио-сообщений)
 */
export class Histogram extends S.Array(S.Int) {}

/**
 * Тип файла
 */
export class FileType extends S.Literal("none", "image", "video", "file", "audio") {}

/**
 * Прикреплённый файл сообщения
 */
export class MessageFile extends S.Class<MessageFile>(
  "@integratop/retailcrm-bot-api-effect/MessageFile",
)({
  /**
   * UUID вложенного файла
   */
  id: S.optionalWith(S.String, { nullable: true }),
  /**
   * Текстовое описание медиа‑вложения
   */
  caption: S.optionalWith(S.String, { nullable: true }),
  /**
   * Длительность аудиозаписи (только для сообщений типа audio)
   */
  duration: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Размер вложения (в байтах)
   */
  size: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Высота изображения в пикселях (только для сообщений типа image)
   */
  height: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Ширина изображения в пикселях (только для сообщений типа image)
   */
  width: S.optionalWith(S.Int, { nullable: true }),
  histogram: S.optionalWith(Histogram, { nullable: true }),
  kind: S.optionalWith(FileType, { nullable: true }),
  /**
   * URL файла для загрузки
   */
  preview_url: S.optionalWith(S.String, { nullable: true }),
  /**
   * Транскрипция загруженного файла
   */
  transcription: S.optionalWith(S.String, { nullable: true }),
  /**
   * Тип вложения
   */
  type: S.optionalWith(S.String, { nullable: true }),
}) {}

/**
 * Денежная величина с указанием валюты
 */
export class Cost extends S.Class<Cost>("@integratop/retailcrm-bot-api-effect/Cost")({
  /**
   * Код валюты
   */
  currency: S.String.pipe(S.minLength(3), S.maxLength(3)),
  /**
   * Числовое значение стоимости
   */
  value: S.Number.pipe(S.greaterThanOrEqualTo(0)),
}) {}

/**
 * Информация о доставке заказа
 */
export class MessageOrderDelivery extends S.Class<MessageOrderDelivery>(
  "@integratop/retailcrm-bot-api-effect/MessageOrderDelivery",
)({
  /**
   * Адрес доставки
   */
  address: S.optionalWith(S.String, { nullable: true }),
  /**
   * Комментарий к доставке
   */
  comment: S.optionalWith(S.String, { nullable: true }),
  /**
   * Название метода доставки
   */
  name: S.optionalWith(S.String, { nullable: true }),
  price: S.optionalWith(Cost, { nullable: true }),
}) {}

/**
 * Количество
 */
export class Quantity extends S.Class<Quantity>("@integratop/retailcrm-bot-api-effect/Quantity")({
  /**
   * Единицы измерения
   */
  unit: S.optionalWith(S.String.pipe(S.maxLength(16)), { nullable: true }),
  /**
   * Количественное значение
   */
  value: S.optionalWith(S.Number.pipe(S.greaterThanOrEqualTo(0)), { nullable: true }),
}) {}

/**
 * Товар заказа
 */
export class MessageOrderItem extends S.Class<MessageOrderItem>(
  "@integratop/retailcrm-bot-api-effect/MessageOrderItem",
)({
  /**
   * Внешний идентификатор продукта
   */
  external_id: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Изображение продукта
   */
  img: S.optionalWith(S.String.pipe(S.maxLength(2048)), { nullable: true }),
  /**
   * Название продукта
   */
  name: S.optionalWith(S.String.pipe(S.maxLength(255)), { nullable: true }),
  price: S.optionalWith(Cost, { nullable: true }),
  quantity: S.optionalWith(Quantity, { nullable: true }),
  /**
   * URL продукта
   */
  url: S.optionalWith(S.String.pipe(S.maxLength(2048)), { nullable: true }),
}) {}

/**
 * Статус оплаты заказа
 */
export class MessageOrderPaymentStatus extends S.Class<MessageOrderPaymentStatus>(
  "@integratop/retailcrm-bot-api-effect/MessageOrderPaymentStatus",
)({
  /**
   * Название платежа
   */
  name: S.optionalWith(S.String, { nullable: true }),
  /**
   * Индикатор выполнения платежа
   */
  payed: S.optionalWith(S.Boolean, { nullable: true }),
}) {}

/**
 * Информация об оплате заказа
 */
export class MessageOrderPayment extends S.Class<MessageOrderPayment>(
  "@integratop/retailcrm-bot-api-effect/MessageOrderPayment",
)({
  amount: S.optionalWith(Cost, { nullable: true }),
  /**
   * Название платежа
   */
  name: S.optionalWith(S.String, { nullable: true }),
  status: S.optionalWith(MessageOrderPaymentStatus, { nullable: true }),
}) {}

/**
 * Код статуса
 */
export class MessageOrderStatusCode extends S.Literal(
  "new",
  "approval",
  "assembling",
  "delivery",
  "complete",
  "cancel",
) {}

/**
 * Статус заказа
 */
export class MessageOrderStatus extends S.Class<MessageOrderStatus>(
  "@integratop/retailcrm-bot-api-effect/MessageOrderStatus",
)({
  code: S.optionalWith(MessageOrderStatusCode, { nullable: true }),
  /**
   * Название статуса
   */
  name: S.optionalWith(S.String.pipe(S.maxLength(255)), { nullable: true }),
}) {}

/**
 * Представляет детали заказа в сообщении
 */
export class MessageOrder extends S.Class<MessageOrder>(
  "@integratop/retailcrm-bot-api-effect/MessageOrder",
)({
  /**
   * Внешний идентификатор заказа
   */
  external_id: S.optionalWith(S.Int, { nullable: true }),
  cost: S.optionalWith(Cost, { nullable: true }),
  /**
   * Дата создания заказа
   */
  date: S.optionalWith(S.String, { nullable: true }),
  delivery: S.optionalWith(MessageOrderDelivery, { nullable: true }),
  discount: S.optionalWith(Cost, { nullable: true }),
  /**
   * Массив элементов заказа
   */
  items: S.optionalWith(S.Array(MessageOrderItem), { nullable: true }),
  /**
   * Номер заказа
   */
  number: S.optionalWith(S.String.pipe(S.maxLength(255)), { nullable: true }),
  /**
   * Массив платежей
   */
  payments: S.optionalWith(S.Array(MessageOrderPayment), { nullable: true }),
  status: S.optionalWith(MessageOrderStatus, { nullable: true }),
  /**
   * URL заказа
   */
  url: S.optionalWith(S.String.pipe(S.maxLength(2048)), { nullable: true }),
}) {}

/**
 * Описание продукта, упомянутого в сообщении
 */
export class MessageProduct extends S.Class<MessageProduct>(
  "@integratop/retailcrm-bot-api-effect/MessageProduct",
)({
  /**
   * Идентификатор продукта
   */
  id: S.Int,
  /**
   * Описание продукта
   */
  article: S.optionalWith(S.String.pipe(S.maxLength(128)), { nullable: true }),
  cost: S.optionalWith(Cost, { nullable: true }),
  /**
   * URL изображения продукта
   */
  img: S.optionalWith(S.String.pipe(S.maxLength(2048)), { nullable: true }),
  /**
   * Название продукта
   */
  name: S.String.pipe(S.minLength(1), S.maxLength(255)),
  /**
   * Единицы измерения продукта
   */
  unit: S.optionalWith(S.String.pipe(S.maxLength(16)), { nullable: true }),
  /**
   * URL продукта
   */
  url: S.optionalWith(S.String.pipe(S.maxLength(2048)), { nullable: true }),
}) {}

/**
 * Тип сообщения
 */
export class MessageType extends S.Literal(
  "text",
  "system",
  "command",
  "order",
  "product",
  "file",
  "image",
  "audio",
) {}

/**
 * Цитируемое сообщение
 */
export class QuoteMessage extends S.Class<QuoteMessage>(
  "@integratop/retailcrm-bot-api-effect/QuoteMessage",
)({
  /**
   * Идентификатор цитируемого сообщения
   */
  id: S.Int,
  /**
   * Текст сообщения
   */
  content: S.optionalWith(S.String, { nullable: true }),
  from: S.optionalWith(Actor, { nullable: true }),
  /**
   * Медиа‑вложения цитируемого сообщения
   */
  items: S.optionalWith(S.Array(MessageFile), { nullable: true }),
  /**
   * Время отправки сообщения
   */
  time: S.String,
  type: MessageType,
}) {}

/**
 * Область сообщения
 */
export class MessageScope extends S.Literal("undefined", "public", "private") {}

/**
 * Статус сообщения
 */
export class MessageStatus extends S.Literal(
  "undefined",
  "received",
  "sending",
  "sent",
  "failed",
  "seen",
) {}

/**
 * Тип быстрого ответа
 */
export class SuggestionType extends S.Literal("text", "email", "phone", "url") {}

/**
 * Предложение быстрого ответа
 */
export class Suggestion extends S.Class<Suggestion>(
  "@integratop/retailcrm-bot-api-effect/Suggestion",
)({
  /**
   * Payload быстрого ответа
   */
  payload: S.optionalWith(S.String, { nullable: true }),
  /**
   * Название быстрого ответа
   */
  title: S.optionalWith(S.String, { nullable: true }),
  type: S.optionalWith(SuggestionType, { nullable: true }),
}) {}

/**
 * Транспортные вложения
 */
export class MessageTransportAttachments extends S.Class<MessageTransportAttachments>(
  "@integratop/retailcrm-bot-api-effect/MessageTransportAttachments",
)({
  /**
   * Быстрые ответы
   */
  suggestions: S.optionalWith(S.Array(Suggestion), { nullable: true }),
}) {}

/**
 * Объект, представляющий одно чат‑сообщение
 */
export class Message extends S.Class<Message>("@integratop/retailcrm-bot-api-effect/Message")({
  /**
   * Системное действие, отображаемое сообщением
   */
  action: S.optionalWith(SystemAction, { nullable: true }),
  /**
   * Список интерактивных действий, связанных с сообщением
   */
  actions: S.Array(MessageAction),
  /**
   * ID чата, к которому относится это сообщение
   */
  chat_id: S.Int,
  /**
   * Текстовое содержимое сообщения
   */
  content: S.optionalWith(S.String, { nullable: true }),
  /**
   * Необязательный диалог, связанный с сообщением
   */
  dialog: S.optionalWith(MessageDialog, { nullable: true }),
  /**
   * Информация об ошибке, связанной с отправкой или обработкой сообщения
   */
  error: S.optionalWith(MessageError, { nullable: true }),
  /**
   * Отправитель сообщения
   */
  from: S.optionalWith(Actor, { nullable: true }),
  /**
   * Уникальный идентификатор сообщения
   */
  id: S.Int,
  /**
   * Показывает, редактировалось ли сообщение
   */
  is_edit: S.Boolean,
  /**
   * Показывает, было ли сообщение прочитано
   */
  is_read: S.Boolean,
  /**
   * Список прикреплённых файлов
   */
  items: S.optionalWith(S.Array(MessageFile), { nullable: true }),
  /**
   * Необязательное внутреннее примечание или комментарий к сообщению
   */
  note: S.optionalWith(S.String, { nullable: true }),
  /**
   * Необязательные данные заказа, связанные с сообщением
   */
  order: S.optionalWith(MessageOrder, { nullable: true }),
  /**
   * Необязательные данные о продукте, упомянутые в сообщении
   */
  product: S.optionalWith(MessageProduct, { nullable: true }),
  /**
   * Цитируемое сообщение (если это ответ)
   */
  quote: S.optionalWith(QuoteMessage, { nullable: true }),
  /**
   * Пользователь, ответственный за это сообщение или задачу
   */
  responsible: S.optionalWith(Actor, { nullable: true }),
  /**
   * Область сообщения
   */
  scope: MessageScope,
  /**
   * Текущий статус сообщения
   */
  status: MessageStatus,
  /**
   * Метка времени создания сообщения
   */
  time: S.String,
  /**
   * Вложения, специфичные для транспортного уровня
   */
  transport_attachments: S.optionalWith(MessageTransportAttachments, { nullable: true }),
  /**
   * Тип сообщения
   */
  type: MessageType,
  /**
   * Пользователь, связанный с сообщением
   */
  user: S.optionalWith(Actor, { nullable: true }),
}) {}

/**
 * Последнее пользовательское сообщение в чате
 */
export class LastUserMessage extends S.Class<LastUserMessage>(
  "@integratop/retailcrm-bot-api-effect/LastUserMessage",
)({
  /**
   * Уникальный идентификатор последнего пользовательского сообщения
   */
  id: S.Int,
}) {}

/**
 * Текущее состояние участника в чате
 */
export class MemberState extends S.Literal("active", "kicked", "leaved", "undefined") {}

/**
 * Участник чата, представляющий пользователя и его статус
 */
export class Member extends S.Class<Member>("@integratop/retailcrm-bot-api-effect/Member")({
  /**
   * Показывает, является ли участник автором (создателем) чата
   */
  is_author: S.Boolean,
  /**
   * Текущее состояние участника в чате
   */
  state: MemberState,
  /**
   * Информация о пользователе — участнике чата
   */
  user: Actor,
}) {}

/**
 * Список участников чата
 */
export class Members extends S.Array(S.Record({ key: S.String, value: S.Unknown })) {}

/**
 * Текущий уровень срочности чата на основе бизнес‑логики (например, нарушения SLA)
 */
export class ChatsListResponseItemWaitingLevel extends S.Literal("warning", "danger", "none") {}

/**
 * Представляет цепочку общения между пользователями и/или клиентом в определённом канале
 */
export class ChatsListResponseItem extends S.Class<ChatsListResponseItem>(
  "@integratop/retailcrm-bot-api-effect/ChatsListResponseItem",
)({
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  created_at: S.optionalWith(S.String, { nullable: true }),
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  updated_at: S.optionalWith(S.String, { nullable: true }),
  /**
   * ID пользователя, инициировавшего чат
   */
  author_id: S.optionalWith(S.Int, { nullable: true }),
  /**
   * URL аватара чата
   */
  avatar: S.optionalWith(S.String, { nullable: true }),
  /**
   * Канал связи (например, Telegram, Viber), связанный с чатом
   */
  channel: S.optionalWith(Channel, { nullable: true }),
  /**
   * Клиент, участвующий в чате (если есть)
   */
  customer: S.optionalWith(Actor, { nullable: true }),
  /**
   * Уникальный идентификатор чата
   */
  id: S.Int,
  /**
   * Дата и время в формате RFC 3339
   */
  last_activity: S.optionalWith(S.String, { nullable: true }),
  /**
   * Последний диалог в чате
   */
  last_dialog: S.optionalWith(Dialog, { nullable: true }),
  /**
   * Последнее сообщение в чате (включая системные/служебные)
   */
  last_message: S.optionalWith(Message, { nullable: true }),
  /**
   * Последнее пользовательское сообщение в чате
   */
  last_user_message: S.optionalWith(LastUserMessage, { nullable: true }),
  /**
   * Список участников чата
   */
  members: S.optionalWith(Members, { nullable: true }),
  /**
   * Отображаемое имя чата
   */
  name: S.optionalWith(S.String, { nullable: true }),
  /**
   * Количество непрочитанных сообщений в чате
   */
  not_read_messages: S.Int,
  /**
   * Дата и время в формате RFC 3339
   */
  reply_deadline: S.optionalWith(S.String, { nullable: true }),
  /**
   * Показывает, есть ли у пользователей непрочитанные сообщения в чате
   */
  unread: S.Boolean,
  /**
   * Текущий уровень срочности чата на основе бизнес‑логики (например, нарушения SLA)
   */
  waiting_level: S.optionalWith(ChatsListResponseItemWaitingLevel, { nullable: true }),
  /**
   * Дата и время в формате RFC 3339
   */
  waiting_level_transition_time: S.optionalWith(S.String, { nullable: true }),
}) {}

export class ListChats200 extends S.Array(ChatsListResponseItem) {}

export class ListChatsDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class ListCommandsParams extends S.Struct({
  id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  limit: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1), S.lessThanOrEqualTo(1000)), {
    nullable: true,
  }),
  since_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  since: S.optionalWith(S.String, { nullable: true }),
  until_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  until: S.optionalWith(S.String, { nullable: true }),
  name: S.optionalWith(S.String.pipe(S.maxLength(32)), { nullable: true }),
}) {}

/**
 * Представляет одну команду бота с метаданными
 */
export class Command extends S.Class<Command>("@integratop/retailcrm-bot-api-effect/Command")({
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  created_at: S.String,
  /**
   * Читаемое описание команды
   */
  description: S.String,
  /**
   * Уникальный идентификатор команды
   */
  id: S.Int,
  /**
   * Уникальное имя команды, используемое для выполнения или идентификации
   */
  name: S.String,
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  updated_at: S.optionalWith(S.String, { nullable: true }),
}) {}

export class ListCommands200 extends S.Array(Command) {}

export class ListCommandsDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class CreateOrUpdateCommandParams extends S.Struct({}) {}

/**
 * Представляет одну команду бота с метаданными
 */
export class CommandCreate extends S.Class<CommandCreate>(
  "@integratop/retailcrm-bot-api-effect/CommandCreate",
)({
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  created_at: S.String,
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  updated_at: S.optionalWith(S.String, { nullable: true }),
  /**
   * Читаемое описание команды
   */
  description: S.String,
  /**
   * Уникальный идентификатор команды
   */
  id: S.Int,
  /**
   * Уникальное имя команды, используемое для выполнения или идентификации
   */
  name: S.String,
}) {}

export class CreateOrUpdateCommandDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class DeleteCommandParams extends S.Struct({}) {}

export class DeleteCommand200 extends S.Struct({}) {}

export class DeleteCommandDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class ListCustomersParams extends S.Struct({
  id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  since: S.optionalWith(S.String, { nullable: true }),
  until: S.optionalWith(S.String, { nullable: true }),
  since_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  until_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  limit: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1), S.lessThanOrEqualTo(1000)), {
    nullable: true,
  }),
  channel_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  channel_type: S.optionalWith(ChannelType, { nullable: true }),
  external_id: S.optionalWith(S.String, { nullable: true }),
}) {}

/**
 * Объект диалога
 */
export class Customer extends S.Class<Customer>("@integratop/retailcrm-bot-api-effect/Customer")({
  id: S.Int,
  external_id: S.optionalWith(S.String, { nullable: true }),
  channel_id: S.optionalWith(S.Int, { nullable: true }),
  username: S.optionalWith(S.String, { nullable: true }),
  first_name: S.optionalWith(S.String, { nullable: true }),
  last_name: S.optionalWith(S.String, { nullable: true }),
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  created_at: S.String,
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  updated_at: S.optionalWith(S.String, { nullable: true }),
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  revoked_at: S.optionalWith(S.String, { nullable: true }),
  avatar: S.optionalWith(S.String, { nullable: true }),
  profile_url: S.optionalWith(S.String, { nullable: true }),
  country: S.optionalWith(S.String, { nullable: true }),
  language: S.optionalWith(S.String, { nullable: true }),
  phone: S.optionalWith(S.String, { nullable: true }),
  email: S.optionalWith(S.String, { nullable: true }),
  is_blocked: S.Boolean,
  utm: S.optionalWith(Utm, { nullable: true }),
}) {}

export class ListCustomers200 extends S.Array(Customer) {}

export class ListCustomersDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class ListDialogsParams extends S.Struct({
  id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  since: S.optionalWith(S.String, { nullable: true }),
  until: S.optionalWith(S.String, { nullable: true }),
  since_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  until_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  limit: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1), S.lessThanOrEqualTo(1000)), {
    nullable: true,
  }),
  chat_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  user_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  bot_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  active: S.optionalWith(Boolean, { nullable: true }),
  assign: S.optionalWith(Boolean, { nullable: true }),
  include_mass_communication: S.optionalWith(Boolean, { nullable: true }),
}) {}

/**
 * Тип ответственной сущности
 */
export class ResponsibleType extends S.Literal("user", "bot") {}

/**
 * Сущность, ответственная за диалог (пользователь или бот)
 */
export class Responsible extends S.Class<Responsible>(
  "@integratop/retailcrm-bot-api-effect/Responsible",
)({
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  assigned_at: S.optionalWith(S.String, { nullable: true }),
  /**
   * Внешний идентификатор ответственной сущности
   */
  external_id: S.optionalWith(S.String, { nullable: true }),
  /**
   * Уникальный идентификатор ответственной сущности
   */
  id: S.Int,
  /**
   * Тип ответственной сущности
   */
  type: ResponsibleType,
}) {}

/**
 * Код цвета тега
 */
export class ColorCode extends S.Literal(
  "light-red",
  "light-blue",
  "light-green",
  "light-orange",
  "light-gray",
  "light-grayish-blue",
  "red",
  "blue",
  "green",
  "orange",
  "gray",
  "grayish-blue",
) {}

/**
 * Тег, назначенный диалогу или сущности
 */
export class Tag extends S.Class<Tag>("@integratop/retailcrm-bot-api-effect/Tag")({
  /**
   * Цветовой код, связанный с тегом
   */
  color_code: ColorCode,
  /**
   * Имя тега
   */
  name: S.String,
}) {}

/**
 * Элемент диалога в ответе списка
 */
export class DialogListResponseItem extends S.Class<DialogListResponseItem>(
  "@integratop/retailcrm-bot-api-effect/DialogListResponseItem",
)({
  /**
   * ID первого сообщения в диалоге
   */
  begin_message_id: S.optionalWith(S.Int, { nullable: true }),
  /**
   * ID бота, назначенного для диалога (если есть)
   */
  bot_id: S.optionalWith(S.Int, { nullable: true }),
  /**
   * ID чата, к которому принадлежит диалог
   */
  chat_id: S.Int,
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  closed_at: S.optionalWith(S.String, { nullable: true }),
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  created_at: S.String,
  /**
   * ID последнего сообщения в диалоге
   */
  ending_message_id: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Уникальный идентификатор диалога
   */
  id: S.Int,
  /**
   * Показывает, активен ли диалог
   */
  is_active: S.Boolean,
  /**
   * Показывает, назначен ли диалог кому‑нибудь
   */
  is_assigned: S.Boolean,
  /**
   * Текущая ответственная сущность диалога
   */
  responsible: S.optionalWith(Responsible, { nullable: true }),
  /**
   * Список тегов, связанных с диалогом
   */
  tags: S.optionalWith(S.Array(Tag), { nullable: true }),
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  updated_at: S.optionalWith(S.String, { nullable: true }),
  /**
   * UTM‑параметры, связанные с диалогом
   */
  utm: S.optionalWith(Utm, { nullable: true }),
}) {}

export class ListDialogs200 extends S.Array(DialogListResponseItem) {}

export class ListDialogsDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class AssignDialogResponsibleParams extends S.Struct({}) {}

export class AssignDialogResponsible200 extends S.Struct({
  /**
   * Показывает, является ли назначение переназначением
   */
  is_reassign: S.Boolean,
  /**
   * ID пользователя, покинувшего диалог (если применимо)
   */
  left_user_id: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Предыдущий ответственный пользователь до переназначения
   */
  previous_responsible: S.optionalWith(Responsible, { nullable: true }),
  /**
   * Текущий ответственный пользователь диалога
   */
  responsible: Responsible,
}) {}

export class AssignDialogResponsibleDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class UnassignDialogResponsibleParams extends S.Struct({}) {}

export class UnassignDialogResponsible200 extends S.Struct({
  /**
   * Предыдущий ответственный пользователь до снятия назначения
   */
  previous_responsible: S.optionalWith(Responsible, { nullable: true }),
}) {}

export class UnassignDialogResponsibleDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class CloseDialogParams extends S.Struct({}) {}

export class CloseDialog200 extends S.Struct({}) {}

export class CloseDialogDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class DialogAddTagsParams extends S.Struct({}) {}

export class DialogAddTags200 extends S.Struct({}) {}

export class DialogAddTagsDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class DialogDeleteTagsParams extends S.Struct({}) {}

export class DialogDeleteTags200 extends S.Struct({}) {}

export class DialogDeleteTagsDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class CreateDialogParams extends S.Struct({}) {}

export class CreateDialog200 extends S.Struct({
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  created_at: S.String,
  /**
   * Уникальный идентификатор созданного диалога
   */
  id: S.Int,
}) {}

export class CreateDialogDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class GetFileUrlParams extends S.Struct({}) {}

/**
 * Текущий статус транскрипции файла
 */
export class FileTranscriptionStatus extends S.Literal("in_progress", "ready", "error") {}

/**
 * Метаданные и статус обработки загруженного файла
 */
export class FileWithUrl extends S.Class<FileWithUrl>(
  "@integratop/retailcrm-bot-api-effect/FileWithUrl",
)({
  /**
   * Прямой URL для скачивания или доступа к загруженному файлу
   */
  url: S.optionalWith(S.String, { nullable: true }),
  /**
   * Уникальный идентификатор файла
   */
  id: S.String,
  /**
   * Размер файла в байтах
   */
  size: S.Int,
  /**
   * Необязательная текстовая транскрипция содержимого файла, если применимо
   */
  transcription: S.optionalWith(S.String, { nullable: true }),
  /**
   * Статус транскрипции файла
   */
  transcription_status: S.optionalWith(FileTranscriptionStatus, { nullable: true }),
  type: FileType,
}) {}

export class GetFileUrlDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class UploadFileRequest extends S.Class<UploadFileRequest>(
  "@integratop/retailcrm-bot-api-effect/UploadFileRequest",
)({
  /**
   * Двоичные данные файла для загрузки (изображение, документ, видео)
   */
  file: S.instanceOf(globalThis.Blob),
}) {}

/**
 * Метаданные и статус обработки загруженного файла
 */
export class File extends S.Class<File>("@integratop/retailcrm-bot-api-effect/File")({
  /**
   * Уникальный идентификатор файла
   */
  id: S.String,
  /**
   * Размер файла в байтах
   */
  size: S.Int,
  /**
   * Необязательная текстовая транскрипция содержимого файла, если применимо
   */
  transcription: S.optionalWith(S.String, { nullable: true }),
  /**
   * Статус транскрипции файла
   */
  transcription_status: S.optionalWith(FileTranscriptionStatus, { nullable: true }),
  type: FileType,
}) {}

export class UploadFileDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class UploadFileByUrlDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class UpdateFileMetadataParams extends S.Struct({}) {}

export class UpdateFileMetadataDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class ListMembersParamsState extends S.Literal("active", "kicked", "leaved") {}

export class ListMembersParams extends S.Struct({
  id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  since: S.optionalWith(S.String, { nullable: true }),
  until: S.optionalWith(S.String, { nullable: true }),
  since_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  until_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  limit: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1), S.lessThanOrEqualTo(1000)), {
    nullable: true,
  }),
  chat_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  user_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  state: S.optionalWith(ListMembersParamsState, { nullable: true }),
}) {}

/**
 * Состояние участника пользователя в чате
 */
export class ChatMemberListResponseItemState extends S.Literal("active", "kicked", "leaved") {}

/**
 * Объект участника чата с ID пользователя, ID чата, состоянием членства и временными метками
 */
export class ChatMemberListResponseItem extends S.Class<ChatMemberListResponseItem>(
  "@integratop/retailcrm-bot-api-effect/ChatMemberListResponseItem",
)({
  /**
   * ID чата, участником которого является пользователь
   */
  chat_id: S.Int,
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  created_at: S.String,
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  updated_at: S.optionalWith(S.String, { nullable: true }),
  /**
   * Уникальный ID записи о членстве в чате
   */
  id: S.Int,
  /**
   * Показывает, является ли пользователь автором чата
   */
  is_author: S.Boolean,
  /**
   * Состояние участника пользователя в чате
   */
  state: ChatMemberListResponseItemState,
  /**
   * ID пользователя в системе
   */
  user_id: S.Int,
}) {}

export class ListMembers200 extends S.Array(ChatMemberListResponseItem) {}

export class ListMembersDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class ListUsersParams extends S.Struct({
  id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  since: S.optionalWith(S.String, { nullable: true }),
  until: S.optionalWith(S.String, { nullable: true }),
  since_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  until_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  limit: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1), S.lessThanOrEqualTo(1000)), {
    nullable: true,
  }),
  active: S.optionalWith(Boolean, { nullable: true }),
  online: S.optionalWith(Boolean, { nullable: true }),
  external_id: S.optionalWith(S.String, { nullable: true }),
}) {}

/**
 * Объект пользователя, содержащий данные профиля, статус активности и временные метки
 */
export class UserListResponseItem extends S.Class<UserListResponseItem>(
  "@integratop/retailcrm-bot-api-effect/UserListResponseItem",
)({
  /**
   * URL аватара пользователя
   */
  avatar_url: S.optionalWith(S.String, { nullable: true }),
  /**
   * Показывает, доступен ли пользователь для общения
   */
  available: S.Boolean,
  /**
   * Показывает, подключался ли пользователь к системе
   */
  connected: S.Boolean,
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  created_at: S.String,
  /**
   * Внешний идентификатор пользователя (например, из внешней системы)
   */
  external_id: S.optionalWith(S.String, { nullable: true }),
  /**
   * Имя пользователя
   */
  first_name: S.optionalWith(S.String, { nullable: true }),
  /**
   * Внутренний ID пользователя
   */
  id: S.Int,
  /**
   * Флаг, указывающий, помечен ли пользователь как активный
   */
  is_active: S.Boolean,
  /**
   * Флаг, указывающий, находится ли пользователь в сети
   */
  is_online: S.Boolean,
  /**
   * Показывает, является ли пользователь технической (системной) учётной записью
   */
  is_technical_account: S.Boolean,
  /**
   * Фамилия пользователя
   */
  last_name: S.optionalWith(S.String, { nullable: true }),
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  revoked_at: S.optionalWith(S.String, { nullable: true }),
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  updated_at: S.optionalWith(S.String, { nullable: true }),
  /**
   * Имя пользователя или логин
   */
  username: S.optionalWith(S.String, { nullable: true }),
}) {}

export class ListUsers200 extends S.Array(UserListResponseItem) {}

export class ListUsersDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class ListMessagesParamsScope extends S.Literal("public", "private") {}

export class ListMessagesParams extends S.Struct({
  since: S.optionalWith(S.String, { nullable: true }),
  until: S.optionalWith(S.String, { nullable: true }),
  since_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  until_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  limit: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1), S.lessThanOrEqualTo(1000)), {
    nullable: true,
  }),
  id: S.optionalWith(S.Array(S.Int), { nullable: true }),
  chat_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  user_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  customer_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  bot_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  dialog_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  channel_id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  channel_type: S.optionalWith(ChannelType, { nullable: true }),
  type: S.optionalWith(MessageType, { nullable: true }),
  include_mass_communication: S.optionalWith(Boolean, { nullable: true }),
  scope: S.optionalWith(ListMessagesParamsScope, { nullable: true }),
}) {}

/**
 * Объект, представляющий одно чат‑сообщение
 */
export class MessageListResponseItem extends S.Class<MessageListResponseItem>(
  "@integratop/retailcrm-bot-api-effect/MessageListResponseItem",
)({
  /**
   * ID канала, в который отправлено сообщение
   */
  channel_id: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  channel_sent_at: S.optionalWith(S.String, { nullable: true }),
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  created_at: S.String,
  /**
   * Дата и время в формате RFC 3339 с микросекундами
   */
  updated_at: S.optionalWith(S.String, { nullable: true }),
  /**
   * Системное действие, отображаемое сообщением
   */
  action: S.optionalWith(SystemAction, { nullable: true }),
  /**
   * Список интерактивных действий, связанных с сообщением
   */
  actions: S.Array(MessageAction),
  /**
   * ID чата, к которому относится это сообщение
   */
  chat_id: S.Int,
  /**
   * Текстовое содержимое сообщения
   */
  content: S.optionalWith(S.String, { nullable: true }),
  /**
   * Необязательный диалог, связанный с сообщением
   */
  dialog: S.optionalWith(MessageDialog, { nullable: true }),
  /**
   * Информация об ошибке, связанной с отправкой или обработкой сообщения
   */
  error: S.optionalWith(MessageError, { nullable: true }),
  /**
   * Отправитель сообщения
   */
  from: S.optionalWith(Actor, { nullable: true }),
  /**
   * Уникальный идентификатор сообщения
   */
  id: S.Int,
  /**
   * Показывает, редактировалось ли сообщение
   */
  is_edit: S.Boolean,
  /**
   * Показывает, было ли сообщение прочитано
   */
  is_read: S.Boolean,
  /**
   * Список прикреплённых файлов
   */
  items: S.optionalWith(S.Array(MessageFile), { nullable: true }),
  /**
   * Необязательное внутреннее примечание или комментарий к сообщению
   */
  note: S.optionalWith(S.String, { nullable: true }),
  /**
   * Необязательные данные заказа, связанные с сообщением
   */
  order: S.optionalWith(MessageOrder, { nullable: true }),
  /**
   * Необязательные данные о продукте, упомянутые в сообщении
   */
  product: S.optionalWith(MessageProduct, { nullable: true }),
  /**
   * Цитируемое сообщение (если это ответ)
   */
  quote: S.optionalWith(QuoteMessage, { nullable: true }),
  /**
   * Пользователь, ответственный за это сообщение или задачу
   */
  responsible: S.optionalWith(Actor, { nullable: true }),
  /**
   * Область сообщения
   */
  scope: MessageScope,
  /**
   * Текущий статус сообщения
   */
  status: MessageStatus,
  /**
   * Метка времени создания сообщения
   */
  time: S.String,
  /**
   * Вложения, специфичные для транспортного уровня
   */
  transport_attachments: S.optionalWith(MessageTransportAttachments, { nullable: true }),
  /**
   * Тип сообщения
   */
  type: MessageType,
  /**
   * Пользователь, связанный с сообщением
   */
  user: S.optionalWith(Actor, { nullable: true }),
}) {}

export class ListMessages200 extends S.Array(MessageListResponseItem) {}

export class ListMessagesDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class SendMessage200 extends S.Struct({
  message_id: S.Int,
  time: S.String,
}) {}

export class SendMessageDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class DeleteMessageParams extends S.Struct({}) {}

export class DeleteMessage200 extends S.Struct({}) {}

export class DeleteMessageDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class EditMessageParams extends S.Struct({}) {}

export class EditMessage200 extends S.Struct({}) {}

export class EditMessageDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class WebSocketConnectionParams extends S.Struct({
  events: S.optionalWith(S.String.pipe(S.minLength(1)), { nullable: true }),
  options: S.optionalWith(S.String, { nullable: true }),
}) {}

export class WebSocketConnection101 extends S.Struct({}) {}

export class WebSocketConnectionDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export const make = (
  httpClient: HttpClient.HttpClient,
  options: {
    readonly transformClient?:
      | ((client: HttpClient.HttpClient) => Effect.Effect<HttpClient.HttpClient>)
      | undefined;
  } = {},
): Client => {
  const unexpectedStatus = (response: HttpClientResponse.HttpClientResponse) =>
    Effect.flatMap(
      Effect.orElseSucceed(response.json, () => "Unexpected status code"),
      (description) =>
        Effect.fail(
          new HttpClientError.ResponseError({
            request: response.request,
            response,
            reason: "StatusCode",
            description:
              typeof description === "string" ? description : JSON.stringify(description),
          }),
        ),
    );
  const withResponse: <A, E>(
    f: (response: HttpClientResponse.HttpClientResponse) => Effect.Effect<A, E>,
  ) => (request: HttpClientRequest.HttpClientRequest) => Effect.Effect<any, any> =
    options.transformClient
      ? (f) => (request) =>
          Effect.flatMap(
            Effect.flatMap(options.transformClient!(httpClient), (client) =>
              client.execute(request),
            ),
            f,
          )
      : (f) => (request) => Effect.flatMap(httpClient.execute(request), f);
  const decodeSuccess =
    <A, I, R>(schema: S.Schema<A, I, R>) =>
    (response: HttpClientResponse.HttpClientResponse) =>
      HttpClientResponse.schemaBodyJson(schema)(response);
  const decodeError =
    <const Tag extends string, A, I, R>(tag: Tag, schema: S.Schema<A, I, R>) =>
    (response: HttpClientResponse.HttpClientResponse) =>
      Effect.flatMap(HttpClientResponse.schemaBodyJson(schema)(response), (cause) =>
        Effect.fail(ClientError(tag, cause, response)),
      );
  return {
    httpClient,
    ListBots: (options) =>
      HttpClientRequest.get(`/bots`).pipe(
        HttpClientRequest.setUrlParams({
          id: options?.["id"] as any,
          active: options?.["active"] as any,
          role: options?.["role"] as any,
          since: options?.["since"] as any,
          since_id: options?.["since_id"] as any,
          until: options?.["until"] as any,
          until_id: options?.["until_id"] as any,
          limit: options?.["limit"] as any,
        }),
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(ListBots200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    UpdateBot: () =>
      HttpClientRequest.patch(`/my/info`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(UpdateBot200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    ListChannels: (options) =>
      HttpClientRequest.get(`/channels`).pipe(
        HttpClientRequest.setUrlParams({
          id: options?.["id"] as any,
          types: options?.["types"] as any,
          active: options?.["active"] as any,
          since: options?.["since"] as any,
          since_id: options?.["since_id"] as any,
          until: options?.["until"] as any,
          until_id: options?.["until_id"] as any,
          limit: options?.["limit"] as any,
        }),
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(ListChannels200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    ListChats: (options) =>
      HttpClientRequest.get(`/chats`).pipe(
        HttpClientRequest.setUrlParams({
          id: options?.["id"] as any,
          since: options?.["since"] as any,
          until: options?.["until"] as any,
          limit: options?.["limit"] as any,
          since_id: options?.["since_id"] as any,
          until_id: options?.["until_id"] as any,
          channel_id: options?.["channel_id"] as any,
          channel_type: options?.["channel_type"] as any,
          customer_id: options?.["customer_id"] as any,
          customer_external_id: options?.["customer_external_id"] as any,
          include_mass_communication: options?.["include_mass_communication"] as any,
        }),
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(ListChats200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    ListCommands: (options) =>
      HttpClientRequest.get(`/my/commands`).pipe(
        HttpClientRequest.setUrlParams({
          id: options?.["id"] as any,
          limit: options?.["limit"] as any,
          since_id: options?.["since_id"] as any,
          since: options?.["since"] as any,
          until_id: options?.["until_id"] as any,
          until: options?.["until"] as any,
          name: options?.["name"] as any,
        }),
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(ListCommands200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    CreateOrUpdateCommand: (commandName, options) =>
      HttpClientRequest.put(`/my/commands/${commandName}`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(CommandCreate),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    DeleteCommand: (commandName, options) =>
      HttpClientRequest.del(`/my/commands/${commandName}`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(DeleteCommand200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    ListCustomers: (options) =>
      HttpClientRequest.get(`/customers`).pipe(
        HttpClientRequest.setUrlParams({
          id: options?.["id"] as any,
          since: options?.["since"] as any,
          until: options?.["until"] as any,
          since_id: options?.["since_id"] as any,
          until_id: options?.["until_id"] as any,
          limit: options?.["limit"] as any,
          channel_id: options?.["channel_id"] as any,
          channel_type: options?.["channel_type"] as any,
          external_id: options?.["external_id"] as any,
        }),
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(ListCustomers200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    ListDialogs: (options) =>
      HttpClientRequest.get(`/dialogs`).pipe(
        HttpClientRequest.setUrlParams({
          id: options?.["id"] as any,
          since: options?.["since"] as any,
          until: options?.["until"] as any,
          since_id: options?.["since_id"] as any,
          until_id: options?.["until_id"] as any,
          limit: options?.["limit"] as any,
          chat_id: options?.["chat_id"] as any,
          user_id: options?.["user_id"] as any,
          bot_id: options?.["bot_id"] as any,
          active: options?.["active"] as any,
          assign: options?.["assign"] as any,
          include_mass_communication: options?.["include_mass_communication"] as any,
        }),
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(ListDialogs200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    AssignDialogResponsible: (dialogId, options) =>
      HttpClientRequest.patch(`/dialogs/${dialogId}/assign`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(AssignDialogResponsible200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    UnassignDialogResponsible: (dialogId, options) =>
      HttpClientRequest.patch(`/dialogs/${dialogId}/unassign`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(UnassignDialogResponsible200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    CloseDialog: (dialogId, options) =>
      HttpClientRequest.del(`/dialogs/${dialogId}/close`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(CloseDialog200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    DialogAddTags: (dialogId, options) =>
      HttpClientRequest.patch(`/dialogs/${dialogId}/tags/add`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(DialogAddTags200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    DialogDeleteTags: (dialogId, options) =>
      HttpClientRequest.patch(`/dialogs/${dialogId}/tags/delete`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(DialogDeleteTags200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    CreateDialog: (chatId, options) =>
      HttpClientRequest.post(`/chats/${chatId}/dialogs`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(CreateDialog200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    GetFileUrl: (id, options) =>
      HttpClientRequest.get(`/files/${id}`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(FileWithUrl),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    UploadFile: (options) =>
      HttpClientRequest.post(`/files/upload`).pipe(
        HttpClientRequest.bodyFormDataRecord(options as any),
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(File),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    UploadFileByUrl: () =>
      HttpClientRequest.post(`/files/upload_by_url`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(File),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    UpdateFileMetadata: (id, options) =>
      HttpClientRequest.put(`/files/${id}/meta`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(File),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    ListMembers: (options) =>
      HttpClientRequest.get(`/members`).pipe(
        HttpClientRequest.setUrlParams({
          id: options?.["id"] as any,
          since: options?.["since"] as any,
          until: options?.["until"] as any,
          since_id: options?.["since_id"] as any,
          until_id: options?.["until_id"] as any,
          limit: options?.["limit"] as any,
          chat_id: options?.["chat_id"] as any,
          user_id: options?.["user_id"] as any,
          state: options?.["state"] as any,
        }),
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(ListMembers200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    ListUsers: (options) =>
      HttpClientRequest.get(`/users`).pipe(
        HttpClientRequest.setUrlParams({
          id: options?.["id"] as any,
          since: options?.["since"] as any,
          until: options?.["until"] as any,
          since_id: options?.["since_id"] as any,
          until_id: options?.["until_id"] as any,
          limit: options?.["limit"] as any,
          active: options?.["active"] as any,
          online: options?.["online"] as any,
          external_id: options?.["external_id"] as any,
        }),
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(ListUsers200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    ListMessages: (options) =>
      HttpClientRequest.get(`/messages`).pipe(
        HttpClientRequest.setUrlParams({
          since: options?.["since"] as any,
          until: options?.["until"] as any,
          since_id: options?.["since_id"] as any,
          until_id: options?.["until_id"] as any,
          limit: options?.["limit"] as any,
          id: options?.["id"] as any,
          chat_id: options?.["chat_id"] as any,
          user_id: options?.["user_id"] as any,
          customer_id: options?.["customer_id"] as any,
          bot_id: options?.["bot_id"] as any,
          dialog_id: options?.["dialog_id"] as any,
          channel_id: options?.["channel_id"] as any,
          channel_type: options?.["channel_type"] as any,
          type: options?.["type"] as any,
          include_mass_communication: options?.["include_mass_communication"] as any,
          scope: options?.["scope"] as any,
        }),
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(ListMessages200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    SendMessage: () =>
      HttpClientRequest.post(`/messages`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(SendMessage200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    DeleteMessage: (messageId, options) =>
      HttpClientRequest.del(`/messages/${messageId}`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(DeleteMessage200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    EditMessage: (messageId, options) =>
      HttpClientRequest.patch(`/messages/${messageId}`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(EditMessage200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    WebSocketConnection: (options) =>
      HttpClientRequest.get(`/ws`).pipe(
        HttpClientRequest.setUrlParams({
          events: options?.["events"] as any,
          options: options?.["options"] as any,
        }),
        withResponse(
          HttpClientResponse.matchStatus({
            "101": decodeSuccess(WebSocketConnection101),
            orElse: unexpectedStatus,
          }),
        ),
      ),
  };
};

export interface Client {
  readonly httpClient: HttpClient.HttpClient;
  /**
   * Получает список всех доступных ботов с необязательной фильтрацией
   */
  readonly ListBots: (
    options?: typeof ListBotsParams.Encoded | undefined,
  ) => Effect.Effect<typeof ListBots200.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Обновляет сведения о текущем аутентифицированном боте
   */
  readonly UpdateBot: () => Effect.Effect<
    typeof UpdateBot200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  /**
   * Возвращает список каналов с необязательными фильтрами
   */
  readonly ListChannels: (
    options?: typeof ListChannelsParams.Encoded | undefined,
  ) => Effect.Effect<typeof ListChannels200.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Возвращает отфильтрованный список чатов, доступных боту
   */
  readonly ListChats: (
    options?: typeof ListChatsParams.Encoded | undefined,
  ) => Effect.Effect<typeof ListChats200.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Возвращает список команд бота, отфильтрованных по необязательным параметрам
   */
  readonly ListCommands: (
    options?: typeof ListCommandsParams.Encoded | undefined,
  ) => Effect.Effect<typeof ListCommands200.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Создаёт новую команду либо обновляет существующую с указанным именем
   */
  readonly CreateOrUpdateCommand: (
    commandName: string,
    options?: typeof CreateOrUpdateCommandParams.Encoded | undefined,
  ) => Effect.Effect<typeof CommandCreate.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Удаляет команду, связанную с указанным именем
   */
  readonly DeleteCommand: (
    commandName: string,
    options?: typeof DeleteCommandParams.Encoded | undefined,
  ) => Effect.Effect<typeof DeleteCommand200.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Возвращает список клиентов
   */
  readonly ListCustomers: (
    options?: typeof ListCustomersParams.Encoded | undefined,
  ) => Effect.Effect<typeof ListCustomers200.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Возвращает список диалогов с необязательными фильтрами
   */
  readonly ListDialogs: (
    options?: typeof ListDialogsParams.Encoded | undefined,
  ) => Effect.Effect<typeof ListDialogs200.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Устанавливает или обновляет пользователя, ответственного за указанный диалог
   */
  readonly AssignDialogResponsible: (
    dialogId: string,
    options?: typeof AssignDialogResponsibleParams.Encoded | undefined,
  ) => Effect.Effect<
    typeof AssignDialogResponsible200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  /**
   * Снимает текущего ответственного пользователя с указанного диалога
   */
  readonly UnassignDialogResponsible: (
    dialogId: string,
    options?: typeof UnassignDialogResponsibleParams.Encoded | undefined,
  ) => Effect.Effect<
    typeof UnassignDialogResponsible200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  /**
   * Помечает указанный диалог как закрытый, блокируя дальнейшие обновления или сообщения
   */
  readonly CloseDialog: (
    dialogId: string,
    options?: typeof CloseDialogParams.Encoded | undefined,
  ) => Effect.Effect<typeof CloseDialog200.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Добавляет теги к указанному диалогу
   */
  readonly DialogAddTags: (
    dialogId: string,
    options?: typeof DialogAddTagsParams.Encoded | undefined,
  ) => Effect.Effect<typeof DialogAddTags200.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Удаляет теги из указанного диалога
   */
  readonly DialogDeleteTags: (
    dialogId: string,
    options?: typeof DialogDeleteTagsParams.Encoded | undefined,
  ) => Effect.Effect<typeof DialogDeleteTags200.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Создаёт новый диалог в указанном чате
   */
  readonly CreateDialog: (
    chatId: string,
    options?: typeof CreateDialogParams.Encoded | undefined,
  ) => Effect.Effect<typeof CreateDialog200.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Возвращает прямой URL для скачивания ранее загруженного файла по его уникальному идентификатору
   */
  readonly GetFileUrl: (
    id: string,
    options?: typeof GetFileUrlParams.Encoded | undefined,
  ) => Effect.Effect<typeof FileWithUrl.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Загружает новый файл на сервер с использованием multipart/form-data
   */
  readonly UploadFile: (
    options: typeof UploadFileRequest.Encoded,
  ) => Effect.Effect<typeof File.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Скачивает файл по указанному URL и загружает его на сервер
   */
  readonly UploadFileByUrl: () => Effect.Effect<
    typeof File.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  /**
   * Обновляет метаданные указанного файла по его идентификатору
   */
  readonly UpdateFileMetadata: (
    id: string,
    options?: typeof UpdateFileMetadataParams.Encoded | undefined,
  ) => Effect.Effect<typeof File.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Возвращает список участников чата с учётом необязательных фильтров
   */
  readonly ListMembers: (
    options?: typeof ListMembersParams.Encoded | undefined,
  ) => Effect.Effect<typeof ListMembers200.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Возвращает список пользователей с учётом необязательных фильтров
   */
  readonly ListUsers: (
    options?: typeof ListUsersParams.Encoded | undefined,
  ) => Effect.Effect<typeof ListUsers200.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Возвращает список сообщений, отфильтрованных по разным критериям
   */
  readonly ListMessages: (
    options?: typeof ListMessagesParams.Encoded | undefined,
  ) => Effect.Effect<typeof ListMessages200.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Отправка нового сообщения в заданный транспортный канал
   */
  readonly SendMessage: () => Effect.Effect<
    typeof SendMessage200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  /**
   * Удаляет сообщение с указанным ID (операция необратима)
   */
  readonly DeleteMessage: (
    messageId: string,
    options?: typeof DeleteMessageParams.Encoded | undefined,
  ) => Effect.Effect<typeof DeleteMessage200.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Обновляет содержимое или метаданные существующего сообщения
   */
  readonly EditMessage: (
    messageId: string,
    options?: typeof EditMessageParams.Encoded | undefined,
  ) => Effect.Effect<typeof EditMessage200.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Этот URL используется для установления соединения через WebSocket. С помощью этого соединения бот может получать данные по каждому типу событий, на которые он подписан. Список событий передается в виде строки, со значениями, разделенными запятыми.
   */
  readonly WebSocketConnection: (
    options?: typeof WebSocketConnectionParams.Encoded | undefined,
  ) => Effect.Effect<
    typeof WebSocketConnection101.Type,
    HttpClientError.HttpClientError | ParseError
  >;
}

export interface ClientError<Tag extends string, E> {
  readonly _tag: Tag;
  readonly request: HttpClientRequest.HttpClientRequest;
  readonly response: HttpClientResponse.HttpClientResponse;
  readonly cause: E;
}

class ClientErrorImpl extends Data.Error<{
  _tag: string;
  cause: any;
  request: HttpClientRequest.HttpClientRequest;
  response: HttpClientResponse.HttpClientResponse;
}> {}

export const ClientError = <Tag extends string, E>(
  tag: Tag,
  cause: E,
  response: HttpClientResponse.HttpClientResponse,
): ClientError<Tag, E> =>
  new ClientErrorImpl({
    _tag: tag,
    cause,
    response,
    request: response.request,
  }) as any;
