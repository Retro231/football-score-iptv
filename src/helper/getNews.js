export const getNews = async id => {
  const apiEndPoint = `https://codebothub.com/company`;
  try {
    const response = await fetch(`${apiEndPoint}/news/newsfeed`);

    if (!response.ok) {
      throw new Error('Network request failed');
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching dummy JSON:', error.message);
  }
};
