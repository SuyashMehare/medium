type Size = "small" | "big"

export const Avatar = ({name, size} : {name:string,size:Size}) => {

    let _size = "w-8 h-8";
    
    if(size === "big"){
        _size = "w-10 h-10"
    }
    
    return (
        <div>
            <div className={`relative inline-flex items-center justify-center ${_size} overflow-hidden bg-gray-300 rounded-full dark:bg-gray-900`}>
                <span className="font-medium text-gray-600 dark:text-gray-300">{name[0].toUpperCase()}</span>
            </div>
        </div>
    )
}