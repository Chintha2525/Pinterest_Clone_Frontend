import Accordion from "react-bootstrap/Accordion";
import { FormCheck } from "react-bootstrap";
import "../../App.css"

const Moreoption = ({onChange})=> {

  const handleChange=(e)=>{
    console.log(e.target.checked)
    onChange(e)
  }

  return (
    <Accordion >
      <Accordion.Item >
        <Accordion.Header >More Options</Accordion.Header>
        <Accordion.Body>
        <FormCheck name="allow_comment" onC label="Allow people to comment" type="switch" className="mx-2" onChange={handleChange} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Moreoption