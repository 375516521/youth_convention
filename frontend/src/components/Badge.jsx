import { QRCodeCanvas } from "qrcode.react";

export default function Badge({ youth }){

return(

<div style={{
width:"300px",
border:"2px solid black",
padding:"15px",
textAlign:"center"
}}>

<h3>Youth Convention</h3>

<h2>{youth.fullName}</h2>

<p>{youth.congregation}</p>

<QRCodeCanvas value={youth._id} size={100}/>

</div>

)

}