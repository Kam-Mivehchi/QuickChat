import { Reducer } from 'redux';

// Define the initial state
const initialState: AppState = {
   currentUser: {
      _id: "",
      username: "",
      email: "",
      avatar: "",
      bio: "",
   },
   unread: [],
   allChats: [],
   currentChat: {
      _id: "",
      roomName: "",
      members: [],
      lastMessage: "",
      admin: "",
      isGroup: false,
      updatedAt: "",
      createdAt: "",
   },
   chatMessages: [],
   isUserTyping: false,
   isRecipientTyping: false,
   isLoading: false,
   isError: false,
};
interface IChatroomResponse {
   _id: string;
   roomName: string;
   members: string[];
   lastMessage: string;
   admin: string;
   isGroup: boolean;
   updatedAt: string;
   createdAt: string;

}

// Create the reducer
const appReducer: Reducer<AppState, AppAction> = (state = initialState, action) => {
   switch (action.type) {
      case ActionTypes.SET_CURRENT_USER:
         return {
            ...state,
            currentUser: action.user
         };
      case ActionTypes.ADD_TO_UNREAD:
         return {
            ...state,
            message: [...state.unread, action.message],
         };
      case ActionTypes.REMOVE_FROM_UNREAD:
         return {
            ...state,
            message: state.unread.filter((message) => message._id !== action.message._id),
         };
      case ActionTypes.SET_CURRENT_CHAT:
         return {
            ...state,
            currentChat: action.chatroom
         };
      case ActionTypes.SET_ALL_CHATS:
         return {
            ...state,
            allChats: [...action.chatroom]
         };
      case ActionTypes.ADD_TO_ALL_CHATS:
         return {
            ...state,
            allChats: [...state.allChats, action.chatroom]
         };
      case ActionTypes.REMOVE_FROM_ALL_CHATS:
         return {
            ...state,
            allChats: [...state.allChats, action.chatroom]
         };
      case ActionTypes.ADD_NEW_MESSAGE:
         return {
            ...state,
            chatMessages: [...state.chatMessages, action.message]
         };
      case ActionTypes.SET_MESSAGES:
         return {
            ...state,
            chatMessages: [...action.messages]
         };
      case ActionTypes.UPDATE_USER_TYPING:
         return {
            ...state,
            isUserTyping: action.isUserTyping
         };
      case ActionTypes.UPDATE_RECIPIENT_TYPING:
         return {
            ...state,
            isRecipientTyping: action.isRecipientTyping,
         };
      case ActionTypes.SET_LOADING:
         return {
            ...state,
            isLoading: action.loading,
         };
      case ActionTypes.SET_ERROR:
         return {
            ...state,
            isError: action.error,

         };
      default:
         return state;
   }
};

export default appReducer;
// Define the state shape
// Define the actions
export enum ActionTypes {
   SET_CURRENT_USER = 'SET_CURRENT_USER',
   ADD_TO_UNREAD = 'ADD_TO_UNREAD',
   REMOVE_FROM_UNREAD = 'REMOVE_FROM_UNREAD',
   SET_CURRENT_CHAT = 'SET_CURRENT_CHAT',
   SET_MESSAGES = "SET_MESSAGES",
   ADD_NEW_MESSAGE = "ADD_NEW_MESSAGE",
   UPDATE_USER_TYPING = "UPDATE_USER_TYPING",
   UPDATE_RECIPIENT_TYPING = "UPDATE_RECIPIENT_TYPING",
   SET_LOADING = "SET_LOADING",
   SET_ERROR = "SET_ERROR",
   SET_ALL_CHATS = "SET_ALL_CHATS",
   REMOVE_FROM_ALL_CHATS = "REMOVE_FROM_ALL_CHATS",
   ADD_TO_ALL_CHATS = "ADD_TO_ALL_CHATS",

}
export interface AppState {
   currentUser: IUserState;
   unread: IMessage[];
   currentChat: IChatroomResponse;
   chatMessages: IMessage[];
   allChats: IChatroom[];
   isUserTyping: boolean;
   isRecipientTyping: boolean;
   isLoading: boolean;
   isError: boolean;
}

interface IUserState {
   _id: string,
   username: string,
   email: string,
   avatar: string,
   bio: string,
}



interface CurrentUserAction {
   user: IUserState;
   type: ActionTypes.SET_CURRENT_USER;
}

interface AddUnreadAction {
   message: IMessage;
   type: ActionTypes.ADD_TO_UNREAD;
}
interface RemoveUnreadAction {
   message: IMessage;
   type: ActionTypes.REMOVE_FROM_UNREAD;
}
interface CurrentChatAction {
   chatroom: IChatroomResponse;
   type: ActionTypes.SET_CURRENT_CHAT;
}
interface CurrentMessagesAction {
   messages: IMessage[];
   type: ActionTypes.SET_MESSAGES;
}
interface AddToAllChatsAction {
   chatroom: IChatroom;
   type: ActionTypes.ADD_TO_ALL_CHATS;
}
interface SetChatsAction {
   chatroom: IChatroom[];
   type: ActionTypes.SET_ALL_CHATS;
}
interface RemoveFromAllChatsAction {
   chatroom: IChatroom;
   type: ActionTypes.REMOVE_FROM_ALL_CHATS;
}
interface NewMessageAction {
   message: IMessage;
   type: ActionTypes.ADD_NEW_MESSAGE;
}
interface UpdateUserTyping {
   isUserTyping: boolean;
   type: ActionTypes.UPDATE_USER_TYPING;
}
interface UpdateRecipientTyping {
   isRecipientTyping: boolean;
   type: ActionTypes.UPDATE_RECIPIENT_TYPING;
}
interface SetLoading {
   loading: boolean;
   type: ActionTypes.SET_LOADING;
}
interface SetError {
   error: boolean;
   type: ActionTypes.SET_ERROR;
}

type AppAction = CurrentUserAction | RemoveUnreadAction | AddUnreadAction | CurrentChatAction | NewMessageAction | RemoveFromAllChatsAction | AddToAllChatsAction | UpdateUserTyping | UpdateRecipientTyping | SetChatsAction | SetLoading | SetError | CurrentMessagesAction;

