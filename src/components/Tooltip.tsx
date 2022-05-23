import React from 'react'

type Props = {pass : React.MutableRefObject<null> ,}

function Tooltip({pass}: Props) {
  return (

    <div className='bg-black text-white p-2' ref={pass}>Tooltip</div>

  )
}

export default Tooltip