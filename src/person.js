import React, {useEffect, useState} from 'react';
import DynamicChart from './DynamicChart';
import $ from 'jquery';
import cloneDeep from 'lodash.clonedeep';

const TOTAL_POINT = 60;

export const Person: React.FC = function Person(props) {
    const [working, setWorking] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [imgBase64, setImgBase64] = useState("");
    const [count, setCount] = useState(0);
    const [data, setData] = useState({y: [], x: []})

    const url = `http://${props.ip}:${props.port}`;

    useEffect(()=>{
        function fetchNewData() {
            console.log('fetch');
            $.getJSON(url+'/data').done((info) => {
                let newData = cloneDeep(data);

                if (count === TOTAL_POINT) {
                    newData.x.shift();
                    newData.y.shift();
                }
                newData.x.push(count);
                newData.y.push(info.value);

                setCount((count + 1) % TOTAL_POINT);
                setData(newData);
            }).fail((info) => {
                console.log(info);
            });
        }

        let timer = null;
        if (working) {
            timer = setInterval(fetchNewData, 500);
        } else {
            clearInterval(timer);
            timer = null;
        }
        return () => {if (timer !== null) clearInterval(timer);}
    }, [url, working, count, data])

    return (
        <div>
            <h2>{props.uuid}</h2>
            <h2>{props.name}</h2>
            <p>{url}</p>
            <br/>
            <DynamicChart data={data}/>
            <button onClick={() => {setWorking(!working);}}>Start/Stop</button>

            <button onClick={() => {
                $.getJSON(url + '/camera')
                    .done((data) => {
                        setShowCamera(true);
                        setImgBase64(data.value);
                    })
                    .fail((data) => {
                        setShowCamera(false);
                        console.log("Camera fetch failed:" + data.readyState);
                    });
            }}>Show camera</button>

            <button onClick={() => {setShowCamera(false);}}>Hide camera</button>
            <br/>
            {showCamera ?
                <img id={"cam-" + props.uuid} alt={props.name + " Camara Picture"}
                     src={"data:image/jpg;base64," + imgBase64}/> : null}
        </div>
    )
}

export default Person;