[mongo-baseops](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / ListenOptions

# Interface: ListenOptions

[\<internal\>](../modules/internal_.md).ListenOptions

## Hierarchy

- [`Abortable`](internal_.EventEmitter.Abortable.md)

  ↳ **`ListenOptions`**

## Table of contents

### Properties

- [backlog](internal_.ListenOptions.md#backlog)
- [exclusive](internal_.ListenOptions.md#exclusive)
- [host](internal_.ListenOptions.md#host)
- [ipv6Only](internal_.ListenOptions.md#ipv6only)
- [path](internal_.ListenOptions.md#path)
- [port](internal_.ListenOptions.md#port)
- [readableAll](internal_.ListenOptions.md#readableall)
- [signal](internal_.ListenOptions.md#signal)
- [writableAll](internal_.ListenOptions.md#writableall)

## Properties

### backlog

• `Optional` **backlog**: `number`

#### Defined in

node_modules/@types/node/net.d.ts:453

___

### exclusive

• `Optional` **exclusive**: `boolean`

#### Defined in

node_modules/@types/node/net.d.ts:455

___

### host

• `Optional` **host**: `string`

#### Defined in

node_modules/@types/node/net.d.ts:452

___

### ipv6Only

• `Optional` **ipv6Only**: `boolean`

**`Default`**

```ts
false
```

#### Defined in

node_modules/@types/node/net.d.ts:461

___

### path

• `Optional` **path**: `string`

#### Defined in

node_modules/@types/node/net.d.ts:454

___

### port

• `Optional` **port**: `number`

#### Defined in

node_modules/@types/node/net.d.ts:451

___

### readableAll

• `Optional` **readableAll**: `boolean`

#### Defined in

node_modules/@types/node/net.d.ts:456

___

### signal

• `Optional` **signal**: `AbortSignal`

When provided the corresponding `AbortController` can be used to cancel an asynchronous action.

#### Inherited from

[Abortable](internal_.EventEmitter.Abortable.md).[signal](internal_.EventEmitter.Abortable.md#signal)

#### Defined in

node_modules/@types/node/events.d.ts:469

___

### writableAll

• `Optional` **writableAll**: `boolean`

#### Defined in

node_modules/@types/node/net.d.ts:457
