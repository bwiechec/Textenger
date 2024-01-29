# Textenger

## Description

Textenger is chat app in which you can create named group chats and send messages to your friends (but only if they're predefined in data base)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Development](#development)

## Installation

Requirements:

- Node.js
- yarn

To install project dependencies use

```
yarn install
```

To run app use

```
yarn run dev
```

To build app use

```
yarn run build
```

## Usage

|                                                                         |                                                                     |
| :---------------------------------------------------------------------: | :-----------------------------------------------------------------: |
|                 _1. Home page_ ![home page](docs/1.png)                 |               _2. Main page_ ![Main page](docs/2.png)               |
|        _3. Add new chat modal_ ![Add new chat modal](docs/3.png)        | _4. Messages with send date_ ![Messages with send date](docs/4.png) |
| _5. Thread modification panel_ ![Thread modification panel](docs/5.png) |                                                                     |

## Features

1. Home page
   Here you can select on which user you want to log in and access chats.
2. Main page
   - On main page user can select existing thread or add new one. After selecting chat user can writte messages to chat members.
   - When message input is empty user can send emoji selected in chat modification panel, emoji sent this way has no background color.
   - After clicking on message user can access message send date.
   - In right corner user can open/close thread modification panel  
     ![Open thread modification panel](docs/5_1.png)
   - Thread modification panel allows user to change:  
      ![Thread modification panel options](docs/5_2.png)
     - Thread name  
       ![Thread name change modal](docs/5_3.png)
     - Thread message color theme  
       ![Thread color change modal](docs/5_4.png)
     - Thread emoji  
       ![Thread emoji change modal](docs/5_5.png)
   - Thread modification panel also allows user to delete other users if there is more than 2 chat members  
     ![Thread members management](docs/5_6.png)
   - In the bottom user can delete whole thread  
     ![Thread delete](docs/5_7.png)
3. Add new chat modal  
   User can add new chat threads using modal.
4. Other  
   Mobile first aproach - app is made to work on every device size.

## Development

- Problems faced during coding  
  While coding this app I had some problems with firebase data structures.
  I had to find a way to keep flat data structure and in the same time be able to store required data.
  Meanwile I had to convert data types to be easily accessible on frontend.

- Potential further development
  - Managing chat members (add member)
  - Message reactions
  - Deleting messages
  - Chat images instead of avatar with first letter
