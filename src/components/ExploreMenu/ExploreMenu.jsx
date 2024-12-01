import React from 'react'
import './ExploreMenu.css'
import {menu_list} from '../../assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array</p>
      <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
            return (
                //回调用来prev 是当前的状态值（category 的值）。
//如果当前状态值（prev）等于 item.menu_name：将 category 设置为 'All'。否则，将 category 更新为 item.menu_name。
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?'All':item.menu_name)} key={index} className='explore-menu-list-item'>
                    <img className={category===item.menu_name?'active':''} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu