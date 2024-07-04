import React from 'react';
import './Loader.css'

const Loader = () => {
  return (
    <div className='loadbody' style={{zIndex:"1000", height:"100vh",width:"100vw",backgroundColor:"",display:"flex",alignItems:"center",justifyContent:"center",position:"fixed",top:"0",left:"0"
    }}>
      <div class="loader"></div>
    </div>
  );
};

export default Loader;
