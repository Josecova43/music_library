
const fetchSearch = async (searchTerm) => {
    const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}`);
    const resData =  await response.json();
    return resdata.results;

}

const wrapPromise = (promise) => {
    let status = 'pending'
}