import {
    CHANGE_SERVICE_FIELD,
    FETCH_SERVICES_REQUEST,
    FETCH_SERVICES_FAILURE,
    FETCH_SERVICES_SUCCESS,
    ADD_SERVICE_REQUEST,
    ADD_SERVICE_FAILURE,
    ADD_SERVICE_SUCCESS,
    REMOVE_SERVICE,
    GET_SERVICE_REQUEST,
    GET_SERVICE_SUCCESS,
    GET_SERVICE_FAILURE,
  } from './actionTypes';
  
  export const fetchServicesRequest = () => ({
    type: FETCH_SERVICES_REQUEST,
  });
  
  export const fetchServicesFailure = error => ({
    type: FETCH_SERVICES_FAILURE,
    payload: {
      error,
    },
  });
  
  export const fetchServicesSuccess = items => ({
    type: FETCH_SERVICES_SUCCESS,
    payload: {
      items,
    },
  });
  
  export const addServiceRequest = (name, price) => ({
    type: ADD_SERVICE_REQUEST,
    payload: {
      name,
      price,
    },
  })
  
  export const addServiceFailure = error => ({
    type: ADD_SERVICE_FAILURE,
    payload: {
      error,
    },
  });
  
  export const addServiceSuccess = () => ({
    type: ADD_SERVICE_SUCCESS,
  });
  
  export const changeServiceField = (name, value) => ({
    type: CHANGE_SERVICE_FIELD,
    payload: {
      name,
      value,
    },
  });
  
  export const removeService = async (dispatch, id) => {
    dispatch(fetchServicesRequest());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, 
      { method: 'DELETE'}
      )
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch(e) {
      dispatch(fetchServicesFailure(e.message));
    } finally {
      fetchServices(dispatch);
    }
  };

  export const getServicesRequest = () => ({
    type: GET_SERVICE_REQUEST,
  });

  export const getServicesSuccess = items => ({
    type: GET_SERVICE_SUCCESS,
    payload: {
      items,
    },
  });

  export const getServicesFailure = error => ({
    type: GET_SERVICE_FAILURE,
    payload: {
      error,
    },
  });
  
  export const fetchServices = async dispatch => {
    dispatch(fetchServicesRequest());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}`, 
      //{ mode: 'no-cors'}
      )
      //console.log(response.json())
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      dispatch(fetchServicesSuccess(data));
    } catch (e) {
      dispatch(fetchServicesFailure(e.message));
    }
  }
  
  export const addService = async (dispatch, name, price, content, id = 0) => {
    dispatch(addServiceRequest());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, price, content }),
      })
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      dispatch(addServiceSuccess());
    } catch (e) {
      dispatch(addServiceFailure(e.message));
    }
    fetchServices(dispatch);
  }

  export const getService = async (dispatch, id) => {
    dispatch(getServicesRequest());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, 
      //{ mode: 'no-cors'}
      )
      //console.log(response.json())
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      dispatch(getServicesSuccess(data));
    } catch (e) {
      dispatch(getServicesFailure(e.message));
    }
  }
