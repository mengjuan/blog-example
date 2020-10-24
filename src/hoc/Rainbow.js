import React from 'react'

const Rainbow = (WrappedComponent) => {
   const colors = ['red','pink','blue','green','yellow'];
   const color = colors[Math.floor(Math.random()*5)];
   const colorName = color + '-text';
   console.log("the colorName "+colorName);

   return (props) => (
    <div className={colorName}>
        <WrappedComponent {...props} />
    </div>
   )

}

export default Rainbow