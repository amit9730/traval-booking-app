import React from 'react'
import { useLocation } from 'react-router-dom'


export default function Checkout(){
const { state } = useLocation()
const dest = state?.destination
if(!dest) return <div>No destination selected.</div>


return (
<div className="max-w-xl mx-auto">
<h1 className="text-2xl font-semibold">Checkout</h1>
<div className="mt-4 border rounded p-4">
<p className="font-medium">{dest.title}</p>
<p className="text-gray-600">Price: ₹{dest.pricePerPerson}</p>
<p className="mt-4">(Stripe/Razorpay integration goes here)</p>
<button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded">Pay (demo)</button>
</div>
</div>
)
}