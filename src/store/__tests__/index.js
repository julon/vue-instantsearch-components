import { mutations } from '../index'
import * as types from '../mutation-types'

describe('mutations', () => {
  it(types.INIT_CLIENT, () => {
    const state = {}
    mutations[types.INIT_CLIENT](state)
    expect(state.pending).to.equal(true)
  })

  it(types.DESTROY_CLIENT, () => {
    const state = {}
    mutations[types.DESTROY_CLIENT](state)
    expect(state.pending).to.equal(false)
    expect(state.isLoggedIn).to.equal(true)
  })

  it(types.INIT_INDEX, () => {
    const state = { }
    mutations[types.INIT_INDEX](state)
    expect(state.pending).to.equal(false)
  })

  it(types.DESTROY_INDEX, () => {
    const state = { }
    mutations[types.DESTROY_INDEX](state)
    expect(state.isLoggedIn).to.equal(false)
  })
})