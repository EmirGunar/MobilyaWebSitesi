export const buildImageUrl = (relativePath?: string): string => {
  const fallback = `${process.env.PUBLIC_URL}/arsel-logo.svg`;

  if (!relativePath) {
    return fallback;
  }

  const normalizedPath = relativePath.replace(/^\/+/, '');
  const encodedPath = normalizedPath
    .split('/')
    .map(segment => encodeURIComponent(segment))
    .join('/');

  // Production'da absolute path kullan
  if (process.env.NODE_ENV === 'production') {
    return `/${encodedPath}`;
  }

  return `${process.env.PUBLIC_URL}/${encodedPath}`;
};
