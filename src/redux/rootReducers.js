import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import themeUsersReducer from './themeUsers/reducers';
import { readMessageReducer } from './message/reducers';
import { readNotificationReducer } from './notification/reducers';
import authReducer from './authentication/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import { teamReducer } from './team/reducers';
import { userReducer, userGroupReducer } from './users/reducers';
import { sellersReducer } from './sellers/reducers';
import { headerSearchReducer } from './headerSearch/reducers';
import orderReducer from './orders/reducers';
import galleryReducer from './gallary/reducers';
import chartContentReducer from './chartContent/reducers';
import { emailReducer, SingleEmailReducer } from './email/reducers';
import { productReducer, SingleProductReducer } from './product/reducers';
import { chatReducer, SingleChatReducer, groupChatReducer, SingleChatGroupReducer } from './chat/reducers';
import { projectReducer, SingleProjectReducer } from './project/reducers';
import cartData from './cart/reducers';
import Todo from './todo/reducers';
import Note from './note/reducers';
import Task from './task/reducers';
import kanbanBoardReducer from './kanban/reducers';
import Contact from './contact/reducers';
import FileManager from './fileManager/reducers';

import { fsCrudReducer, fsSingleCrudReducer } from './firebase/firestore/reducers';
import { fsTutorReducer, fsSingleTutorReducer } from './firebase/tutor/reducers';
import { fsProfileReducer } from './firebase/profile/reducers';
import { fsConvosReducer } from './firebase/messages/reducers';
import firebaseAuth from './firebase/auth/reducers';
import { calendarReducer } from './firebase/Calendar/reducers';
import { sessionReducer, sessionSingleReducer } from './firebase/sessions/reducers';

const rootReducers = combineReducers({
  fb: firebaseReducer,
  fs: firestoreReducer,
  themeUsers: themeUsersReducer,
  headerSearchData: headerSearchReducer,
  message: readMessageReducer,
  notification: readNotificationReducer,
  orders: orderReducer,
  sellers: sellersReducer,
  users: userReducer,
  userGroup: userGroupReducer,
  team: teamReducer,
  auth: authReducer,
  gallery: galleryReducer,
  email: emailReducer,
  emailSingle: SingleEmailReducer,
  products: productReducer,
  product: SingleProductReducer,
  chatSingle: SingleChatReducer,
  chatSingleGroup: SingleChatGroupReducer,
  chat: chatReducer,
  groupChat: groupChatReducer,
  projects: projectReducer,
  project: SingleProjectReducer,
  calendar: calendarReducer,
  ChangeLayoutMode,
  chartContent: chartContentReducer,
  crud: fsCrudReducer,
  session: sessionReducer,
  conversations: fsConvosReducer,
  tutor: fsTutorReducer,
  singleTutor: fsSingleTutorReducer,
  profile: fsProfileReducer,
  singleCrud: fsSingleCrudReducer,
  singleSession: sessionSingleReducer,
  cart: cartData,
  Todo,
  Note,
  Task,
  KanbanBoard: kanbanBoardReducer,
  Contact,
  firebaseAuth,
  FileManager,
});

export default rootReducers;
