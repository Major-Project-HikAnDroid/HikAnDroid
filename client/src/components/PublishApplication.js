import React, {useRef, useState, useEffect} from "react";
import {Form, Button, Card, Alert} from "react-bootstrap";
import {useAuth} from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {db} from "../firebase"
import {collection, getDocs, addDoc, Timestamp} from "firebase/firestore";

export default function PublishApplication(){
    const emailRef = useRef();
    const { currentUser } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const [ appInfo, setAppInfo] = useState([]);
    const [ newDevName, setNewDevName] = useState("");
    const [ newDevAge, setNewDevAge] = useState(0);
    const [ newAppRepository, setnewAppRepository] = useState("");
    const appInfoRef = collection(db, "applicationInfo");


    const createApplication = async () => {
        await addDoc(appInfoRef, {devEmail: currentUser.email, devName: newDevName, devAge: newDevAge, appRepository: newAppRepository, timestamp: Timestamp.now()});
    }

    useEffect(() => {
        const getUser = async () => {
            const data = await getDocs(appInfoRef)
            setAppInfo(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        }
        getUser();
    }, []);

    function handleSubmit(e){
        e.preventDefault();

        const promises = [];
        setLoading(true);
        setError("");

        Promise.all(promises).then(() => {
            navigate("/success-application");
        }).catch(() => {
            setError("Failed to update account");
        }).finally(() => {
            setLoading(false);
        })

    } 
    
    return(
        <>
        <div className="row mb-8">
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Publish Application</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} disabled/>
                        </Form.Group>
                        <br></br>
                        <Form.Group id="text">
                        <Form.Label>Developer's Name</Form.Label>
                        <Form.Control type="text" required placeholder="Developer's name here" onChange={(event) => {setNewDevName(event.target.value)}}/>
                        </Form.Group>
                        <br></br>
                        <Form.Group id="number">
                        <Form.Label>Developer's Age</Form.Label>
                        <Form.Control type="number" required placeholder="Developer's Age (in years) here" onChange={(event) => {setNewDevAge(event.target.value)}}/>
                        </Form.Group>
                        <br></br>
                        <Form.Group id="url">
                        <Form.Label>Repository URL</Form.Label>
                        <Form.Control type="url" required placeholder="Android Application's Repository URL here" onChange={(event) => {setnewAppRepository(event.target.value)}}/>
                        </Form.Group>
                        <br></br>
                        <Button disabled={loading} className="w-100" type="submit" onClick={createApplication}>Submit Application</Button>
                    </Form>
                </Card.Body>
            </Card>
            </div>
            <div className="w-100 text-center mt-2">
                <Link to = "/">Don't wish to publish Application?</Link>
            </div>
        </>
    )
}