import React from 'react'
import { useNavigate } from 'react-router-dom';

function Error() {

  const navigate = useNavigate()

  function replaceLocation(){
    window.alert("Hold on! Direct access to this page isn't supported.");
    navigate(-1)
  }
  React.useEffect(() => {
    replaceLocation()
  },[])

  return (
    <div>page not found</div>
  )
}

export default Error