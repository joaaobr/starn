# Starn 


### Starn is a simple and fast messaging system.


### Starn is an MIT-licensed open source project.


## Getting Started

## Installation

```js
  npm install starn  
```
## or
```js
  yarn add starn
```

# Usage

## How to create new Starn

```ts
  import { Starn } from 'starn';

  const starn = new Starn({
    port: 2222,
    host: "localhost",
    topics: ["A"]
  });

```

## How to create new Sender

```ts
  const sender = starn.sender()
  
  sender.sendMessage("A", "Hello A");
```

## How to create new Client

```ts
  const client = starn.client();
   
   client.getMessage("A", data => console.log(data));
```

## LICENSE

[MIT](https://github.com/joaaobr/starn/blob/main/LICENSE)