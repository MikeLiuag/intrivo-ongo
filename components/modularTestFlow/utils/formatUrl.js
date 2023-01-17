const formatUrl = ({ url, modularState }) => {
  let cleanUrl = url.replace('/api/v2', '').replace('.json', '');
  if (cleanUrl.includes(':flow_id')) {
    const { flowUuid } = modularState;
    cleanUrl = cleanUrl.replace(':flow_id', `${flowUuid}`);
  }
  return cleanUrl;
};

export default formatUrl;
