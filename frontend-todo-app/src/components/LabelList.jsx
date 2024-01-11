import React from "react";
import "../styles/LabelList.css";


function LabelList(){
    const [labels, setLabels] = React.useState([]);

    React.useEffect(()=>{
        const fetchLabel = async () => {
            try {
                const response = await fetch("http://localhost:8001/labels");
                const data = await response.json();
                setLabels(data);
            } catch (error) {
                console.error("Error fetching labels:", error);
            }
        };
        fetchLabel();
    }, []);

    return(
        <>
        <div className="label-list">
        {labels.map((label) => (
              <div key={label.id}  
              className="label-container">
             <div><b>{label.labelName}</b></div>
              
              </div>
            ))}
            </div>
        </>
    )
}
export default LabelList;