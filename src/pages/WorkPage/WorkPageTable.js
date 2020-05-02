import React from 'react'

export default function WorkPageTable({language, content}) {

  return (
    <table className="work__left-table" data-test={language} >
      <tbody>
        {
          content.map(({title, info}) => {
            return <tr>
                     <td>{title}</td>
                     <td>{info}</td>
                   </tr>
          })
        }
      </tbody>
    </table>
  )
}
