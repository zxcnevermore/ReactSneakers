import React from 'react'
import Card from '../components/Card'
import axios from 'axios'


function Orders() {

  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get('https://62f666fe612c13062b4db2e5.mockapi.io/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
      })()
      setIsLoading(false)
    } catch (error) {
      alert("Ошибка")
      console.log(error)
    }
  },[])


  return (
    
    <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between"> 
          <h1>Мои заказы</h1>
        </div>

          <div className="d-flex flex-wrap">
          {(isLoading ? [...Array(10)] : orders).map((item, itemid) => (
            <Card
            key={itemid}
            loading={false}
            {...item}
            />
            ))}
          </div>


    </div>
  )
}

export default Orders;