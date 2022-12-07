import React from 'react'
import _ from 'lodash'


import './Footer.css'
const styleItems = {
    fontSize: '16px',
    color:'#bcbcbc',
    marginBottom: '10px',
    
}

export default function Footer(props) {
    const {movies} = props;
    //filter number each movie
    const actionNumber = _.filter(movies, item =>item.genre === 'Action').length;
    const moviesNumber = _.filter(movies, item => item.genre === 'Movies' || item.genre === 'movies').length;
    const comedyNumber = _.filter(movies, item => item.genre === 'Comedy').length;
    const horrorNumber = _.filter(movies, item => item.genre === 'Horror'|| item.genre === 'horror').length;
    return (
        <div style={{backgroundImage: 'url(/image/footer_bg.jpg)'}}>
            <footer className="divide-y">
                <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
                    <div className="lg:w-1/3">
                        <img className="w-1/2" src="/image/logo.png" alt="logo"/>
                    </div>
                    <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-3">
                        <div>
                            <h3 className="tracking-wide  text-white font-bold text-2xl">Information</h3>
                            <ul className="space-y-1">
                                <li style={styleItems}>
                                    <i className="mr-3 fa fa-map-marker-alt"></i>
                                    <span>Address : PO Box W75 Street</span>
                                </li>
                                <li style={styleItems}>
                                    <i className="mr-3 fa fa-headphones"></i>
                                    <span>Phone : +24 1245 654 235</span>
                                </li>
                                <li style={styleItems}>
                                    <i className="mr-3 fa fa-envelope-open"></i>
                                    <span>Email : info@exemple.com</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="tracking-wide  text-white font-bold text-2xl">Categories</h3>
                            <ul className=" text-white font-semibold">
                                <li className="my-3">
                                   <span>Action({actionNumber})</span> 
                                </li>
                                <li className="my-3">
                                    <span>Horror({horrorNumber})</span>    
                                </li>
                                <li className="my-3"> <span>Movies({moviesNumber})</span></li>
                                <li className="my-3"><span>Comdey({comedyNumber})</span></li>
                            </ul>
                        </div>
                        <div>
                            <div className=" text-white font-bold text-2xl tracking-wide">Follow Us</div>
                            <div className="flex justify-start mt-3">
                                <span className={`social facebook`}><i className="fab fa-facebook-f"></i></span>
                                <span className={`social twitter`}><i className="fab fa-twitter"></i></span>
                                <span className={`social linkedIn`}><i className="fab fa-linkedin-in"></i></span>
                                <span className={`social pinterest`}><i className="fab fa-pinterest-p"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-6 text-sm text-center text-white">© 1968 Company Co. All rights reserved.</div>
            </footer>
        </div>
    )
}
