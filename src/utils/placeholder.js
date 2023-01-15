export const getPlaceholderAvatar = (type='avataaars') => {
  const url = new URL(`https://avatars.dicebear.com/api/${type}/0.svg`);
  url.searchParams.set('style', 'circle');
  url.searchParams.set('background', '#aaaaaa');
  url.searchParams.set('topChance', 0);
  url.searchParams.set('accessoriesChance', 0);
  url.searchParams.set('facialHairChance', 0);
  url.searchParams.set('eyes', 'closed');
  url.searchParams.set('eyebrow', 'default');
  url.searchParams.set('mouth', 'default');
  url.searchParams.set('clothes', 'shirtScoopNeck');
  url.searchParams.set('clothesColor', 'gray01');
  return url.toString();
};
