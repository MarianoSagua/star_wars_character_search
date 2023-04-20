import { Button, Paper } from '@mui/material';
import React, { useState } from 'react'

const ItemCharacter = ({ item }) => {
    const { name, height, gender, hair_color, skin_color } = item;
    const [flag, setFlag] = useState(false);

  return (
    <Paper elevation={3} className='itemCharacter'>
        <h3>{name}</h3>
        <Button 
            sx={{display: "grid", placeContent: "start", padding: "10px 0"}} 
            onClick={() => setFlag(!flag)} 
            size='small' 
            variant="text"
        >
            View Details
        </Button>

        {flag ?
            <>
                <div>
                    <p>Height: {height}</p>
                    <p>Gender: {gender}</p>
                    <p>Hair Color: {hair_color}</p>
                    <p>Skin Color: {skin_color}</p>
                </div>
            </>
            :
            <>
                
            </>
        }
    </Paper>
  )
}

export default ItemCharacter