export function getPasswordRegex() {
  return /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
}
