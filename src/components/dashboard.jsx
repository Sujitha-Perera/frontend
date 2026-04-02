import React from 'react'
import Data from './data.json'
import  { useState } from 'react';

function dashboard() {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    
    <div>
    <div>
      item selector
    </div>
    <duv>
      <Select
      defaultValue={selectedOption}
      onChange={setSelectedOption}
      options={Data}
      isMulti={false} // Set true to allow multiple selections
    />
    </duv>
      aaa
        {/* {Data.map(data =>{
              return(
                <div className='box'>
                  {data.itemName}
                  aaaa
                </div>
              )
            })} */}
      
    </div>
  );
}

export default dashboard
