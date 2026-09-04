export const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

export const emailRegex =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const phoneRegex = /^[6-9]\d{9}$/;

export const passwordRegex =
  /^(?=(?:.*[a-z]){5,})(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;