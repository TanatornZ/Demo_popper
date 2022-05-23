import React from 'react'

type Props = {
  pass : React.MutableRefObject<null> ,
}

function reference({pass}: Props) {
  return (
    <button className="p-3 bg-orange-200 rounded-lg" ref={pass}>reference</button>
  )
}

export default reference