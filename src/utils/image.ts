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

  return `${process.env.PUBLIC_URL}/${encodedPath}`;
};
