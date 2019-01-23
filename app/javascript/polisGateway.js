import axios from "axios"


let polisGateway;

export default polisGateway = (auth_key, environment = 'development') => {

    const url = environment === 'development' ? 'http://localhost:5000/api/v3' : 'https://polis-api-proxy.herokuapp.com/api/v3'

    const getPid = (conversationId) => {
        return restGetParticipation(conversationId).then(response => {
            return Object.keys(response.data).length;
        });
    }

     const createAgid = (conversation_id) => {
      return axios({
            method: 'get',
            url: url + '/comments',
            responseType: 'json',
            params: {
                conversation_id: conversation_id,
                agid: 'getmekey'
            }
        });
    }

    const createConversation = () => {
      return axios({
            method: 'post',
            url: url + '/conversations',
            responseType: 'json',
            data: {
              polisApiKey: auth_key
            }
        });
    }

    const updateConversation = (conversation_id, dataOptions) => {
      var data = { polisApiKey: auth_key } 
      data['conversation_id'] = conversation_id
      data = Object.assign({}, data, dataOptions)
      return axios({
            method: 'put',
            url: url + '/conversations',
            responseType: 'json',
            data: data
        });
    }

    const getConversationZid = (conversation_id) => {
      return axios({
            method: 'get',
            url: url + '/conversations' + `?conversation_id=${conversation_id}`,
            responseType: 'json',
            data: {
              polisApiKey: auth_key
            }
        });
    }

    const createComment = (agid, conversation_id, content) => {
      return axios({
            method: 'post',
            url: url + '/comments',
            responseType: 'json',
            data: {
                polisApiKey: auth_key,
                conversation_id: conversation_id,
                txt: content
            }
        });
    }

    const restGetParticipation = (conversationId) => {
        return axios({
            method: 'get',
            url: url + '/conversations' + conversationId + '/participation',
            data: {
              polisApiKey: auth_key
            },
            responseType: 'json'
        });
    }

    const participationInit = (conversationId) => {
        return axios({
            url: url + '/participationInit',
            method: "get",
            withCredentials: true,
            responseType: 'json', 
            params: {
                conversation_id: conversationId,
            }
        });
    }
    
    const nextConversationComment = (conversationId, pid) => {
        return axios({
            url: url + '/nextComment',
            method: "get",
            withCredentials: true,
            responseType: 'json', 
            params: {
                not_voted_by_pid: 1,
                conversation_id: conversationId,
                pid: pid
            }
        });
    }

    const createVote = (conversationId, pid, tid, agid, vote) =>  {
        return axios({
            url: url + '/votes',
            method: "post",
            responseType: 'json',
            withCredentials: true,
            data: {
                conversation_id: conversationId,
                pid: pid,
                tid: tid,
                agid: agid,
                vote: vote,
            },
        })
    }
   
    const restPostComment = (agid, conversation_id, pid, comment)  => {
        return axios({
            url: url + "/" + conversationId + "/comments",
            method: "post",
            responseType: 'json',
            headers: { "Authorization": auth_key },
            data: {
                "agid": agid,
                "conversation_id": conversationId,
                "pid": pid,
                "txt": comment,
                "is_seed": true,
                "vote": -1
            }
        });
    }

  return {
    auth_key: auth_key,
    url: url,
    getPid: getPid,
    createAgid: createAgid,
    createConversation: createConversation,
    getConversationZid: getConversationZid,
    updateConversation: updateConversation,
    createComment: createComment,
    createVote: createVote,
    restGetParticipation:restGetParticipation,
    participationInit: participationInit,
    nextConversationComment: nextConversationComment
  };
}