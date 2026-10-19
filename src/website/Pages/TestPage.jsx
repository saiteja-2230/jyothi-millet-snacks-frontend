import axios from "axios";
import { useEffect, useState } from "react";

function TestPage() {
    const[jms,setjms] = useState([])

    useEffect(()=>{
        axios.get("https://api.jyothimilletsnacks.in/api/v1/check").then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    })

    return ( 
        <div>
            <h1>Test Page</h1>
        </div>
     );
}

export default TestPage;