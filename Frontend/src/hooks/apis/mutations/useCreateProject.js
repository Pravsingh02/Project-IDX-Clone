import { useMutation } from "@tanstack/react-query";
import { createProjectApi } from "../../../apis/projects";
export const useCreateProject = () => {
     const {isSuccess, isPending, mutateAsync,error} = useMutation({
          mutationFn: createProjectApi,
          onSuccess: (data) => {
               console.log('Project created successfully',data);
          },
          onError: () => {
               console.log(' creating project');
          }
     });
     return {
          CreateProjectMutation :mutateAsync,
          isSuccess,
          isPending,
          error,
     };
}