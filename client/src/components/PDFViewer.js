import React from 'react'
import Menu from './menu.pdf'

const PDFViewer = () => {
  return (
    <div className='w-full h-full'>
        <iframe src={Menu} className='w-full h-full' title='PDF Viewer' />
    </div>
  )
}

export default PDFViewer