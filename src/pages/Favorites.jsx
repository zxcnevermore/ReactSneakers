import React from 'react'
import Card from '../components/Card'
import { Link } from 'react-router-dom';
import AppContext from '../context'

function Favorites({ onFavorite, onAddToCart}) {

  const {favorites} = React.useContext(AppContext);  

  return (
    
    <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between"> 
          <h1>Мои закладки</h1>
        </div>

        {favorites.length > 0 ? ( <div className="d-flex flex-wrap">
          {favorites.map((item, itemid) => (
              <Card
                key={itemid}
                onAddToCart={onAddToCart}
                onFavorite={onFavorite}
                {...item}           
              />
            ))}
        </div>) :    
        <div className="favoritesEmpty d-flex align-center justify-center flex-column pt-50">
            <h2>Нет закладок</h2>
            <p className="opacity-6">Поставьте лайк паре кроссовок чтобы добавить в закладки.</p>
            <Link to="/">
              <button className="greenButton">
                Вернуться назад<img className="Arrow" src="/img/arrow.svg" alt="Arrow"></img>
              </button>
            </Link>
        </div>}

    </div>
  )
}

export default Favorites;