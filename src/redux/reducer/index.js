import {combineReducers} from "redux";
import loginReducer from "./LoginReducer"
import getFriendsReducers from "./GetFriendsReducer";
import SearchReducers from "./SearchReducer";
import userUpdateReducers from "./UserUpdateReducer";
import onaylamaReducers from "./OnaylamaReducer";

export default combineReducers({
   loginResponse : loginReducer,
   getFriendsResponse :getFriendsReducers,
   searchResponse :SearchReducers,
   userUpdateResponse :userUpdateReducers,
   onaylamaResponse :onaylamaReducers,
});