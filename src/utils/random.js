import randomColor from 'randomcolor';
import seedrandom from 'seedrandom';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { faker } from '@faker-js/faker/locale/en';

export const getRandomString = (length = 7) => {
  return Math.random().toString(36).substring(length);
};

export const getRandomNumber = (min = 0, max = Number.MAX_SAFE_INTEGER) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getSeededRandomNumber = (seed) => {
  return seedrandom(seed)();
};

export const getSeededRandomInteger = (seed) => {
  return Math.round(getSeededRandomNumber(seed) * Number.MAX_SAFE_INTEGER);
};

export const getRandomColor = (options) => {
  return randomColor(options);
};

// https://avatars.dicebear.com/styles/adventurer
export const getRandomClientAvatar = (seed, type = 'avataaars') => {
  const url = new URL(`https://avatars.dicebear.com/api/${type}/${seed}.svg`);
  url.searchParams.set('style', 'circle');
  url.searchParams.set('background', getRandomColor({ seed, luminosity: 'bright' }));
  return url.toString();
};

export const getRandomClientName = (seed, dictionaries = [ adjectives, colors, animals ]) => {
  const numericSeed = getSeededRandomInteger(seed);
  return uniqueNamesGenerator({ dictionaries, style: 'capital', separator: ' ', seed: numericSeed });
};

export const getRandomCatchPhrase = (seed) => reset(seed, () => faker.hacker.phrase());
export const getRandomJobTitle = (seed) => reset(seed, () => faker.name.jobTitle());
export const getRandomBirthdate = (seed) => reset(seed, () => faker.date.birthdate({ min: 18, mode: 'age' }));

const reset = (seed, fn) => {
  faker.seed(getSeededRandomInteger(seed));
  return fn();
};
