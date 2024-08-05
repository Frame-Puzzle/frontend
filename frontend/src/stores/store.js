import { combineReducers, configureStore } from '@reduxjs/toolkit'
// 아래 방식으로 Redux에서 사용할 State 불러오세요!
// import user from './userSlice';
// import cart from './cartSlice';
// sessionStorage에 저장하고 싶으면
// import sessionStorage from 'redux-persist/lib/storage';
import user from './userSlice';
import piece from './pieceSlice';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// reducer 추가하는 곳
const rootReducer = combineReducers({
  // 아래 예제처럼 추가하면 됩니다.
  // user: user.reducer,
  // cart: cart.reducer
  user: user.reducer,
  piece: piece.reducer
});

const persistConfig = {
  key: 'root',
  storage: storage,
  // user Reducer만 persist 적용하려면 whitelist 사용하세요.
  // whitelist 외에도 blacklist 등 여러 option이 존재합니다.
  // whitelist: ['user']
  whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);