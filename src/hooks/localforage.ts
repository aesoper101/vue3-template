import * as localforage from 'localforage';

localforage.config({
  driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
  name: 'db',
  storeName: 'table',
});

export const useLocalforage = (
  options: LocalForageDbInstanceOptions = { name: 'db', storeName: 'table' },
) => {
  return localforage.createInstance(
    Object.assign(
      {
        driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
      },
      options,
    ),
  );
};
