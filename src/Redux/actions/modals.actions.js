import { TOGGLE_MODAL } from "../constants";

export const toggleModal = (modal) => (dispatch, getState) => {
  const modalState = getState().modals[modal];
  dispatch({
    type: TOGGLE_MODAL,
    payload: {[modal]: !modalState},
  })

};