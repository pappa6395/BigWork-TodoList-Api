export function successResponse(data: any, message = 'OK') {
  return {
    status: 'success',
    message,
    data,
  };
}

export function errorResponse(message = 'Error', data: any = null) {
  return {
    status: 'error',
    message,
    data,
  };
}
