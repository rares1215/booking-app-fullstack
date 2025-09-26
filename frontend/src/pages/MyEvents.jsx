import { useEffect, useState } from "react"
import api from "../api";
import EventsComponent from "../components/EventsComponent";

function MyEvents()
{
    const [organizer,setOrganizer] = useState("");


    useEffect(() =>{
        api.get("/users/profile/")
        .then((res) =>{
            setOrganizer(res.data.user)
        }).catch((err) => alert(err.response.data));
    },[])


    return <EventsComponent filterType="organizer" filterName={organizer} pageTitle="My Events"/>    
}

export default MyEvents