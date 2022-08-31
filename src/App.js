import Header from './components/Header';
import axios from 'axios';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Orders from './pages/Orders';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Favorites from './pages/Favorites';
import AppContext from './context';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [getCart, getItems, getFavorites] = await Promise.all([
          axios.get('https://62f666fe612c13062b4db2e5.mockapi.io/cart'),
          axios.get('https://62f666fe612c13062b4db2e5.mockapi.io/items'),
          axios.get('https://62f666fe612c13062b4db2e5.mockapi.io/favorites'),
        ]);
        setIsLoading(false);
        setCartItems(getCart.data);
        setFavorites(getFavorites.data);
        setItems(getItems.data);
      } catch (error) {
        alert('Ошибка получения данных');
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    const findItem = cartItems.find((item) => Number(item.itemid) === Number(obj.id));
    try {
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.itemid) !== Number(obj.id)));
        await axios.delete(`https://62f666fe612c13062b4db2e5.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(`https://62f666fe612c13062b4db2e5.mockapi.io/cart`, obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.itemid === data.itemid) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Не удалось добавить в корзину');
      console.error(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
      axios.delete(`https://62f666fe612c13062b4db2e5.mockapi.io/cart/${id}`);
    } catch (error) {
      alert('Не удалось удалить товар');
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const onFavorite = async (obj) => {
    const findfavorites = favorites.find((item) => Number(item.itemid) === Number(obj.id));
    try {
      if (findfavorites) {
        setFavorites((prev) => prev.filter((item) => Number(item.itemid) !== Number(obj.id)));
        await axios.delete(
          `https://62f666fe612c13062b4db2e5.mockapi.io/favorites/${findfavorites.id}`,
        );
      } else {
        setFavorites((prev) => [...prev, obj]);
        const { data } = await axios.post(
          `https://62f666fe612c13062b4db2e5.mockapi.io/favorites`,
          obj,
        );
        setFavorites((prev) =>
          prev.map((item) => {
            if (item.itemid === data.itemid) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Не удалось добавить в корзину');
      console.error(error);
    }
  };

  const hasCartItems = (itemid) => {
    return cartItems.some((obj) => Number(obj.itemid) === Number(itemid));
  };

  const hasFavoritesItems = (itemid) => {
    return favorites.some((obj) => Number(obj.itemid) === Number(itemid));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        hasCartItems,
        hasFavoritesItems,
        setCartOpened,
        setCartItems,
      }}>
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onRemove={deleteItem}
          onClose={() => setCartOpened(false)}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                favorites={favorites}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                onChangeSearchInput={onChangeSearchInput}
                onFavorite={onFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }></Route>
        </Routes>
        <Routes>
          <Route
            path="/favorites"
            element={
              <Favorites items={favorites} onAddToCart={onAddToCart} onFavorite={onFavorite} />
            }></Route>
        </Routes>
        <Routes>
          <Route path="/orders" element={<Orders />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
export default App;
