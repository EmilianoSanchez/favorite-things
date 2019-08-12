import apiClient from '../../apis/favoriteThings';
import history from '../../history';
import {
  FETCH_ALL,

  CREATE_FAVORITETHING,
  FETCH_FAVORITETHINGS,
  FETCH_FAVORITETHING,
  DELETE_FAVORITETHING,
  EDIT_FAVORITETHING,

  CREATE_CATEGORY,
  FETCH_CATEGORYS,
  FETCH_CATEGORY,

  SELECT_CATEGORY,

  CREATE_METADATAENTRY,
  FETCH_METADATAS,
  DELETE_METADATAENTRY,

  CREATE_ENUM,
  FETCH_ENUMS,
  DELETE_ENUM,
} from './types';


export const createFavoriteThing = formValues => async (dispatch, getState) => {
  const response = await apiClient.post('/favorite-things/', { ...formValues });

  dispatch({ type: CREATE_FAVORITETHING, payload: response.data });
  history.push('/');
};

export const fetchFavoriteThings = () => async dispatch => {
  const response = await apiClient.get('/favorite-things/');

  dispatch({ type: FETCH_FAVORITETHINGS, payload: response.data });
};

export const fetchFavoriteThing = id => async dispatch => {
  const response = await apiClient.get(`/favorite-things/${id}/`);

  dispatch({ type: FETCH_FAVORITETHING, payload: response.data });
};

export const editFavoriteThing = (id, formValues) => async dispatch => {
  const response = await apiClient.put(`/favorite-things/${id}/`, formValues);

  dispatch({ type: EDIT_FAVORITETHING, payload: response.data });
  history.push('/');
};

export const deleteFavoriteThing = id => async dispatch => {
  await apiClient.delete(`/favorite-things/${id}/`);

  dispatch({ type: DELETE_FAVORITETHING, payload: id });
  history.push('/');
};


export const createCategory = name => async (dispatch, getState) => {
  const formValues = { name };
  const response = await apiClient.post('/categories/', { ...formValues });

  dispatch({ type: CREATE_CATEGORY, payload: response.data });
  history.push('/');
};

export const fetchCategorys = () => async dispatch => {
  const response = await apiClient.get('/categories/');

  dispatch({ type: FETCH_CATEGORYS, payload: response.data });
};

export const fetchCategory = id => async dispatch => {
  const response = await apiClient.get(`/categories/${id}/`);

  dispatch({ type: FETCH_CATEGORY, payload: response.data });
};

export const fetchAll = () => async dispatch => {
  // const responseCategories = await apiClient.get('/categories/');
  // const responseFavoriteThings = await apiClient.get('/favorite-things/');
  // const responseMetadata = await apiClient.get('/metadatas/');
  // const responseEnums = await apiClient.get('/enums/');
  const [responseCategories, responseFavoriteThings, responseMetadata, responseEnums]
      = await Promise.all([apiClient.get('/categories/'), apiClient.get('/favorite-things/'), apiClient.get('/metadatas/'), apiClient.get('/enums/')]);

  const pureAction = { type: FETCH_ALL, payload: {
      categories: responseCategories.data,
      favoriteThings: responseFavoriteThings.data,
      metadatas: responseMetadata.data,
      enums: responseEnums.data,
    }};
  dispatch(pureAction);
};


export const selectCategory = id => {
  return {
    type: SELECT_CATEGORY,
    id
  }
};

export const createMetadataEntry = formValues => async (dispatch, getState) => {
  const response = await apiClient.post('/metadatas/', { ...formValues });

  dispatch({ type: CREATE_METADATAENTRY, payload: response.data });
  history.push(`/favorite-things/edit/${formValues.favorite_thing_id}`);
};


export const deleteMetadataEntry = (favoriteThingId, metadataId) => async dispatch => {
  await apiClient.delete(`/metadatas/${metadataId}/`);

  dispatch({ type: DELETE_METADATAENTRY, payload: metadataId });
  history.push(`/favorite-things/edit/${favoriteThingId}`);
};

export const fetchMetadatas = () => async dispatch => {
  const response = await apiClient.get('/metadatas/');

  dispatch({ type: FETCH_METADATAS, payload: response.data });
};


export const createEnum = formValues => async (dispatch) => {
  const response = await apiClient.post('/enums/', { ...formValues });

  dispatch({ type: CREATE_ENUM, payload: response.data });
  history.push('/favorite-things/enums');
};


export const deleteEnum = id => async dispatch => {
  await apiClient.delete(`/enums/${id}/`);

  dispatch({ type: DELETE_ENUM, payload: id });
  history.push('/favorite-things/enums');
};

export const fetchEnums = () => async dispatch => {
  const response = await apiClient.get('/enums/');

  dispatch({ type: FETCH_ENUMS, payload: response.data });
};
