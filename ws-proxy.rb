# This receives the websocket information and sends that as REST requests to our API

# websockets+events
require 'faye/websocket'
require 'eventmachine'
require 'json'

# http requests
require 'uri'
require 'net/http'

WS_URL = 'ws://localhost:8080/'
API_URL = URI('http://localhost:3000/api/v1/stock_updates')

EM.run {
  ws = Faye::WebSocket::Client.new(WS_URL)

  ws.on :message do |event|
    # Simply forward every message to rails.
    # No security/connection/decoding error handling is being taken into consideration here, for time purposes.
    Net::HTTP.post_form(API_URL, JSON.parse(event.data))
  end
}
