import { useState, useRef, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import { DataContext } from './components/contexts/DataContext';
import { SearchContext } from './components/contexts/SearchContext';
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView';


import './App.css';

function App() {
  let [message, setMessage] = useState('Search for music!!')
  let [data, setData] = useState([]);
  let searchInput = useRef('')



  const handleSearch = async searchTerm => {
    if (!searchTerm) return
    
    document.title = `${searchTerm} Music`
    const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}`);
    const resData =  await response.json();
    if (resData.results.length) {
      setData(resData.results)
    } else {
      
      setMessage('Nothing Found for that Artist')
    }
    console.log(resData)
  }


  return (

    <div className="App">
      {message}
      <Router>
        <Routes>
          <Route path='/' element={
            <Fragment>
              <SearchContext.Provider value={
                {
                  term: searchInput,
                  handleSearch 
                }
              }>

                <SearchBar> handleSearch={handleSearch}</SearchBar>






              </SearchContext.Provider>
             

              <DataContext.Provider value={data}>




                <Gallery />
              </DataContext.Provider>


            </Fragment>
          } />

          <Route path='/album/:id' element={<AlbumView />} />
          <Route path='/artist/:id' element={<ArtistView />} />

        </Routes>
      </Router>


    </div>
  );
        }

export default App;
