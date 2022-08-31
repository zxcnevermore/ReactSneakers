import Card from '../components/Card';
import React from 'react'

function Home({items, searchInput, setSearchInput, onChangeSearchInput, onFavorite, onAddToCart, isLoading}) {

    const renderItems = () => {

    const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchInput.toLowerCase()));

    return (isLoading ? [...Array(10)] : filteredItems).map((item, itemid) => (
      isLoading ? <Card  key={itemid} loading={isLoading}/> :
      <Card
      key={itemid}
      onFavorite={(obj) => onFavorite(obj)}
      onAddToCart={(obj) => onAddToCart(obj)}
      {...item}
      />
      )); 

    };
    


  return (
    <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>{searchInput ? `Поиск по запрросу: "${searchInput}"` : 'Все кроссовки'}</h1>
          <div className="search-block d-flex">
            <img src="img/search.svg" alt="Search"></img>
            {searchInput && (
              <img
                onClick={() => setSearchInput('')}
                className="cu-p clear"
                src="img/btn-remove.svg"
                alt="Clear"></img>
            )}
            <input
              onChange={onChangeSearchInput}
              value={searchInput}
              placeholder="Поиск..."></input>
          </div>
        </div>
        <div className="d-flex flex-wrap">
            {
              renderItems()
            }
        </div>
      </div>
  )
}

export default Home;