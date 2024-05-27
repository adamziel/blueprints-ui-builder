export const isValidUrl = (string: string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export const isValidPluginSlug = (string: string) => {
  // Define a simple slug validation (WordPress plugin slugs are usually alphanumeric with hyphens)
  return /^[a-z0-9\-]+$/.test(string);
};
