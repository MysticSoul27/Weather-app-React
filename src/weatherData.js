import { useEffect, useState } from "react"


const useFetch = (url) => {

    const [data, setData] = useState(null)
    const [isCityFound, setIsCityFound] = useState(false)

    useEffect(() => {

        fetch(url).then(response => {
            console.log(response);
            if (response.status === 404) {
                setIsCityFound(true)
                console.log("city not found");

            } else {
                setIsCityFound(false)
                response.json().then(result => {
                    console.log(result);
                    setData(result)


                })
            }

        })

    }, [url])

    console.log(data);

    return [data,isCityFound];

}

export default useFetch