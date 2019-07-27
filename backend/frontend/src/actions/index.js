import favoriteThings from '../apis/favoriteThings';
import history from '../history';
import {
  CREATE_FAVORITETHING,
  FETCH_FAVORITETHINGS,
  FETCH_FAVORITETHING,
  DELETE_FAVORITETHING,
  EDIT_FAVORITETHING
} from './types';


export const createFavoriteThing = formValues => async (dispatch, getState) => {
  const response = await favoriteThings.post('/favorite-things/', { ...formValues });

  dispatch({ type: CREATE_FAVORITETHING, payload: response.data });
  history.push('/');
};

export const fetchFavoriteThings = () => async dispatch => {
  const response = await favoriteThings.get('/favorite-things/');

  dispatch({ type: FETCH_FAVORITETHINGS, payload: response.data });
};

export const fetchFavoriteThing = id => async dispatch => {
  const response = await favoriteThings.get(`/favorite-things/${id}/`);

  dispatch({ type: FETCH_FAVORITETHING, payload: response.data });
};

export const editFavoriteThing = (id, formValues) => async dispatch => {
  const response = await favoriteThings.put(`/favorite-things/${id}/`, formValues);

  dispatch({ type: EDIT_FAVORITETHING, payload: response.data });
  history.push('/');
};

export const deleteFavoriteThing = id => async dispatch => {
  await favoriteThings.delete(`/favorite-things/${id}/`);

  dispatch({ type: DELETE_FAVORITETHING, payload: id });
  history.push('/');
};
