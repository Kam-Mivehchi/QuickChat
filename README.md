# Messaging App
## Description
Full stack messaging app built with typescript, Node, Express, MongoDB, React and Websockets
## API Endpoints
## Users

   + GET /api/users/
   + POST /api/users/register
   + POST /api/users/login
   + GET /api/users/chats
   + GET /api/users/{userId}
   + PUT /api/users/{userId}
   + DELETE /api/users/{userId}
   + PUT /api/users/{userId}/recovery
## Chat
   + POST /api/chats
   + POST /api/chats/view
   + POST /chats/{chatId}
   + GET /chats/{chatId}
   + DELETE /chats/{chatId}
   + PUT /chats/{chatId}/add       //THESE CAN BE COMBINED WITH QUERY PARAMS
   + PUT /chats/{chatId}/remove
   + GET /chats/{chatId}/messages/{chatId}

## Messages
