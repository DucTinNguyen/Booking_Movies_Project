import React from 'react'
import Header from '../../components/Header/Header'
import './Blog.css'
import '../Contact/contact.css'
import Footer from '../../components/Footer/Footer'



const introduceStyle = {
  height: "600px",
  backgroundRepeat: "no-repeat",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}
export default function Blog() {
  return (
    <div>
      {/* Header */}
      <Header />
      {/* Introduction */}
      <section className="flex items-center justify center relative" style={{ ...introduceStyle, backgroundImage: 'url(/image/breadcrumb_bg.jpg)' }}>
        <div className="absolute w-full h-full" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
        <h3 className="w-full text-white text-center -translate-y-2/4 text-6xl font-bold">Blog</h3>
      </section>
      {/* Content */}
      <div className={`content grid grid-cols-12 gap-7 container sm:max-w-full`}>
        <div className={`col-span-9 md:col-span-7 sm:col-span-12 content__left`}>
          <div className=" w-full p-4 shadow-md" style={{ backgroundColor: '#1F1E24' }}>
              <img src="/image/blog_thumb05.jpg" alt='lks' className="block object-cover object-center w-full rounded-md" />

              <div className={`content_body cursor-pointer`}>
                <span className="font-semibold">  <i className="fa fa-clock text-yellow-500 mr-3"></i> August 8,2022  </span>
                <h3 className="transition ease-in-out duration-300 text-2xl font-semibold text-white hover:text-yellow-500">Facere ipsa nulla corrupti praesentium pariatur architecto</h3>
                <p className="leading-snug text-sm font-medium">Lorem Ipsum is simply dummy text of the printing and typetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuies, but also the leap into […]</p>
              </div>
              <div className={`content__footer flex items-center justify-between text-sm`}>
                <div>
                  <ul className='flex items-center justify-around'>
                    <li className='text-base font-semibold px-2 sm:text-sm'>
                      <i className="text-yellow-500 fa fa-bookmark mr-5"></i>
                      <span>Actions Movie, Download</span>
                    </li>
                    <li className="text-base font-semibold px-2 sm:text-sm">
                      <i className="text-yellow-500 fa fa-comments mr-5"></i>
                      <span>3 comments</span>
                    </li>
                  </ul>
                </div>
                <p className='text-right text-yellow-500 font-semibold cursor-pointer'>Read More <i className="fa fa-angle-double-right"></i></p>
              </div>
          </div>
        </div>
        <div className={`col-span-3 md:col-span-5 sm:col-span-12 content__right`}>
          <div className={`blog__global`}>
              <h3 className={`text_heading`}>Search Objects</h3>
              <form>
                <input type="text" name="search" placeholder="Search by categories or tags"/>
                <button><i className="fa fa-search"></i></button>
              </form>
          </div>
          <div className={`blog__global`}>
              <h3 className={`text_heading`}>Categories</h3>
              <ul>
                <li className={`categories__item py-4 hover:text-yellow-400`}>Action Movies</li>
                <li className={`categories__item py-4 hover:text-yellow-400`}>Download</li>
                <li className={`categories__item py-4 hover:text-yellow-400`}>Horror</li>
                <li className={`categories__item py-4 hover:text-yellow-400`}>Movies</li>
                <li className={`categories__item py-4 hover:text-yellow-400`}>Streaming</li>
              </ul>
          </div>
          <div className={`blog__global`}>
              <h3 className={`text_heading`}>Tags Cloud</h3>
              <ul className={`tags__list`}>
                <li className={`tag__item`}>Blending</li>
                <li className={`tag__item`}>Creative</li>
                <li className={`tag__item`}>English</li>
                <li className={`tag__item`}>Movies</li>
                <li className={`tag__item`}>News</li>
                <li className={`tag__item`}>Online</li>

              </ul>
          </div>
        </div>

      </div>
      {/* Footer */}
      <Footer />
    </div>
  )
}
