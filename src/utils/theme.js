export const toggleDarkMode = darkMode => {
  if (darkMode) {
    document.documentElement.classList.remove('dark')
  } else {
    document.documentElement.classList.add('dark')
  }
}
