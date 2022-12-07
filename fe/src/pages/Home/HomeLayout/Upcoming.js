import React, { useState } from 'react'
import _ from 'lodash'
import { history } from '../../../App'
const itemlistStyle = {
  padding: '9px 27px',
  border: 'solid 1px #fff',
  borderRadius: '50px',
  cursor: 'pointer'
}
const itemActive = {
  border: 'solid 1px #e4d804',
  padding: '9px 27px',
  borderRadius: '50px',
  cursor: 'pointer'
}
export default function Upcoming(props) {
  let {list_Upcoming} = props;
  const list_genre = _.uniqBy(list_Upcoming,'genre')
  const [genre,setGenre] = useState(!list_genre ? list_genre[0].genre : 'Action');
  return (
    <div>
      <section className="container max-w-full py-32 sm:max-w-full" style={{ backgroundImage: 'url(./ucm_bg_shape.png)', backgroundColor: '#16161E'}}>
        <h3 className={`text-xs text-yellow-500 sm:text-center lg:text-left text__title`}>ONLINE STREAMING</h3>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1">
          <h2 className={`col-span-1 text-4xl font-bold text-white sm:text-center lg:text-left text__heading`}>Upcoming Movies</h2>
          <div className={`col-span-1 grid lg:justify-items-end sm:justify-items-center wrap__list`}>
            <ul className="flex text-white text-sm items-center" >
                {list_genre.map((item,index) =>{
                  return <li key={index} className="mr-4" onClick={()=>{setGenre(item.genre)}} style={item.genre === genre ? itemActive : itemlistStyle}>{item.genre}</li>
                })}
            </ul>

          </div>
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-14">
          
          {
            _.filter(list_Upcoming, item => item.genre === genre).map((movie, index) => {
              return <div key={index}
               onClick={()=>{history.push(`/detail/${movie.id}`)}} style={{cursor:'pointer'}} >
                <img src={movie.image} alt="kdnj" className="rounded object-cover object-center w-full" />
                <div className="p-3">
                    <h3 className="font-bold text-white text-xl text-center">{movie.name}</h3>
                  <div className="flex items-center justify-between">
                    <span style={{ padding: '1px 10px', border: 'solid 2px #363636', color: '#e4d804' }}>HD</span>
                    <div className="flex items-center justify-around">
                      <p className="my-0 mr-3"><i className="fa fa-clock mr-2 text-yellow-400"></i> <span className="text-sm" style={{ color: '#bcbcbc' }}>{movie.time} min</span></p>
                      <p className="my-0"><i className="fa fa-thumbs-up mr-2 text-yellow-400"></i> <span className="text-sm" style={{ color: '#bcbcbc' }}>{movie.rate}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            })
          }
        </div>
      </section>
    </div>

  )
}
