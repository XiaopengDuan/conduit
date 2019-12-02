const navIndex = {
    namespaced: true,
    state: {
        callAnalysisindex: 0,
        callAnalysisdatalist: [],
        record: 0,
    },
    mutations: {
        CALLANALYSISINDEX: (state, index) => {
            state.callAnalysisindex = index
        },
        CALLANALYSISDATALIST: (state, index) => {
            state.callAnalysisdatalist = index
        },
        RECORD: (state) => {
            state.record = state.record + 1
        },
        RECORDINIT: (state) => {
            state.record = 0
        }
    },
    actions: {
        RECORDS({ commit }){
            commit('RECORD')
        },
        RECORDINITS({ commit }){
            commit('RECORDINIT')
        }
    }
}
export default navIndex