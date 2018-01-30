import Vue from "vue";
import Vuex from "vuex";
import AlgoliaSearch from "algoliasearch";
import * as types from "@/store/mutation-types";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

// avoid mutations detection
const _clients = {};
const _indexes = {};

export default new Vuex.Store({
  state: {
    clients: {},
    indexes: {}
  },
  getters: {
    index: () => id => _indexes[id],
    response: state => id => state.indexes[id] && state.indexes[id].response
  },
  actions: {
    initClient({ commit }, { appId, apiKey, options }) {
      return new Promise((resolve, reject) => {
        _clients[appId] = AlgoliaSearch(appId, apiKey, options);
        commit(types.INIT_CLIENT, { appId, apiKey, options });
        resolve(appId);
      })
    },
    destroyClient({ commit, dispatch, state }, { appId }) {
      // close client gently
      _clients[appId].destroy();
      // remove client from clients array
      delete _clients[appId];
      // remove state related properties
      commit(types.DESTROY_CLIENT, { appId });
    },
    initIndex({ commit }, { appId, indexId }) {
      _indexes[indexId] = _clients[appId].initIndex(indexId);
      commit(types.INIT_INDEX, { appId, indexId });
    },
    destroyIndex({ commit }, { appId, indexId }) {
      // remove index from indexes array
      delete _indexes[indexId];
      // remove state related properties
      commit(types.DESTROY_INDEX, { appId, indexId });
    },
    search({ getters, commit }, { indexId, text }) {
      const index = _indexes[indexId];
      if (index) {
        index
          .search(text)
          .then(content => {
            commit(types.SAVE_SEARCH_RESULT_SUCCESS, { id: indexId, content })
          })
      } else {
        throw new Error("Index is not init yet");
      }
    }
  },
  mutations: {
    [types.INIT_CLIENT](state, { appId, apiKey, options }) {
      // using spread to create reactive properties
      state.clients = {
        ...state.clients,
        [appId]: { appId, apiKey, options, indexes: [] }
      };
    },
    [types.DESTROY_CLIENT](state, { appId }) {
      delete state.clients[appId];
    },
    [types.INIT_INDEX](state, { appId, indexId }) {
      state.clients[appId].indexes.push(indexId)
      state.indexes[indexId] = {
        response: null
      }
    },
    [types.DESTROY_INDEX](state, { appId, indexId }) {
      const indexes = state.clients[appId].indexes;
      indexes.splice(indexes.indexOf(indexId), 1);
      delete state.indexes[indexId]
    },
    [types.SAVE_SEARCH_RESULT](state, { id }) {},
    [types.SAVE_SEARCH_RESULT_SUCCESS](state, { id, content }) {
      state.indexes[id].response = content;
    }
  },
  strict: debug
});
