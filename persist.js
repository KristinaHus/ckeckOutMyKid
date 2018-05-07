/* globals localStorage */
import { onSnapshot, applySnapshot } from 'mobx-state-tree';

export const persist = (name, store, options, schema = {}) => {
  let hydrated = false;

  let storage = options.storage;

  onSnapshot(store, (_snapshot) => {
    if (!hydrated) {
      return;
    }
    const snapshot = { ..._snapshot };
    Object.keys(snapshot).forEach((key) => {
      if (!schema[key]) {
        delete snapshot[key];
      }
    });
    const data = !options.jsonify ? snapshot : JSON.stringify(snapshot);
    storage.setItem(name, data);
  });

  storage.getItem(name)
    .then((data) => {
      if (data) {
        const snapshot = !options.jsonify ? data : JSON.parse(data);
        applySnapshot(store, snapshot);
        if (store.afterHydration && typeof store.afterHydration === 'function') {
          store.afterHydration();
        }
        hydrated = true;
      }
    });
};