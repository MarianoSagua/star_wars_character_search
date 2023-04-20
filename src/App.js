import { Button, CircularProgress, Container, TextField } from '@mui/material';
import './App.scss';
import { useEffect, useMemo, useState } from 'react';
import { GetData } from './API/GetData';
import ItemCharacter from './components/ItemCharacter';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(null);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const filteredCharacters = useMemo(()=>
    characters.filter((c) => {
      return c.name.toLowerCase().includes(searchValue.toLowerCase());
    }), [characters, searchValue]
  ); 

  const getCharacters = async ()=>{
    try {
      setLoading(true);
      let data;
      const response = await GetData();

      if(searchValue === ""){
        const startIndex = (page - 1) * 2;
        const endIndex = startIndex + 2;
        data = response.results.slice(startIndex, endIndex);
      }else{
        data = response.results;
      }

      setCharacters(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getCharacters();
  }, [page, searchValue]);

  return (
    <div className='starWars'>
      <Container maxWidth="md" className='starWars__container'>
        <section className='starWars__container--partOne'>
          <h2>Search Star Wars Character</h2>
          <TextField 
            onChange={(e) => setSearchValue(e.target.value)} 
            id="outlined-basic" 
            label="Search Character" 
            variant="outlined" 
          />
        </section>

        <section className='starWars__container--partTwo'>
          {loading ? 
            <div className='starWars__container--partTwo--loader'>
              <CircularProgress color="inherit" />
            </div>
            : 
            <>
              {filteredCharacters && filteredCharacters.map((item, idx)=>{
                return(
                  <ItemCharacter item={item} key={idx}/>
                )
              })}
            </>
          }
        </section>

        <section className='starWars__container--pagination'>
          <Button onClick={() => setPage(page - 1)} disabled={page === 1} variant="outlined">Anterior</Button>
          <p>{page} - 5</p>
          <Button onClick={() => setPage(page + 1)} disabled={page === 5} variant="outlined">Siguiente</Button>
        </section>
      </Container>
    </div>
  );
}

export default App;
