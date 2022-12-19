import React, {useRef, useState, useEffect} from "react";
import { Card, Alert} from "react-bootstrap";
import {useAuth} from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import {db} from "../firebase"
import {collection, getDocs} from "firebase/firestore";

export default function ApplicationStatus(){
    const emailRef = useRef();
    const { currentUser } = useAuth();
    const [error, setError] = useState("");

    const [ appInfo, setAppInfo] = useState([]);
    const appInfoRef = collection(db, "applicationInfo");

    useEffect(() => {
        const getUser = async () => {
            const data = await getDocs(appInfoRef)
            setAppInfo(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        }
        getUser();
    }, []);

    function getDetails(){
        return (
            appInfo.map((appInf) => {
                if(appInf.devEmail === currentUser.email){
                    return (
                        <div>
                            <hr></hr>
                            <p><b>Developer Email: </b>{appInf.devEmail}</p>
                            <p><b>Developer Name: </b>{appInf.devName}</p>
                            <p><b>Developer Age: </b>{appInf.devAge}</p>
                            <p><b>Application Repository: </b>{appInf.appRepository}</p>
                            <hr></hr>
                        </div>
                    );
                }
            })
        )
    }

    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Application Status</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {getDetails()}
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to = "/">Go to Dashboard!</Link>
            </div>
        </>
    )
}