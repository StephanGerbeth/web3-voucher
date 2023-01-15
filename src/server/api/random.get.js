import {
  getRandomClientAvatar,
  getRandomClientName,
  getRandomColor,
  getRandomCatchPhrase,
  getRandomJobTitle,
  getRandomBirthdate,
} from '@/utils/random';

export default defineEventHandler((event) => {
  const { seed } = getQuery(event);
  return {
    image: getRandomClientAvatar(seed),
    name: getRandomClientName(seed),
    color: getRandomColor({ seed, luminosity: 'dark' }),
    jobTitle: getRandomJobTitle(seed),
    birthdate: getRandomBirthdate(seed),
    catchPhrase: getRandomCatchPhrase(seed)
  };
});
