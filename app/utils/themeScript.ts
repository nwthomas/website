export const THEME_SCRIPT = `
  (function () {
    var DARK_THEME = "dark";
    var LIGHT_THEME = "light";
    var SYSTEM_THEME = "system";
    var THEME_KEY = "theme";
    var preferredTheme;
    var userOSThemePreference = window.matchMedia('(prefers-color-scheme: dark)');

    function setTheme(newTheme) {
      window.__theme = newTheme;
      preferredTheme = newTheme;
      if (newTheme === DARK_THEME || (newTheme === SYSTEM_THEME && userOSThemePreference.matches)) {
        document.documentElement.classList.add(DARK_THEME);
      } else {
        document.documentElement.classList.remove(DARK_THEME);
      }
    }

    try {
      var savedPreferredTheme = localStorage.getItem(THEME_KEY);

      if (savedPreferredTheme === DARK_THEME || savedPreferredTheme === LIGHT_THEME || savedPreferredTheme === SYSTEM_THEME) {
        preferredTheme = savedPreferredTheme;
      }
    } catch (error) {}

    window.__setPreferredTheme = function setPreferredTheme(newTheme) {
      setTheme(newTheme);

      try {
        localStorage.setItem(THEME_KEY, newTheme);
      } catch (error) {}
    }

    userOSThemePreference.addEventListener('change', function () {
      if (preferredTheme === SYSTEM_THEME) {
        setTheme(SYSTEM_THEME);
      }
    });

    setTheme(preferredTheme || SYSTEM_THEME);
  })();
`;
