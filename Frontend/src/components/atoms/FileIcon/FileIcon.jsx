import { FaCss3, FaHtml5, FaJs } from "react-icons/fa"
import { GrReactjs } from "react-icons/gr"

export const FileIcon = ({ extension }) => {
     const IconStyle = {
          height: "22px",
          width: "22px",
          
     };
     const IconMapper = {
          js: <FaJs color="yellow" style={IconStyle}/>,
          jsx: <GrReactjs color="#61dbfa" style={IconStyle}/>,
          css: <FaCss3 color="#3c99dc" style={IconStyle}/>,
          html: <FaHtml5 color="#e44d26" style={IconStyle}/>,
     };
     return (
          <>
               {IconMapper[extension]}
          </>
     )
}