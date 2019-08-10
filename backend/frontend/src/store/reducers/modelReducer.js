import _ from 'lodash';
import {
  FETCH_FAVORITETHING,
  FETCH_FAVORITETHINGS,
  CREATE_FAVORITETHING,
  EDIT_FAVORITETHING,
  DELETE_FAVORITETHING,
  CREATE_CATEGORY,
  FETCH_CATEGORYS,
  FETCH_CATEGORY,
  FETCH_ALL,
  SELECT_CATEGORY,

  CREATE_METADATAENTRY,
  FETCH_METADATAS,
  DELETE_METADATAENTRY,
  CREATE_ENUM,
  FETCH_ENUMS,
  DELETE_ENUM,
} from '../actions/types';

const INITIAL_STATE = {
  categories: {},
  favoriteThings: {},
  metadatas: {},
  enums: {},
  selectedCategory: ""
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_FAVORITETHINGS:
      return {
        ...state,
        favoriteThings: {..._.mapKeys(action.payload, 'id') }
      };
    case FETCH_FAVORITETHING:
      return {
        ...state,
        favoriteThings: { ...state.favoriteThings, [action.payload.id]: action.payload }
      };
    case CREATE_FAVORITETHING:
      return {
        ...state,
        favoriteThings: { ...state.favoriteThings, [action.payload.id]: action.payload }
      };
    case EDIT_FAVORITETHING:
      return {
        ...state,
        favoriteThings: { ...state.favoriteThings, [action.payload.id]: action.payload }
      };
    case DELETE_FAVORITETHING:
      return {
        ...state,
        favoriteThings: _.omit(state.favoriteThings, action.payload)
      };

    case FETCH_CATEGORYS:
      return {
        ...state,
        categories: {..._.mapKeys(action.payload, 'id') },
      };
    case FETCH_CATEGORY:
      return {
        ...state,
        categories: {...state.categories, [action.payload.id]: action.payload},
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: {...state.categories, [action.payload.id]: action.payload},
      };
    case FETCH_ALL:
      return {
        ...state,
        categories: {..._.mapKeys(action.payload.categories, 'id') },
        favoriteThings: {..._.mapKeys(action.payload.favoriteThings, 'id') },
        metadatas: {..._.mapKeys(action.payload.metadatas, 'id') },
        enums: {..._.mapKeys(action.payload.enums, 'id') },
      };
    case SELECT_CATEGORY:
      return {
        ...state, selectedCategory: action.id
      };
    case CREATE_METADATAENTRY:
      return {
        ...state,
        metadatas: {...state.metadatas, [action.payload.id]: action.payload},
      };
    case CREATE_ENUM:
      return {
        ...state,
        enums: {...state.enums, [action.payload.id]: action.payload},
      };
    case DELETE_METADATAENTRY:
      return {
        ...state,
        metadatas: _.omit(state.metadatas, action.payload)
      };
    case DELETE_ENUM:
      return {
        ...state,
        enums: _.omit(state.enums, action.payload)
      };
    case FETCH_METADATAS:
      return {
        ...state,
        metadatas: {..._.mapKeys(action.payload, 'id') },
      };
    case FETCH_ENUMS:
      return {
        ...state,
        enums: {..._.mapKeys(action.payload, 'id') },
      };
    default:
      return state;
  }
};
