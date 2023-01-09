---
title: RabbitMQ
---

RabbitMQ follows the AMQP (Advanced Message Queueing Protocol) specification.

AMQP defines 3 components:

- Exchange - components that routes messages to queues
- Queue - stores messages
- Binding - rule that tells the exchange which queue to route a particular message

The flow of data is: Application -> RabbitMQ -> Exchange -> Queue

Binding (also called _binding keys_) will be used by Exchange to evaluate _routing keys_ of each message and decide the target queue.

> Questions:
>
> - can one message directed to multiple queues?

RabbitMQ supports binding of Exchange to Exchange in addition of Exchange to Queue.

All commands in RabbitMQ are sent in a common data structure "Frame".

A frame has 5 parts:

- Frame type
- Channel number
- Frame size in bytes
- Frame payload
- End-byte marker

> Questions:
>
> - what does "channel" means?

There are 5 frame types:

1. Protocol header frame - used only once when connecting to RabbitMQ
1. Method frame - RPC request or response that's being sent/received from RabbitMQ
1. Content header frame - containers the size and properties for a message
1. Body frames - contain the contents of messages
1. Heartbeat frame - ensure both sides are working

Combinations:

- 1 method
- 1 content
- 1 or more body
