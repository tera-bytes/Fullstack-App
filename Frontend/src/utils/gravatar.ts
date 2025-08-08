// Gravatar: https://en.gravatar.com/site/implement/images/
function md5(str: string) {

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash + str.charCodeAt(i)) & 0xffffffff;
    hash = (hash << 5) - hash;
  }
  return Math.abs(hash).toString(16);
}

export function gravatarUrl(email: string, size = 64) {
  const normalized = email.trim().toLowerCase();
  const hash = md5(normalized);
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}
