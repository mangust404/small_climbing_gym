
export default function callApiFetch($api_call, post_data) {
  return fetch(process.env.REACT_APP_BACKEND_URL + $api_call, {
    method: post_data? 'POST': 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'node_env': process.env.NODE_ENV
    },
    redirect: 'follow', // manual, *follow, error
    body: JSON.stringify(post_data)
  }).then(res => res.json());
}