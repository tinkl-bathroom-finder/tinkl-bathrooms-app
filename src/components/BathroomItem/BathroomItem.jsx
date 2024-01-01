import { useHistory } from 'react-router-dom';

function BathroomItem({ bathroom }) {

  const history = useHistory()
  const goToDetails = () => {
    history.push(`/bathrooms/${bathroom.id}`)
  }


  return (
    <li>
      <button onClick={goToDetails}>🤔</button>
      {bathroom.name} {bathroom.street} {bathroom.city}
      {bathroom.street}
    </li>
  )
}


export default BathroomItem
