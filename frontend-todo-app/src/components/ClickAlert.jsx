import { useRef, useEffect } from "react";

const ClickAlert =(props)=>{
    const wrapperRef =useRef(null);

    useEffect(()=>{
        const handleClickOutside = async(e) =>{
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)){
                if(props.activeFunction === "handleCreate"){
                props.handleCreate();
                } else if ( props.activeFunction === "handleTodoClose") 
                props.handleTodoClose();
                
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },[wrapperRef], props.actveFunction);

    return <div ref ={wrapperRef}>{props.children}</div>;
};
export default ClickAlert;