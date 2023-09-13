export function encodeQueryData(data) {
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  console.log('ret.join("&")', ret.join("&"));
  return ret.join("&");
}
