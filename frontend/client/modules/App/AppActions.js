export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const OPEN_ERROR_MESSAGE = 'OPEN_ERROR_MESSAGE';

export function openErrorMessage(err) {
  console.error(err); // eslint-disable-line
  return {
    type: OPEN_SNACKBAR,
    data: { message: err },
  };
}

export function closeSnackBar() {
  return {
    type: CLOSE_SNACKBAR,
  };
}
