(function () {
  var DARK_THEME = "dark";
  var LIGHT_THEME = "light";
  var THEME_KEY = "theme";
  var preferredTheme;

  function setTheme(newTheme) {
    window.__theme = newTheme;
    preferredTheme = newTheme;
    document.body.className = newTheme;
  }

  try {
    var savedPreferredTheme = localStorage.getItem(THEME_KEY);

    if (
      savedPreferredTheme === DARK_THEME ||
      savedPreferredTheme === LIGHT_THEME
    ) {
      preferredTheme = savedPreferredTheme;
    }
  } catch (error) {}

  window.__setPreferredTheme = function setPreferredTheme(newTheme) {
    setTheme(newTheme);

    try {
      localStorage.setItem(THEME_KEY, newTheme);
    } catch (error) {}
  };

  var userOSThemePreference = window.matchMedia("(prefers-color-scheme: dark)");

  setTheme(
    preferredTheme || (userOSThemePreference.matches ? DARK_THEME : LIGHT_THEME)
  );
})();
