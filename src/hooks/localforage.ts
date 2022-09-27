import * as localforage from 'localforage';

localforage.config({
  driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
});

export const useLocalforage = (
  options: LocalForageDbInstanceOptions = { name: 'db', storeName: 'table' },
) => {
  localforage.getItem('');
  return localforage.createInstance(
    Object.assign(
      {
        driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
      },
      options,
    ),
  );
};
