export const getData = async (path) => {
  return await fetch(path)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};
