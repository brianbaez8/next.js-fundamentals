import React from 'react'

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div>
      <h1>Marketing Layout</h1>
      {children}
    </div>
  )
}

export default Layout
