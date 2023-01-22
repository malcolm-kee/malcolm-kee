---
title: MongoDB
---

## Aggregation

Aggregation in MongoDB works like Unix pipeline, one stage will pass to next stage.

### `$match`

`$match` works just like `.find`

### `$project`

`$project` is used to select a subset of the field, `0` means exclude and `1` means include.

We can map value using the syntax:

```js
{$project: {
    "newFieldName": "$firstLevel.second_level"
}}
```

Metaphorically, `$project` is like `Array.map`

### `$unwind`

Split single documents into multiple based on a specific field with array.

### Array expression

- use `$filter` to filter items in an array as part of `$project` operation.
- use `$arrayElemAt` to get item at specific index. (negative to get from end)
- use `$slice` to get subset by index
- use `$size` operator to get array length

### Accumulator

Accumulator examples:

- `$sum`
- `$avg`
- `$first`
- `$last`
- `$max`
- `$min`
- `$mergeObjects`
- `$push`
- `$addToSet`

We can use accumulator in group phase or project phase. When use in project phase, the accumulator can only be applied to array field.
