function Pokemon({name,image}){
 return(
  <div className="h-[30%] w-[200px] flex flex-col items-center">
    <div>{name}</div>
    <div className=""><img src={image} className="h-[7rem] w-[10rem]"/></div>
  </div>
 )
}
export default Pokemon;