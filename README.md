# Shoe Store

## Synopsis

Aldo Shoes is having a huge flash sale online. You provide support to the inventory department. They want to react real-time to various inventory problems as they arise.

You adjust the inventory whenever a new sale is completed. The return value includes the store, the shoe model and the inventory left for that shoe model in the store.

```
{
  'store' => 'ALDO Ste-Catherine',
  'model' => 'ADERI',
  'inventory' => 10,
}
```

`ALDO Ste-Catherine` store sold a pair of `ADERI` shoes. `ALDO Ste-Catherine` now has 10 pairs of `ADERI` left.

## Goal

**Design an interface that would allow the inventory department to monitor Aldo's stores and shoes inventory.**

Hope you’ll have fun with this little test. I know I had designing it.
Go wild. It can be anything you want. I’ve seen results printed to console, displayed on a webpage, and even someone who did periodical database dumps.

Here are a few ideas if you need an extra challenge:

- Add some sort of alerting system, e.g. When a shoe model at a store goes too low, or too high.
- Add a REST JSON API, or GraphQL
- Suggest shoe transfers from one store to another according to inventory
- Your own crazy idea!

Share your repository with us when you’re done.

Happy Hacking :)

## Installation

This projects uses the popular library `websocketd` to send messages.

If you're on a Mac, you can install `websocketd` using [Homebrew](http://brew.sh/). Just run `brew install websocketd`. For other operating systems, or if you don't want to use Homebrew, check out the link below.

**[Download for Linux, OS X and Windows](https://github.com/joewalnes/websocketd/wiki/Download-and-install)**

Note that a Ubuntu 64-bit version is already bundled here `bin/websocketd` for convenience.

## Getting Started

### Inventory Server

Your WebSocket Server is the tap that aggregates inventories from all stores.

You can run it directly from your own machine.

Run the following to start tapping into the inventory events.

```
(bin/)websocketd --port=8080 ruby inventory.rb
```

You now have an active connection to their stores opened on port 8080.

### Start listening on each event

Listen and react on each event using a WebSocket client.

Various implementations are at your disposal. Whatever floats your boat.

They all work the same way. Provide a method or a block to be executed whenever a new event occurs.

Here are two examples for our favorite languages:

#### Javascript

Open a console on a non-secured page:

```
var ws = new WebSocket('ws://localhost:8080/');

ws.onmessage = function(event) {
  console.log(event.data);
};
```

#### Ruby

##### Installation

```
gem install faye-websocket
gem install eventmachine
```

##### Example

```
require 'faye/websocket'
require 'eventmachine'
require 'json'

EM.run {
  ws = Faye::WebSocket::Client.new('ws://localhost:8080/')

  ws.on :message do |event|
    p JSON.parse(event.data)
  end
}
```

# Solution

## Backend
Backend is based off rails so we need to so some configurations before starting the server:
- Install gems with: `bundle install`
- Initialize/start a postgresql DB or container. No special PG version/extension required, just have it open on 5432 for user 'postgres'
```
docker run -d --name shoe-store-db -e POSTGRES_HOST_AUTH_METHOD=trust -p 5432:5432 postgres
```
- Go into backend (`cd backend`) and run `rails db:schema:load` for initializing.
- Start server with `rails s -b 0.0.0.0 -p 5000`

### Test that your installation works
- Initialize test DB `RAILS_ENV=test rails db:schema:load`
- Run `RAILS_ENV=test rspec`

### Inventory Analysis tool
- If the inventory is going crazy and you don't know what to do, simply use this tool and do what it says, it will get better:
- Run `rake inventory_analysis`

## Websockets proxy
In order to get the websocket data into rails, we use a "proxy" that receives the data from the websocket and forwards it to rails via API. Rails can be running in multiple servers and we need only one websocket connection to be sending data to it.
- Running it: `ruby ws-proxy.rb`

## Frontend
Frontend is based off react with functional components so basically you need to:
- Install packages `yarn install`
- Start project with `yarn start`
