import React, { useEffect, useState } from 'react'

const Total = ({getKubikasi, getSetting, getKeterangan, getKrat}) => {
    const [setting, setSetting] = useState<number>(null)
    const [nonSetting, setNonSetting] = useState<number>(null)
    const [keterangan, setKeterangan] = useState<string>("")

    useEffect(() => {
      getSetting(setting,nonSetting)
      getKeterangan(keterangan)
    },[setting,nonSetting,keterangan])
    
  return (
    <div className='flex flex-col p-5'>
      <label className="mb-1">Total Kubikasi</label>
        <input type="number" className="border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-2" placeholder='Total m3' disabled value={getKubikasi()}/>
      <label className="mb-1">Total Krat</label>
        <input type="number" className="border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-2" placeholder='Total m3' disabled value={getKrat()}/>
      <label className="mb-1">Setting</label>
        <input type="number" className="border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-2" placeholder='Tulis Angka Setting' value={setting} onChange={(e) => setSetting(parseInt(e.target.value))}/>
      <label className="mb-1">Non Setting</label>
        <input type="number" className="border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-2" placeholder='Tulis Angka non Setting' value={nonSetting} onChange={(e) => setNonSetting(parseInt(e.target.value))}/>
      <label className="mb-1">Keterangan</label>
        <textarea className="h-48 border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-2" name="keterangan" placeholder='keterangan' value={keterangan} onChange={(e) => setKeterangan(e.target.value)}></textarea>
    </div>
  )
}

export default Total