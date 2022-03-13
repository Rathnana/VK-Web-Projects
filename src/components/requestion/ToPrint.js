import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'antd';
import { AiFillEye } from "react-icons/ai";
import axios from 'axios'

import PrintContent from './PrintContent'

export default function ToPrint({
    r_id,
    info
}) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Button onClick={() => setOpen(true)} type="primary" shape="circle" icon={<AiFillEye className='printIcon' style={{ marginTop: '5px' }} />} size='middle' />
            <PrintContent info={info} r_id={r_id} open={open} setOpen={setOpen} />
        </div>

    )
}
