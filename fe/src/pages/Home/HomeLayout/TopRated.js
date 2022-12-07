import React, { useState } from 'react'
import _ from 'lodash'
import { history } from '../../../App'
export default function TopRated(props) {

  const { list_Rate } = props;

  const listGenreRated = _.uniqBy(list_Rate, 'genre');
  const [genreRate, setGenreTed] = useState(!listGenreRated ? listGenreRated[0].genre : 'Action')
  // console.log(genreRate)
  // const [flag,setFlag] = useState(0);
  // console.log(flag)
  return (
    <section className="sm:max-w-full container py-32" style={{ backgroundImage: 'url(./ucm_bg_shape.png)', backgroundColor: '#1F1E24' }}>
      <h3 className="text-xs text-yellow-500 text-center">ONLINE STREAMING</h3>
      <h2 className={`text-4xl font-bold text-white text-center introduction__tittle`}>Top Rated Movies</h2>
      <div className="grid grid-cols-1 mt-14">
        <div className="grid justify-items-center">
          <ul className=" flex justify-center items-center text-white flex-wrap">
            {listGenreRated.map((item, index) => {
              return <li onClick={(() => { setGenreTed(item.genre) })} key={index} className="font-bold text-sm mr-5 pb-5 "><button className={` uppercase ${item.genre === genreRate ? 'button_item button_active' : 'button_item'}`}>{item.genre}</button></li>
            })}
          </ul>
        </div>

      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-8 mt-14">
        {_.filter(list_Rate, item => item.genre === genreRate).map((movie, index) => {
          return <div key={index} onClick={()=>{history.push(`detail/${movie.id}`)}}>
            <img src={movie.image} alt="kdnj" className="rounded object-cover object-center w-full h-5/6" />
            <div className="p-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-xl m-0">{movie.name}</h3>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ padding: '1px 10px', border: 'solid 2px #363636', color: '#e4d804' }}>HD</span>
                <div className="flex items-center justify-around">
                  <p className="my-0 mr-3"><i className="fa fa-clock mr-2 text-yellow-400"></i> <span className="text-sm" style={{ color: '#bcbcbc' }}>{movie.time} min</span></p>
                  <p className="my-0"><i className="fa fa-thumbs-up mr-2 text-yellow-400"></i> <span className="text-sm" style={{ color: '#bcbcbc' }}>{movie.rate}</span></p>
                </div>
              </div>
            </div>
          </div>
        })}
      </div>
    </section>
  )
}
