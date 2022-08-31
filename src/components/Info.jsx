import React from 'react'
import AppContext from '../context'

 function Info ({title, desc, imageUrl}) {

  const {setCartOpened} = React.useContext(AppContext);
  
  return (
    <div>
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img
              className="CartImg mb-20"
              width="120px"
              height="120px"
              src={imageUrl}
              alt="Empty"></img>
            <h2>{title}</h2>
            <p className="opacity-6">{desc}</p>
            <button onClick={() => setCartOpened(false)} className="greenButton">
              Вернуться назад<img className="Arrow" src="/img/arrow.svg" alt="Arrow"></img>
            </button>
          </div>
    </div>
  )
}

export default Info;