import React from "react";

export function Quote(){
    return (<div>
        <div className="bg-slate-200 h-screen flex justify-center flex-col">

            <div className="flex justify-center">
                <div>
                    {/* bg-red-200 */}
                    <div className="max-w-md text-left  text-2xl font-bold">
                        "The customer support I recieved was exceptional. 
                        The support team went above and beyond to address my
                        concerns "
                    </div>

                    <div className="max-w-md  text-xl text-left font-semibold mt-4">
                        <div>Julies Winfield</div>
                        <div className="font-light text-sm text-slate-900">CEO | Acme corp</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}