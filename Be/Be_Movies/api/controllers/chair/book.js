/**
 * Module dependencies
 */

// ...


/**
 * chair/book.js
 *
 * Book chair.
 */
module.exports = async function book(req, res) {

  let idlistChairBook = req.body;
  console.log(idlistChairBook);


  

  for(let item in idlistChairBook){
    let listChair;
     listChair = await Chairs.update({id:idlistChairBook[item].id})
     .set({status:true})
  }

  // for(let i in listChair) {
  //   listChair[i] = {...listChair[i],status:true}
  // }
  return res.ok();

};
