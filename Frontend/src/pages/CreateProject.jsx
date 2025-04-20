import {  useNavigate } from "react-router-dom";
import { useCreateProject } from "../hooks/apis/mutations/useCreateProject";
import { Button,Layout } from "antd";
const layoutStyle = {
     borderRadius: 8,
     overflow: 'hidden',
     width: 'calc(50% - 8px)',
     maxWidth: 'calc(50% - 8px)',
};
const headerStyle = {
     textAlign: 'center',
     color: '#fff',
     height: 64,
     paddingInline: 48,
     lineHeight: '64px',
     backgroundColor: '#4096ff',
};
const contentStyle = {
     textAlign: 'center',
     minHeight: 120,
     lineHeight: '120px',
     color: '#fff',
     backgroundColor: '#0958d9',
};
const footerStyle = {
     textAlign: 'center',
     color: '#fff',
     backgroundColor: '#4096ff',
};
export const CreateProject = () => {
     const { Header, Content, Footer } = Layout;
     const { CreateProjectMutation, isPending} = useCreateProject();
     const navigate = useNavigate();
     async function handleCreateProject() { 
          console.log("Going to triger the api..."); 
          try {
               
               const response = await CreateProjectMutation();
               console.log("Now we can go to the editor");
               navigate(`/project/${response.data}`);
          }
          catch (error) {
               console.error("Error creating project:", error);
          }
     }
     return (
          <Layout style={layoutStyle}>
               <Header style={headerStyle}>
                    <h1>Create Project</h1>
               </Header>
               <Content style={contentStyle}>
                    <Button onClick={handleCreateProject}>
                         Create Playground
                    </Button>
               </Content>
               <Footer style={footerStyle}>
                    Footer
               </Footer>
          </Layout>
     );
}