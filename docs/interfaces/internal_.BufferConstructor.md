[mongo-baseops](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / BufferConstructor

# Interface: BufferConstructor

[\<internal\>](../modules/internal_.md).BufferConstructor

Raw data is stored in instances of the Buffer class.
A Buffer is similar to an array of integers but corresponds to a raw memory allocation outside the V8 heap.  A Buffer cannot be resized.
Valid string encodings: 'ascii'|'utf8'|'utf16le'|'ucs2'(alias of 'utf16le')|'base64'|'base64url'|'binary'(deprecated)|'hex'

## Table of contents

### Constructors

- [constructor](internal_.BufferConstructor.md#constructor)

### Properties

- [poolSize](internal_.BufferConstructor.md#poolsize)

### Methods

- [alloc](internal_.BufferConstructor.md#alloc)
- [allocUnsafe](internal_.BufferConstructor.md#allocunsafe)
- [allocUnsafeSlow](internal_.BufferConstructor.md#allocunsafeslow)
- [byteLength](internal_.BufferConstructor.md#bytelength)
- [compare](internal_.BufferConstructor.md#compare)
- [concat](internal_.BufferConstructor.md#concat)
- [copyBytesFrom](internal_.BufferConstructor.md#copybytesfrom)
- [from](internal_.BufferConstructor.md#from)
- [isBuffer](internal_.BufferConstructor.md#isbuffer)
- [isEncoding](internal_.BufferConstructor.md#isencoding)
- [of](internal_.BufferConstructor.md#of)

## Constructors

### constructor

• **new BufferConstructor**(`str`, `encoding?`): [`Buffer`](internal_.Buffer.md)

Allocates a new buffer containing the given {str}.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | String to store in buffer. |
| `encoding?` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) | encoding to use, optional. Default is 'utf8' |

#### Returns

[`Buffer`](internal_.Buffer.md)

**`Deprecated`**

since v10.0.0 - Use `Buffer.from(string[, encoding])` instead.

#### Defined in

node_modules/@types/node/buffer.d.ts:264

• **new BufferConstructor**(`size`): [`Buffer`](internal_.Buffer.md)

Allocates a new buffer of {size} octets.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `size` | `number` | count of octets to allocate. |

#### Returns

[`Buffer`](internal_.Buffer.md)

**`Deprecated`**

since v10.0.0 - Use `Buffer.alloc()` instead (also see `Buffer.allocUnsafe()`).

#### Defined in

node_modules/@types/node/buffer.d.ts:271

• **new BufferConstructor**(`array`): [`Buffer`](internal_.Buffer.md)

Allocates a new buffer containing the given {array} of octets.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | `Uint8Array` | The octets to store. |

#### Returns

[`Buffer`](internal_.Buffer.md)

**`Deprecated`**

since v10.0.0 - Use `Buffer.from(array)` instead.

#### Defined in

node_modules/@types/node/buffer.d.ts:278

• **new BufferConstructor**(`arrayBuffer`): [`Buffer`](internal_.Buffer.md)

Produces a Buffer backed by the same allocated memory as
the given {ArrayBuffer}/{SharedArrayBuffer}.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arrayBuffer` | `ArrayBuffer` \| [`SharedArrayBuffer`](internal_.SharedArrayBuffer.md) | The ArrayBuffer with which to share memory. |

#### Returns

[`Buffer`](internal_.Buffer.md)

**`Deprecated`**

since v10.0.0 - Use `Buffer.from(arrayBuffer[, byteOffset[, length]])` instead.

#### Defined in

node_modules/@types/node/buffer.d.ts:286

• **new BufferConstructor**(`array`): [`Buffer`](internal_.Buffer.md)

Allocates a new buffer containing the given {array} of octets.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | readonly `any`[] | The octets to store. |

#### Returns

[`Buffer`](internal_.Buffer.md)

**`Deprecated`**

since v10.0.0 - Use `Buffer.from(array)` instead.

#### Defined in

node_modules/@types/node/buffer.d.ts:293

• **new BufferConstructor**(`buffer`): [`Buffer`](internal_.Buffer.md)

Copies the passed {buffer} data onto a new {Buffer} instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buffer` | [`Buffer`](internal_.Buffer.md) | The buffer to copy. |

#### Returns

[`Buffer`](internal_.Buffer.md)

**`Deprecated`**

since v10.0.0 - Use `Buffer.from(buffer)` instead.

#### Defined in

node_modules/@types/node/buffer.d.ts:300

## Properties

### poolSize

• **poolSize**: `number`

This is the size (in bytes) of pre-allocated internal `Buffer` instances used
for pooling. This value may be modified.

**`Since`**

v0.11.3

#### Defined in

node_modules/@types/node/buffer.d.ts:630

## Methods

### alloc

▸ **alloc**(`size`, `fill?`, `encoding?`): [`Buffer`](internal_.Buffer.md)

Allocates a new `Buffer` of `size` bytes. If `fill` is `undefined`, the`Buffer` will be zero-filled.

```js
import { Buffer } from 'node:buffer';

const buf = Buffer.alloc(5);

console.log(buf);
// Prints: <Buffer 00 00 00 00 00>
```

If `size` is larger than constants.MAX_LENGTH or smaller than 0, `ERR_OUT_OF_RANGE` is thrown.

If `fill` is specified, the allocated `Buffer` will be initialized by calling `buf.fill(fill)`.

```js
import { Buffer } from 'node:buffer';

const buf = Buffer.alloc(5, 'a');

console.log(buf);
// Prints: <Buffer 61 61 61 61 61>
```

If both `fill` and `encoding` are specified, the allocated `Buffer` will be
initialized by calling `buf.fill(fill, encoding)`.

```js
import { Buffer } from 'node:buffer';

const buf = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64');

console.log(buf);
// Prints: <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
```

Calling `Buffer.alloc()` can be measurably slower than the alternative `Buffer.allocUnsafe()` but ensures that the newly created `Buffer` instance
contents will never contain sensitive data from previous allocations, including
data that might not have been allocated for `Buffer`s.

A `TypeError` will be thrown if `size` is not a number.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `size` | `number` | The desired length of the new `Buffer`. |
| `fill?` | `string` \| `number` \| `Uint8Array` | A value to pre-fill the new `Buffer` with. |
| `encoding?` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) | If `fill` is a string, this is its encoding. |

#### Returns

[`Buffer`](internal_.Buffer.md)

**`Since`**

v5.10.0

#### Defined in

node_modules/@types/node/buffer.d.ts:543

___

### allocUnsafe

▸ **allocUnsafe**(`size`): [`Buffer`](internal_.Buffer.md)

Allocates a new `Buffer` of `size` bytes. If `size` is larger than constants.MAX_LENGTH or smaller than 0, `ERR_OUT_OF_RANGE` is thrown.

The underlying memory for `Buffer` instances created in this way is _not_
_initialized_. The contents of the newly created `Buffer` are unknown and _may contain sensitive data_. Use `Buffer.alloc()` instead to initialize`Buffer` instances with zeroes.

```js
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(10);

console.log(buf);
// Prints (contents may vary): <Buffer a0 8b 28 3f 01 00 00 00 50 32>

buf.fill(0);

console.log(buf);
// Prints: <Buffer 00 00 00 00 00 00 00 00 00 00>
```

A `TypeError` will be thrown if `size` is not a number.

The `Buffer` module pre-allocates an internal `Buffer` instance of
size `Buffer.poolSize` that is used as a pool for the fast allocation of new `Buffer` instances created using `Buffer.allocUnsafe()`, `Buffer.from(array)`,
and `Buffer.concat()` only when `size` is less than `Buffer.poolSize >>> 1` (floor of `Buffer.poolSize` divided by two).

Use of this pre-allocated internal memory pool is a key difference between
calling `Buffer.alloc(size, fill)` vs. `Buffer.allocUnsafe(size).fill(fill)`.
Specifically, `Buffer.alloc(size, fill)` will _never_ use the internal `Buffer`pool, while `Buffer.allocUnsafe(size).fill(fill)`_will_ use the internal`Buffer` pool if `size` is less
than or equal to half `Buffer.poolSize`. The
difference is subtle but can be important when an application requires the
additional performance that `Buffer.allocUnsafe()` provides.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `size` | `number` | The desired length of the new `Buffer`. |

#### Returns

[`Buffer`](internal_.Buffer.md)

**`Since`**

v5.10.0

#### Defined in

node_modules/@types/node/buffer.d.ts:579

___

### allocUnsafeSlow

▸ **allocUnsafeSlow**(`size`): [`Buffer`](internal_.Buffer.md)

Allocates a new `Buffer` of `size` bytes. If `size` is larger than constants.MAX_LENGTH or smaller than 0, `ERR_OUT_OF_RANGE` is thrown. A zero-length `Buffer` is created if
`size` is 0.

The underlying memory for `Buffer` instances created in this way is _not_
_initialized_. The contents of the newly created `Buffer` are unknown and _may contain sensitive data_. Use `buf.fill(0)` to initialize
such `Buffer` instances with zeroes.

When using `Buffer.allocUnsafe()` to allocate new `Buffer` instances,
allocations under 4 KiB are sliced from a single pre-allocated `Buffer`. This
allows applications to avoid the garbage collection overhead of creating many
individually allocated `Buffer` instances. This approach improves both
performance and memory usage by eliminating the need to track and clean up as
many individual `ArrayBuffer` objects.

However, in the case where a developer may need to retain a small chunk of
memory from a pool for an indeterminate amount of time, it may be appropriate
to create an un-pooled `Buffer` instance using `Buffer.allocUnsafeSlow()` and
then copying out the relevant bits.

```js
import { Buffer } from 'node:buffer';

// Need to keep around a few small chunks of memory.
const store = [];

socket.on('readable', () => {
  let data;
  while (null !== (data = readable.read())) {
    // Allocate for retained data.
    const sb = Buffer.allocUnsafeSlow(10);

    // Copy the data into the new allocation.
    data.copy(sb, 0, 0, 10);

    store.push(sb);
  }
});
```

A `TypeError` will be thrown if `size` is not a number.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `size` | `number` | The desired length of the new `Buffer`. |

#### Returns

[`Buffer`](internal_.Buffer.md)

**`Since`**

v5.12.0

#### Defined in

node_modules/@types/node/buffer.d.ts:624

___

### byteLength

▸ **byteLength**(`string`, `encoding?`): `number`

Returns the byte length of a string when encoded using `encoding`.
This is not the same as [`String.prototype.length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length), which does not account
for the encoding that is used to convert the string into bytes.

For `'base64'`, `'base64url'`, and `'hex'`, this function assumes valid input.
For strings that contain non-base64/hex-encoded data (e.g. whitespace), the
return value might be greater than the length of a `Buffer` created from the
string.

```js
import { Buffer } from 'node:buffer';

const str = '\u00bd + \u00bc = \u00be';

console.log(`${str}: ${str.length} characters, ` +
            `${Buffer.byteLength(str, 'utf8')} bytes`);
// Prints: ½ + ¼ = ¾: 9 characters, 12 bytes
```

When `string` is a
`Buffer`/[`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)/[`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/-
Reference/Global_Objects/TypedArray)/[`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)/[`SharedArrayBuffer`](https://develop-
er.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer), the byte length as reported by `.byteLength`is returned.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` \| [`Buffer`](internal_.Buffer.md) \| `ArrayBuffer` \| [`SharedArrayBuffer`](internal_.SharedArrayBuffer.md) \| [`ArrayBufferView`](../modules/internal_.md#arraybufferview) | A value to calculate the length of. |
| `encoding?` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) | If `string` is a string, this is its encoding. |

#### Returns

`number`

The number of bytes contained within `string`.

**`Since`**

v0.1.90

#### Defined in

node_modules/@types/node/buffer.d.ts:418

___

### compare

▸ **compare**(`buf1`, `buf2`): ``-1`` \| ``0`` \| ``1``

Compares `buf1` to `buf2`, typically for the purpose of sorting arrays of`Buffer` instances. This is equivalent to calling `buf1.compare(buf2)`.

```js
import { Buffer } from 'node:buffer';

const buf1 = Buffer.from('1234');
const buf2 = Buffer.from('0123');
const arr = [buf1, buf2];

console.log(arr.sort(Buffer.compare));
// Prints: [ <Buffer 30 31 32 33>, <Buffer 31 32 33 34> ]
// (This result is equal to: [buf2, buf1].)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf1` | `Uint8Array` |
| `buf2` | `Uint8Array` |

#### Returns

``-1`` \| ``0`` \| ``1``

Either `-1`, `0`, or `1`, depending on the result of the comparison. See `compare` for details.

**`Since`**

v0.11.13

#### Defined in

node_modules/@types/node/buffer.d.ts:495

___

### concat

▸ **concat**(`list`, `totalLength?`): [`Buffer`](internal_.Buffer.md)

Returns a new `Buffer` which is the result of concatenating all the `Buffer`instances in the `list` together.

If the list has no items, or if the `totalLength` is 0, then a new zero-length`Buffer` is returned.

If `totalLength` is not provided, it is calculated from the `Buffer` instances
in `list` by adding their lengths.

If `totalLength` is provided, it is coerced to an unsigned integer. If the
combined length of the `Buffer`s in `list` exceeds `totalLength`, the result is
truncated to `totalLength`.

```js
import { Buffer } from 'node:buffer';

// Create a single `Buffer` from a list of three `Buffer` instances.

const buf1 = Buffer.alloc(10);
const buf2 = Buffer.alloc(14);
const buf3 = Buffer.alloc(18);
const totalLength = buf1.length + buf2.length + buf3.length;

console.log(totalLength);
// Prints: 42

const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);

console.log(bufA);
// Prints: <Buffer 00 00 00 00 ...>
console.log(bufA.length);
// Prints: 42
```

`Buffer.concat()` may also use the internal `Buffer` pool like `Buffer.allocUnsafe()` does.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | readonly `Uint8Array`[] | List of `Buffer` or Uint8Array instances to concatenate. |
| `totalLength?` | `number` | Total length of the `Buffer` instances in `list` when concatenated. |

#### Returns

[`Buffer`](internal_.Buffer.md)

**`Since`**

v0.7.11

#### Defined in

node_modules/@types/node/buffer.d.ts:460

___

### copyBytesFrom

▸ **copyBytesFrom**(`view`, `offset?`, `length?`): [`Buffer`](internal_.Buffer.md)

Copies the underlying memory of `view` into a new `Buffer`.

```js
const u16 = new Uint16Array([0, 0xffff]);
const buf = Buffer.copyBytesFrom(u16, 1, 1);
u16[1] = 0;
console.log(buf.length); // 2
console.log(buf[0]); // 255
console.log(buf[1]); // 255
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `view` | [`TypedArray`](../modules/internal_.md#typedarray) | The {TypedArray} to copy. |
| `offset?` | `number` | The starting offset within `view`. |
| `length?` | `number` | The number of elements from `view` to copy. |

#### Returns

[`Buffer`](internal_.Buffer.md)

**`Since`**

v19.8.0

#### Defined in

node_modules/@types/node/buffer.d.ts:477

___

### from

▸ **from**(`arrayBuffer`, `byteOffset?`, `length?`): [`Buffer`](internal_.Buffer.md)

Allocates a new `Buffer` using an `array` of bytes in the range `0` – `255`.
Array entries outside that range will be truncated to fit into it.

```js
import { Buffer } from 'node:buffer';

// Creates a new Buffer containing the UTF-8 bytes of the string 'buffer'.
const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
```

If `array` is an `Array`\-like object (that is, one with a `length` property of
type `number`), it is treated as if it is an array, unless it is a `Buffer` or
a `Uint8Array`. This means all other `TypedArray` variants get treated as an`Array`. To create a `Buffer` from the bytes backing a `TypedArray`, use `Buffer.copyBytesFrom()`.

A `TypeError` will be thrown if `array` is not an `Array` or another type
appropriate for `Buffer.from()` variants.

`Buffer.from(array)` and `Buffer.from(string)` may also use the internal`Buffer` pool like `Buffer.allocUnsafe()` does.

#### Parameters

| Name | Type |
| :------ | :------ |
| `arrayBuffer` | [`WithImplicitCoercion`](../modules/internal_.md#withimplicitcoercion)\<`ArrayBuffer` \| [`SharedArrayBuffer`](internal_.SharedArrayBuffer.md)\> |
| `byteOffset?` | `number` |
| `length?` | `number` |

#### Returns

[`Buffer`](internal_.Buffer.md)

**`Since`**

v5.10.0

#### Defined in

node_modules/@types/node/buffer.d.ts:322

▸ **from**(`data`): [`Buffer`](internal_.Buffer.md)

Creates a new Buffer using the passed {data}

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` \| readonly `number`[] | data to create a new Buffer |

#### Returns

[`Buffer`](internal_.Buffer.md)

#### Defined in

node_modules/@types/node/buffer.d.ts:331

▸ **from**(`data`): [`Buffer`](internal_.Buffer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`WithImplicitCoercion`](../modules/internal_.md#withimplicitcoercion)\<`string` \| `Uint8Array` \| readonly `number`[]\> |

#### Returns

[`Buffer`](internal_.Buffer.md)

#### Defined in

node_modules/@types/node/buffer.d.ts:332

▸ **from**(`str`, `encoding?`): [`Buffer`](internal_.Buffer.md)

Creates a new Buffer containing the given JavaScript string {str}.
If provided, the {encoding} parameter identifies the character encoding.
If not provided, {encoding} defaults to 'utf8'.

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | [`WithImplicitCoercion`](../modules/internal_.md#withimplicitcoercion)\<`string`\> \| \{ `[toPrimitive]`: (`hint`: ``"string"``) => `string`  } |
| `encoding?` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |

#### Returns

[`Buffer`](internal_.Buffer.md)

#### Defined in

node_modules/@types/node/buffer.d.ts:338

___

### isBuffer

▸ **isBuffer**(`obj`): obj is Buffer

Returns `true` if `obj` is a `Buffer`, `false` otherwise.

```js
import { Buffer } from 'node:buffer';

Buffer.isBuffer(Buffer.alloc(10)); // true
Buffer.isBuffer(Buffer.from('foo')); // true
Buffer.isBuffer('a string'); // false
Buffer.isBuffer([]); // false
Buffer.isBuffer(new Uint8Array(1024)); // false
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

obj is Buffer

**`Since`**

v0.1.101

#### Defined in

node_modules/@types/node/buffer.d.ts:365

___

### isEncoding

▸ **isEncoding**(`encoding`): encoding is BufferEncoding

Returns `true` if `encoding` is the name of a supported character encoding,
or `false` otherwise.

```js
import { Buffer } from 'node:buffer';

console.log(Buffer.isEncoding('utf8'));
// Prints: true

console.log(Buffer.isEncoding('hex'));
// Prints: true

console.log(Buffer.isEncoding('utf/8'));
// Prints: false

console.log(Buffer.isEncoding(''));
// Prints: false
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `encoding` | `string` | A character encoding name to check. |

#### Returns

encoding is BufferEncoding

**`Since`**

v0.9.1

#### Defined in

node_modules/@types/node/buffer.d.ts:388

___

### of

▸ **of**(`...items`): [`Buffer`](internal_.Buffer.md)

Creates a new Buffer using the passed {data}

#### Parameters

| Name | Type |
| :------ | :------ |
| `...items` | `number`[] |

#### Returns

[`Buffer`](internal_.Buffer.md)

#### Defined in

node_modules/@types/node/buffer.d.ts:350
