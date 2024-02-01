import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'

const Home = () => {
  const [ data, setData ] = useState();

  useEffect( ()=> {
    fetch('https://api.tvmaze.com/search/shows?q=all')
    .then(res => res.json())
    .then(data => setData(data))
  }, []);

  
  if (!data) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  return (
    <div className='my-20 w-4/5 mx-auto'>
      <h1 className='font-bold text-3xl'>Featured Shows</h1>
      <div className='mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2'>
        {
          data.map(show => <div className="card w-72 bg-base-200 shadow-xl" key={show.show.id}>
          <figure><img src={show.show.image?.medium} alt={show.show.name} className='h-60' /></figure>
          <div className="card-body">
            <h2 className="card-title">{show.show.name}</h2>
            <h1 className='flex gap-2'>
            <span className='font-semibold'>Genres:</span> {show.show.genres.map(type => <span key={type}>{type}</span>)}
            </h1>
            <h1><span className='font-semibold'>Premiered date:</span> {show.show.premiered}</h1>
            <p><span className='font-semibold'>IMDB:</span> {show.show.rating.average}</p>
            <div className="card-actions justify-end">
              <Link to={`/summary/${show.score}`}>
              <button className="btn btn-primary">Summary</button>
              </Link>
            </div>
          </div>
        </div>)
        }
      </div>
    </div>
  )
}

export default Home;
